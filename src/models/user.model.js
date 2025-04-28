const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username: username });

  if (!user) {
    throw new Error("Invalid username or password");
  }
  if (bcrypt.compareSync(password, user.password)) {
    return user;
  }
  throw new Error("Invalid username or password");
};

userSchema.statics.validate = async function (auth) {
  if (auth) {
    try {
      let token = auth.authorization.replace("Bearer ", "").replace(/ /g, "");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.id) {
        const user = await this.findOne({
          _id: decoded.id,
        });
        return user;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  } else {
    return false;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
