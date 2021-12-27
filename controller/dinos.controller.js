import Dino from "../models/dino-model.js";

const getDinos = async (req, res) => {
  const dinos = await Dino.find();
  res.json(dinos);
};

const getDino = async (req, res) => {
  const dinoId = req.params.dinoId;
  const foundDino = await Dino.findById(dinoId);
  res.json(foundDino);
};

const updateDino = async (req, res) => {
  const dinoId = req.params.dinoId;
  const dino = req.body;
  const result = await Dino.findByIdAndUpdate(dinoId, dino, {
    returnDocument: "after",
  });
  res.json(result);
};

const deleteDino = async (req, res) => {
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
};

const postDino = async (req, res) => {
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
};

export { getDinos, getDino, postDino, updateDino, deleteDino };
