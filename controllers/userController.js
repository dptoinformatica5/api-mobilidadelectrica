const getModelByName = require("../db/getModelByName");
const user = require("../models/user");
module.exports.signup = (req, res) => {
  const { body } = req;
  console.log("user body", body);
  if (!body)
    return res
      .status(200)
      .send({ success: false, error: "user info not found" });

  const User = getModelByName("user");
  try {
    User.signup(body)
      .then(() => {
        res
          .status(200)
          .send({ success: true, message: "successfully signed up" });
      })
      .catch((error) =>
        res.status(200).send({ success: false, error: error.message })
      );
  } catch (error) {
    console.log("error catch", error);
    res.status(500).send({ success: false, error: error.message });
  }
};

module.exports.testing = (req, res) => {
  user.testing("Test");
  res.json({ msg: "This is a test" });
};

module.exports.getUsers = (req, res) => {
  try {
    user
      .getUsers()
      .then((users) => {
        res.status(200).send({ success: true, message: "successfully" });
        console.log(users);
      })
      .catch((error) =>
        res.status(200).send({ success: false, error: error.message })
      );
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};
