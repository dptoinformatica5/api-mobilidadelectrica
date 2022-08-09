const getModelByName = require("../db/getModelByName");
const user = require("../models/user");

module.exports.signup = (req, res) => {
  const { body } = req;
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
        res
          .status(200)
          .send({ success: true, message: "successfully", data: users });
      })
      .catch((error) =>
        res.status(200).send({ success: false, error: error.message })
      );
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

module.exports.login = (req, res) => {
  const { body } = req;
  //comprobar parametros
  if (!body.email)
    return res
      .status(200)
      .send({ success: false, error: "email not provided" });
  if (!body.password)
    return res
      .status(200)
      .send({ success: false, error: "password not provided" });

  const User = getModelByName("user");

  try {
    User.login(body.email, body.password)
      .then((data) => {
        res.status(200).send({ success: true, data });
      })
      .catch((err) =>
        res.status(200).send({ success: false, error: err.message })
      );
  } catch (err) {
    res.status(200).send({ success: false, error: err.message });
  }
};

module.exports.getUserById = (req, res) => {
  const { body } = req;
  console.log("user body", body);
  if (!body)
    return res.status(200).send({
      success: false,
      error: "user info not found",
      data: { user: null },
    });

  const User = getModelByName("user");
  return User.getUserById(body._id)
    .then((user) => {
      res.status(200).send({ success: true, data: { user } });
    })
    .catch((err) => res.status(200).send({ success: false, err: err.message }));
};
