import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import bodyParser from "body-parser";

import RouteUrls from "./routes/RouteUrls"

import dotenv from 'dotenv'
dotenv.config()

const mongoUrl = process.env.MONGO_URL || "https://localhost:8080";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(express.json());
app.use('/', RouteUrls)

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Emma and Rawi");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});