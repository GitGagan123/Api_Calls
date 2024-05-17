const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const mongo_url = process.env.DB_URL;

const app = express();

const mongoUrl = mongo_url;

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
