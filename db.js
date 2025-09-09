// import { MongoClient } from "mongodb";

// const url = "mongodb+srv://dark00:node_000@cluster-0.tqhdq.mongodb.net/";
// const client = new MongoClient(url);

// async function connect() {
//   try {
//       await client.connect();
//       console.log("Connected to MongoDB successfully");
//   } catch (err) {
//       console.error("Connection failed", err.errorResponse);
//       return;
//   }
//   const db = client.db("Session_6_codezone");
//   const collection = db.collection("Courses");
//   await collection.insertOne({
//     name: "NodeJS",
//     price: 100,
//     duration: 10,
//     description: "NodeJS course"
//   });
//   const data = await collection.find({}).toArray();
//   console.log(data);

// }
// connect();

import mongoose from "mongoose"

export default function connect() {
  const url = process.env.MONGO_URL;
  mongoose
    .connect(url)
    .then(() => {
      console.log("connected to mongodb successfully");
    })
    .catch((err) => {
      console.log("failed to connect to mongodb", err.message);
    });
}