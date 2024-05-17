const express = require("express");
const { MongoClient } = require("mongodb");
require('dotenv').config();

const mongo_url = process.env.DB_URL;

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases : ");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function connect() {
  const mongoUrl = mongo_url;

  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

connect().catch(console.error);
