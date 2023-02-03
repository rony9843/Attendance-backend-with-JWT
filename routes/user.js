const {
  getUsers,
  getUserById,
  postUser,
  deleteUserById,
  patchUserById,
  putUserById,
} = require("../controller/users");

const router = require("express").Router();

/**
 * TODO: @Routes
 * ^ - get all user
 * ^ - get user by id
 * ^ - create user
 * ^ - update user
 * ^ - delete user
 */

// ^ get user by id or email
router.get("/:userId", getUserById);

// ^ update user by id
router.put("/:userId", putUserById);

// ^ update user by id
router.patch("/:userId", patchUserById);

// ^ delete user by id
router.delete("/:userId", deleteUserById);

//  ^ create a user
router.post("/", postUser);

// ^ get al user
router.get("/", getUsers);

module.exports = router;
