const { loginService, registerService } = require("../service/auth");

const registerController = async (req, res, next) => {
  let { name, email, password } = req.body;

  /**
   * TODO:
   * ^ validation user input -> name ,email and password -> if user input not valid return 400 error
   * ^ find this user by email form database -> if user exist -> return 400 error
   * ^  if not find user lets create new user from database
   *   FIXME:
   * ? password create hash
   */

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "invalid data",
    });
  }

  try {
    const user = await registerService({ name, email, password });

    return res.status(201).json({
      message: "user create successfully",
      user,
    });
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  let { email, password } = req.body;

  // ^ valid user input
  if (!email || !password) {
    return res.status(400).json({
      message: "Please input email and password",
    });
  }

  /**
   * TODO:
   * ^ find the this with his email
   * ^ if user not found -> return 400 error
   * ^ if user not ===  to user.hash -> return 400 error
   * ^ if user pass and user.hash equal -> generate token
   * ^ get token to the user
   *
   * FIXME:
   * ?
   */

  try {
    const token = await loginService({ email, password });

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerController,
  loginController,
};
