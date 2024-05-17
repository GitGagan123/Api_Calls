const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongo_url = process.env.DB_URL;
const app = express();
app.use(cors());

async function readSingleDocument(client, nameofDocument) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .findOne({ name: nameofDocument });

  if (result) {
    console.log(`Found a document with the name ${nameofDocument}`);
    console.log(result);
  } else {
    console.log(`No Document Found with the name ${nameofDocument}`);
  }
}

async function readMultipleDocuments(
  client,
  { minBedRooms, minBathRooms, maxResults }
) {
  const cursor = client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .find({
      bedrooms: { $gte: minBedRooms },
      bathrooms: { $gte: minBathRooms },
    })
    .sort({ last_review: -1 })
    .limit(maxResults);

  const results = await cursor.toArray();

  const listingsAndReviews = results.map((listing) => {
    return {
      id: listing._id,
      name: listing.name,
      description: listing.description,
      roomType: listing.room_type,
      minimumNights: listing.minimum_nights,
      maximumNights: listing.maximum_nights,
    };
  });

  if (results.length > 0) {
    console.log(
      `Found Listings with atleast ${minBedRooms} bedRooms and ${minBathRooms} bathRooms : `
    );
    results.forEach((doc, index) => {
      const lastReviewDate = new Date(doc.last_review).toDateString();

      console.log();
      console.log(`${index + 1}. name : ${doc.name}`);
      console.log(`  id: ${doc._id}`);
      console.log(`  bedrooms: ${doc.bedrooms}`);
      console.log(`  bathrooms: ${doc.bathrooms}`);
      console.log(`  Last Review date : ${lastReviewDate}`);
    });
    return listingsAndReviews;
  } else {
    console.log("No Listings Found");
  }
}

let listings = [];

async function readDocument() {
  const mongoUrl = mongo_url;

  const client = new MongoClient(mongoUrl);
  try {
    // await readSingleDocument(client, "Charming AirBnB in the suburbs");
    const listingsAndReviews = await readMultipleDocuments(client, {
      minBedRooms: 4,
      minBathRooms: 2,
      maxResults: 5,
    });
    listings = listingsAndReviews;
  } finally {
    await client.close();
  }
}

readDocument().catch(console.error);

app.get("/listingsAndReviews", (req, res) => {
  if (res.statusCode === 200 && !listings.length) {
    return res.send({
      message: "No data available yet, please wait!",
    });
  }
  res.send(listings);
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// app.use(cors({
//   origin:'http://localhost:3000',
// }))
