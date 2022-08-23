const jwt = require("jsonwebtoken");
const { createError } = require("../helpers");

const verifyTokenWCookie = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "user not authenticated"));

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return next(createError(403, "invalid token"));
    req.user = user;
    next();
  });
};
const verifyUser = (req, res, next) => {
  verifyTokenWCookie(req, res, next, () => {
    //comprueba que sea tu cuenta o que sea admin
    if (req.user.id === req.params.id || require.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "not authorized"));
    }
  });
};
module.exports = { verifyTokenWCookie };
// module.exports = verifyUser;
