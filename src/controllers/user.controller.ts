import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

import User from "../models/user.model.ts";

const registerUser: RequestHandler = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail || existingUsername) {
      if (existingEmail) {
        res.status(400).json({ error: "Email already exists" });
        return;
      } else if (existingUsername) {
        res.status(400).json({ error: "Username already exists" });
        return;
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
        });

        if (!user) {
          res.status(400).json({ error: "User registration failed" });
          return;
        }

        res.status(201).json({ message: "User registered successfully" });
        return;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
    return;
  }
};

const loginUser: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.authenticate(username, password);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    const Obj = {
      token: token,
      refreshToken: refreshToken,
      user: { id: user._id, username: user.username, email: user.email },
    };

    res.status(200).json(Obj);
    return;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Invalid username or password"
    ) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
    return;
  }
};

export { registerUser, loginUser };
