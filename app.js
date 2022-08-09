const express = require("express");
const bodyParser = require("body-parser");
const db_connection = require("./db/db_connection");
const userRouters = require("./routes/userRouter");
const app = express();

// setup
app.use(bodyParser.json());

//* Routes *//
app.use("/account", userRouters);
app.use((req, res, next) => {
  res.status(404);
  res.json({
    mensaje: "Route not found",
  });
});

//* MongoDB connection *//
db_connection();
app.listen(5000, () => console.log("Listening "));
