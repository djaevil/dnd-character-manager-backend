const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const registerUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      res.status(400).json({ error: "Passwords do not match" });
      return;
    }
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail || existingUsername) {
      if (existingEmail) {
        res.status(400).json({ error: "Email already exists" });
        return;
      } else if (existingUsername) {
        res.status(400).json({ error: "Username already exists" });
        return;
      }
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
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
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.authenticate(username, password);
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "3d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      const responseObj = {
        user: { username: user.username },
      };

      res.status(200).json(responseObj);
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    if (error.message === "Invalid username or password") {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      res.status(500).json({ error: error.message || "Server error" });
    }
  }
};

module.exports = { registerUser, loginUser };
