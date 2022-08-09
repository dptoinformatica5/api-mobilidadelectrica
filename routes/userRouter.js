const express = require("express");
const userCtrol = require("../controllers/userController");
const router = express.Router();

router.post("/signup", userCtrol.signup);
router.get("/test", userCtrol.testing);
router.get("/getusers", userCtrol.getUsers);
router.post("/current-user", userCtrol.getUserById);
router.post("/login", userCtrol.login);

module.exports = router;
