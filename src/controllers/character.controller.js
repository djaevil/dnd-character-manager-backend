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
    res.status(500).json({ error: error.message || "Server error" });
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
    res.status(500).json({ error: error.message || "Server error" });
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
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};

module.exports = { getCharacters, getCharacterById, createCharacter };
