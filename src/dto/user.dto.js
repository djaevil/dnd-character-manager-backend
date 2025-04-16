const Joi = require("joi");

const registerUserDTO = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
  confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");

const loginUserDTO = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
}).and("username", "password");

module.exports = {
  registerUserDTO,
  loginUserDTO,
};
