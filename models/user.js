const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isValidEmail } = require("../helpers");

const UserSquema = mongoose.Schema({
  email: { type: String, require: true, lowercase: true, unique: true },
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
});

//Methods
UserSquema.statics.signup = signup;
UserSquema.statics.testing = testing;
UserSquema.statics.getUsers = getUsers;

//(modelo, esquema, tabla)
module.exports = mongoose.model("user", UserSquema, "users");

//Static methods
function signup(userInfo) {
  //Validations
  if (!userInfo.email || !isValidEmail(userInfo.email))
    throw new Error("Email is not valid");
  if (!userInfo.username) throw new Error("username is required");
  if (!userInfo.password) throw new Error("password is required");

  return this.findOne({ email: userInfo.email })
    .then((user) => {
      if (user) throw new Error("user already exists");

      const newUser = {
        email: userInfo.email,
        username: userInfo.username,
        password: bcrypt.hashSync(userInfo.password),
      };

      return this.create(newUser);
    })
    .then((userCreated) => userCreated);
}
function testing(msg) {
  console.log(msg);
}
function getUsers() {
  return this.find().then((users) => users);
}
