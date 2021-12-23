import express from "express";
import { ObjectId } from "mongodb";
import databaseClient from "./lib/db.client.js";

const server = express();

server.use(express.json());

server.get("/dinos/:dinoId", async (req, res) => {
  const dinoId = req.params.dinoId;
  await databaseClient.connect();
  const db = client.db("flaky-dinosaurs");
  const collection = db.collection("dinosaurs");
  const foundDino = await collection.findOne({ _id: ObjectId(dinoId) });
  res.json(foundDino);
});

server.get("/dinos", async (req, res) => {
  await databaseClient.connect();
  const db = client.db("flaky-dinosaurs");
  const collection = db.collection("dinosaurs");

  const dinos = await collection.find().toArray();
  res.json(dinos);
});

server.post("/dinos", async (req, res) => {
  const dinosaur = {
    ...req.body,
  };

  await databaseClient.connect();
  const db = client.db("flaky-dinosaurs");
  const collection = db.collection("dinosaurs");
  const result = await collection.insertOne(dinosaur);

  res.json({
    message: "You succesfully created a dino with id: " + result.insertedId,
  });
});

server.listen(4000, () => {
  console.log("Sever is up and running on local 4000");
});
