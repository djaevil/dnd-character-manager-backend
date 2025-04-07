import express from "express";
import { validateDto } from "../middleware/validateDTO.ts";
import { registerUserDTO, loginUserDTO } from "../dto/user.dto.ts";
import { registerUser, loginUser } from "../controllers/user.controller.ts";

const router = express.Router();

router.post("/login", validateDto(loginUserDTO), loginUser);
router.post("/register", validateDto(registerUserDTO), registerUser);

export default router;
