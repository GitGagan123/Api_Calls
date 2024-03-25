const express = require("express");
const mongoose = require("mongoose");

const app = express();

const mongoUrl = "mongodb+srv://musidivalasagagan:5YtnigceTG98hZ5D@cluster0.ptpqcmt.mongodb.net/";

async function connectMongoDb(){
  try{
    await mongoose.connect(mongoUrl);
    console.log("connected to Mongo Db :) ");
  } catch(error){
    console.error(error);
  }
}

connectMongoDb();

app.get("/", (req, res) => {
  res.send("Hello, This is first Node and Express Api Call");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
