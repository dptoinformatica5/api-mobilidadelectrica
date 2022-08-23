const express = require("express");
const userCtrol = require("../controllers/userController");
const { verifyTokenWCookie } = require("../helpers/verifyToken");
const { auth } = require("../middlewares");

const router = express.Router();

router.get("/checkauthentication", verifyTokenWCookie, (req, res) => {
  res.send("User authenticated");
});

router.get("/test", userCtrol.testing);
router.get("/getusers", userCtrol.getUsers);
router.post("/current-user", auth, userCtrol.getCurrentUser);
router.get("/confirm/:token", userCtrol.confirmAccount);
router.patch("/update/:id", userCtrol.updateUser);
router.patch("/change-password/:id", userCtrol.updatePassword);
router.delete("/delete/:id", userCtrol.deleteAccount);

module.exports = router;
