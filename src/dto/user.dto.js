const Joi = require("joi");

const registerUserDTO = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .max(50)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d!@#$%^&*()_+\\-=\\[\\]{};':\"\\|,.<>\\/?]{6,50}$"
      )
    )
    .required(),
  confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");

const loginUserDTO = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).max(50).required(),
}).and("username", "password");

module.exports = {
  registerUserDTO,
  loginUserDTO,
};
