const express = require("express");
const {
  getCharacters,
  getCharacterById,
  createCharacter,
  // updateCharacter,
  // deleteCharacter,
} = require("../controllers/character.controller");
const validateDto = require("../middleware/validateDto.middleware");
const { characterDTO } = require("../dto/character.dto");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();
router.use(authMiddleware);

router.get("/", getCharacters);
router.get("/:id", getCharacterById);
router.post("/", validateDto(characterDTO), createCharacter);
// router.put("/:id", validateDto(characterSchema), updateCharacter);
// router.delete("/:id", deleteCharacter);

module.exports = router;
