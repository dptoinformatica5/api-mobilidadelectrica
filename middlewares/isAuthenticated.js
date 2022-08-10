function isAuthenticated(req, res, next) {
  const access_token = req.headers.access_token;
  if (!access_token)
    return res
      .status(403)
      .send({ success: false, message: "user not authorized" });

  if (access_token) {
    const user = verifyAuthToken(access_token);
    if (!user)
      return res
        .status(403)
        .send({ success: false, message: "user not Authorized" });

    req.user = user;
  }
  next();
}
module.exports = isAuthenticated;
