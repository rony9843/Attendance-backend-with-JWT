const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
  password: {
    type: String,
    // maxLength: [6, "password is too long"],
  },
  roles: {
    type: [String],
    require: true,
    default: ["STUDENT"],
  },
  accountStatus: {
    type: String,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: "PENDING",
    require: true,
  },
});

const User = model("User", userSchema);

module.exports = User;
