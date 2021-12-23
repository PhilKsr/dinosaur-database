import express from "express";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import Dino from "./models/dino-model.js";

const server = express();

mongoose.connect("mongodb://localhost:27017/flaky-dinosaurs");

server.use(express.json());

server.get("/dinos/:dinoId", async (req, res) => {
  const dinoId = req.params.dinoId;
  const foundDino = await Dino.findById(dinoId);
  res.json(foundDino);
});

server.get("/dinos", async (req, res) => {
  const dinos = await Dino.find();
  res.json(dinos);
});

server.put("/dinos/:dinoId", async (req, res) => {
  const dinoId = req.params.dinoId;
  const dino = req.body;
  const result = await Dino.findByIdAndUpdate(dinoId, dino, {
    returnDocument: "after",
  });
  res.json(result);
});

server.delete("/dinos/:dinoId", async (req, res) => {
  const dinoId = req.params.dinoId;
  try {
    const result = await Dino.findByIdAndDelete(dinoId);
    if (result) {
      res.json({
        success: true,
        message: "Deleted Dino from database",
      });
    } else {
      res.json({
        success: false,
        message: "Could not delete Dino from database",
      });
    }
  } catch (error) {
    res.json(error);
  }
});

server.post("/dinos", async (req, res) => {
  const dinosaur = new Dino({
    ...req.body,
  });
  try {
    const result = await dinosaur.save();
    res.json({
      message: "You succesfully created a dino", // + result.insertedId,
      data: result,
    });
  } catch (error) {
    res.json(error);
  }
});

server.listen(4000, () => {
  console.log("Sever is up and running on local 4000");
});
