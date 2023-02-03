const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./user");
const error = require("../utils/error");

const registerService = async ({
  email,
  name,
  password,
  roles,
  accountStatus,
}) => {
  //  ^ find user
  let user = await findUserByProperty("email", email);

  // ^ if found this user
  if (user) {
    throw error("user already exist", 400);
  }

  // ^ convert user pass hash
  password = await bcrypt.hash(password, 10);

  return createNewUser({ name, email, password, roles, accountStatus });
};

const loginService = async ({ email, password }) => {
  // ^ find user with his email
  let user = await findUserByProperty("email", email);

  // ^ if user not found
  if (!user) {
    throw error("this email not found", 400);
  }

  // ^ convert hash
  const isValidPass = await bcrypt.compare(password, user.password);

  if (!isValidPass) {
    throw error("Please input valid password", 400);

    return res.status(400).json({
      message: "Please input valid password",
    });
  }

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
  };

  // jwt token
  const token = jwt.sign(payload, "secret-key", { expiresIn: "3h" });

  return token;
};

module.exports = {
  loginService,
  registerService,
};
