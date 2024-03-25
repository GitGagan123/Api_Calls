const express = require("express");
const { MongoClient } = require("mongodb");

async function insertSingleDocument(client, listing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertOne(listing);
  console.log(`New document inserted with Id : ${result.insertedId}`);
}

async function insertMultipleDocuments(client, listings) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertMany(listings);
  console.log(
    `${result.insertedCount} new documents created with following id(s) : `
  );
  console.log(result.insertedIds);
}

async function insertDocument() {
  const mongoUrl =
    "mongodb+srv://musidivalasagagan:5YtnigceTG98hZ5D@cluster0.ptpqcmt.mongodb.net/";

  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();

    // await insertSingleDocument(client,{
    //     name:"Miami International Hotels",
    //     summary:"Near Coastal Area with beautiful view",
    //     description:"A must try  hotel in Miami for a luxury experience.",
    //     minimum_nights:"3",
    //     maximum_nights:"8",
    //     bedrooms:1,
    //     beds:2,
    //     price:"$475",
    // })
    // Verified with single document inserted
    await insertMultipleDocuments(client, [
      {
        name: "The Plaza Hotel & Spa - New",
        location: { city: "New York", neighbourhood: "Times Square" },
        property_type: "Hotel",
        review_count: 63,
        stars: 4,
        average_review: 4.5,
        summary: "Grand hotel in the middle of the city",
        description: "Located in the heart of Times",
      },
      {
        name: "Charming AirBnB in the suburbs",
        location: { city: "San Francisco", neighbourhood: "Marina" },
        property_type: "Airbnb",
        review_count: 23,
        stars: 3,
        average_review: 3.5,
        summary: "Close to everything and very chill",
        description: "This is my favourite place ever! The host is so nice...",
      },
    ]);
  } finally {
    await client.close();
  }
}

insertDocument().catch(console.error);
