const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const registerUser = async (req, res) => {
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    const responseObj = {
      token: token,
      refreshToken: refreshToken,
      user: { id: user._id, username: user.username, email: user.email },
    };

    res.status(200).json(responseObj);
  } catch (error) {
    if (error.message === "Invalid username or password") {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      res.status(500).json({ error: error.message || "Server error" });
    }
  }
};

module.exports = { registerUser, loginUser };
