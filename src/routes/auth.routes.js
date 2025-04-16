const express = require("express");
const validateDto = require("../middleware/validateDTO");
const { registerUserDTO, loginUserDTO } = require("../dto/user.dto");
const { registerUser, loginUser } = require("../controllers/user.controller");

const router = express.Router();

router.post("/login", validateDto(loginUserDTO), loginUser);
router.post("/register", validateDto(registerUserDTO), registerUser);

module.exports = router;
