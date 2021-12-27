import {} from "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import {
  getDinos,
  getDino,
  updateDino,
  deleteDino,
  postDino,
} from "./controller/dinos.controller.js";

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

const server = express();

mongoose.connect(
  `mongodb+srv://${user}:${pass}@cluster0.kgjzt.mongodb.net/flaky-dinosaurs`
);

server.use(express.json());

server.get("/dinos/:dinoId", getDino);

server.get("/dinos", getDinos);

server.put("/dinos/:dinoId", updateDino);

server.delete("/dinos/:dinoId", deleteDino);

server.post("/dinos", postDino);

server.listen(4000, () => {
  console.log("Sever is up and running on local 4000");
});
