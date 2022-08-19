const express = require("express");
const userCtrol = require("../controllers/userController");
const { auth } = require("../middlewares");
const router = express.Router();

router.post("/signup", userCtrol.signup);
router.get("/test", userCtrol.testing);
router.get("/getusers", userCtrol.getUsers);
router.post("/current-user", auth, userCtrol.getCurrentUser);
router.post("/login", userCtrol.login);
router.get("/confirm/:token", userCtrol.confirmAccount);

module.exports = router;
