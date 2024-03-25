const express = require("express");
const { MongoClient } = require("mongodb");

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases : ");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function connect() {
  const mongoUrl = "mongodb+srv://musidivalasagagan:5YtnigceTG98hZ5D@cluster0.ptpqcmt.mongodb.net/";

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
