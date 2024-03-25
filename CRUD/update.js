const { MongoClient } = require("mongodb");

async function updateSingleDocument(client, nameOfListing, updatedListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne({ name: nameOfListing }, { $set: updatedListing });

  console.log(`${result.matchedCount} document (s) were matched this criteria`);
  console.log(`${result.modifiedCount} document (s) were updated`);
}

async function upsertSingleDocument(client, nameOfListing, updatedListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne(
      { name: nameOfListing },
      { $set: updatedListing },
      { upsert: true }
    );

    console.log(`${result.matchedCount} document(s) matched the criteria`);

    if(result.upsertedCount > 0){
        console.log(`one documented was inserted with id : ${result.upsertedId._id}`);
    } else{
        console.log(`${result.modifiedCount} document(s) were updated`);
    }
}

async function updateMultipleDocuments(client){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateMany(
        {property_type: {$exists : false}},
        {$set: {property_type:"UnKnown"}} // set the value of "beds" to 4 for all matching documents
    )
    
    console.log(`${result.modifiedCount} document(s) were modified.`);
    console.log(`... and ${result} document(s) were affected by the operation.`);
}

async function updateDocument() {
  const mongoUrl =
    "mongodb+srv://musidivalasagagan:5YtnigceTG98hZ5D@cluster0.ptpqcmt.mongodb.net/";

  const client = new MongoClient(mongoUrl);
  try {
    // await upsertSingleDocument(client, "Nature Walk Hotel", {
    //   name: "Nature Walk Hotel",
    //   stars: 8,
    //   review_count: 90,
    //   bedrooms: 8,
    //   bathrooms: 9,
    //   description: "A beautiful scenary of Nature in a Hotel",
    //   summary:
    //     "This hotel is located near the nature park and offers great views.",
    //   location: "Bangalore",
    //   min_nights: 3,
    //   max_nights: 7,
    // });
    await updateMultipleDocuments(client);
  } finally {
    await client.close();
  }
}

updateDocument().catch(console.error);
