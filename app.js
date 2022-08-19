const express = require("express");
const bodyParser = require("body-parser");
const db_connection = require("./db/db_connection");
const userRouters = require("./routes/userRouter");
const app = express();
const { auth } = require("./middlewares/index");
//* Setup *//
//will help us to retrieve body parameters when handling a request.
app.use(bodyParser.json());

//* Routes *//
//app.use(auth); //middleware que verifica el usuario de forma global
app.use("/account", userRouters);
app.use((req, res, next) => {
  res.status(404);
  res.json({
    mensaje: "Route not found",
  });
});

//* Error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    data: err.data,
    message: errorMessage,
    stack: err.stack,
  });
});
//* Se usa para vincular y escuchar las conecciones en un puerto*//
//Ejecutamos nuestra aplicación en el puerto 5000.
app.listen(5000, () => {
  //* MongoDB connection *//
  db_connection();
  console.log("Listening ");
});
