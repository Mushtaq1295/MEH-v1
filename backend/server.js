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

const app = express();

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

app.listen(port, () => {
  console.log(`server http://localhost:${port}`);
});
