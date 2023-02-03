const {
  findUsers,
  findUserByProperty,
  createNewUser,
  updateUser,
} = require("../service/user");
const error = require("../utils/error");

const authService = require("../service/auth");

// ^ get all user controller
const getUsers = async (req, res, next) => {
  /**
   * TODO: filter,sort,pagination,select
   */

  try {
    const users = await findUsers();

    res.status(200).json({
      message: "this is all user ",
      users: users,
    });
  } catch (error) {
    next(e);
  }
};

// ^ get one user by id
const getUserById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await findUserByProperty("_id", userId);

    if (!user) {
      throw error("user not found", 404);
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// ^ post user
const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;

  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// ^ put user by id
const putUserById = async (req, res, next) => {
  const userId = req.params.userId;

  const { name, roles, accountStatus, email } = req.body;

  try {
    const user = await updateUser(userId, {
      name,
      roles,
      accountStatus,
      email,
    });

    if (!user) {
      throw error("User not found", 404);
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// ^ patch user by id
const patchUserById = async (req, res, next) => {
  const userId = req.params.userId;

  const { name, roles, accountStatus } = req.body;

  try {
    const user = await findUserByProperty("_id", userId);

    if (!user) {
      throw error("User Not Found", 404);
    }

    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// ^ delete one user by id
const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await findUserByProperty("_id", userId);

    console.log(req.body);

    if (!user) {
      throw error("User not found", 404);
    }

    await user.remove();

    return res.status(203).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  patchUserById,
  deleteUserById,
};
