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

// const path = require("path");
// app.use(express.static(path.join(__dirname, "../frontend")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/index.html"));
// });


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

// API to fetch accessories
app.get("/api/accessories", (req, res) => {
  res.json(accessoriesData);
});

// API to fetch engines
app.get("/api/engines", (req, res) => {
  res.json(enginesData);
});

// GET Accessory by ID (For Editing)
// app.get("/api/accessories/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const accessory = await Accessory.findById(id);
//     if (!accessory) {
//       return res.status(404).json({ message: "Accessory not found" });
//     }
//     res.json(accessory);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// // UPDATE Accessory
// app.put("/api/accessories/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, image_url, price, available } = req.body;

//     const updatedAccessory = await Accessory.findByIdAndUpdate(
//       id,
//       { title, image_url, price, available },
//       { new: true, runValidators: true }
//     );

//     if (!updatedAccessory) {
//       return res.status(404).json({ message: "Accessory not found" });
//     }

//     res.json(updatedAccessory);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating accessory", error });
//   }
// });

app.listen(port, () => {
  console.log(`server http://localhost:${port}`);
});
