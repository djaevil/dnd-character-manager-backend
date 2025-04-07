import express from "express";
import { validateDto } from "../middleware/validateDTO";
import { registerUserDTO, loginUserDTO } from "../dto/user.dto";
import { registerUser, loginUser } from "../controllers/user.controller";

const router = express.Router();

// Login and register routes don't use next() so the router complains about it!

// router.post("/login", validateDto(loginUserDTO), loginUser);
// router.post("/register", validateDto(registerUserDTO), registerUser);

export default router;
