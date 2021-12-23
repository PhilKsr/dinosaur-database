import mongoose from "mongoose";

const dinoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  vegan: Boolean,
  weight: Number,
});

const Dino = mongoose.model("Dino", dinoSchema);

export default Dino;
