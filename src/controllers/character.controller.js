const Character = require("../models/character.model");

const getCharacters = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const characters = await Character.find({ owner: userId }).populate(
      "owner",
      "-_id -password -__v -createdAt -updatedAt"
    );
    if (!characters || characters.length === 0) {
      return res.status(404).json({ error: "No characters found" });
    }
    res.status(200).json(characters);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error when finding characters" });
  }
};

const getCharacterById = async (req, res) => {
  try {
    const characterId = req.params.id;

    const character = await Character.findById(characterId).populate(
      "owner",
      "-_id -password -__v -createdAt -updatedAt"
    );
    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }
    res.status(200).json(character);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error when finding character" });
  }
};

const createCharacter = async (req, res) => {
  try {
    const userId = req.user._id;
    const characterData = req.body;
    const newCharacter = await Character.create({
      ...characterData,
      owner: userId,
    });
    if (!newCharacter) {
      return res.status(400).json({ error: "Error creating character" });
    }
    res.status(201).json(newCharacter);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error when creating character" });
  }
};

const updateCharacter = async (req, res) => {
  try {
    const userId = req.user._id;
    const characterId = req.params.id;
    const characterData = req.body;

    const updatedCharacter = await Character.findOneAndUpdate(
      { _id: characterId, owner: userId },
      characterData,
      { new: true }
    ).populate("owner", "-_id -password -__v -createdAt -updatedAt");

    if (!updatedCharacter || updatedCharacter === null) {
      return res.status(404).json({ error: "Character not found" });
    }
    res.status(200).json(updatedCharacter);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error when updating character",
    });
  }
};

const deleteCharacter = async (req, res) => {
  try {
    const userId = req.user._id;
    const characterId = req.params.id;

    const deletedCharacter = await Character.findOneAndDelete({
      _id: characterId,
      owner: userId,
    });

    if (!deletedCharacter) {
      return res.status(404).json({ error: "Character not found" });
    }
    res.status(200).json({ message: "Character deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error when deleting character" });
  }
};

module.exports = {
  getCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
