const express = require("express");
const validateDto = require("../middleware/validateDTO");
const { registerUserDTO, loginUserDTO } = require("../dto/user.dto");
const {
  registerUser,
  loginUser,
  verifyAuthToken,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/login", validateDto(loginUserDTO), loginUser);
router.post("/register", validateDto(registerUserDTO), registerUser);
router.get("/verify-token", verifyAuthToken);

module.exports = router;
