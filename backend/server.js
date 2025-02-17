if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");

const port = process.env.PORT;
const db_url = process.env.ATLAS_DB_URL;

const Accessory = require("./models/accessoryModel");
const Engine = require("./models/engineModel");

const accessoriesData = require("./DB/accessoriesData");
const enginesData = require("./DB/enginesData");

const app = express();
app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: process.env.CLIENT_URL, // Allow requests from this origin
  // credentials: true, // Allow credentials (cookies, authorization headers)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors());

connectDB(db_url);

app.get("/", (req, res) => {
  res.send("Status: OK");
});

app.get("/engines", async (req, res) => {
  const engineData = await Engine.find();
  res.json(engineData);
});

app.get("/accessories", async (req, res) => {
  const accessoryData = await Accessory.find();
  res.json(accessoryData);
});


//accessories update
app.put("/accessories/:id", async (req, res) => {
  const { id } = req.params;
  const { title, image_url, price, available } = req.body;

  try {
    const updatedAccessory = await Accessory.findByIdAndUpdate(
      id,
      { title, image_url, price, available },
      { new: true, runValidators: true }
    );

    if (!updatedAccessory) {
      return res.status(404).json({ message: "Accessory not found" });
    }

    res.json(updatedAccessory);
  } catch (error) {
    console.error("Error updating accessory:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//engines update
app.put("/engines/:id",async(req,res) =>{
  const{id}=req.params;
  const{title,image_url,category,price,available,model,from}=req.body;
  try {
    const updatedEngine = await Engine.findByIdAndUpdate(
      id,
      { title, image_url, category, price, available, model, from },
      { new:true, runValidators:true }
      );
      if(!updatedEngine){
        return res.status(404).json({message:"Engine not found"});
      }
      res.json(updatedEngine);
  }catch(error){
    console.error("Error updataing Engine:",error);
    res.status(500).json({message:"Server error"});
  }
})

app.listen(port, () => {
  console.log(`server http://localhost:${port}`);
});
