// Imports
require("dotenv").config();
const express = require("express");
const app = express();
const rsa = require("node-rsa");
const fs = require("fs");
const mongoose = require("mongoose");

// Public Route
app.get("/", (req, res) => {
  res.send("TAMO VIVO");
});

// Tratando os json response
app.use(express.json());

// Routes
const file = require("./routes/file");

// File Route
app.use("/file", file);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9lkkort.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Banco Conectado");
    });
  })
  .catch((err) => {
    console.log(err);
  });
