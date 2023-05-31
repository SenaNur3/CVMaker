const jwt = require("jsonwebtoken");


function checkAuth(req, res, next) {
  const token =
    req.headers["x-access-token"] || req.headers.token || req.query.token;
  console.log("---", req.query)
  if (token) {
    jwt.verify(JSON.parse(token), process.env.JWT_KEY, (err, decoded) => {

      if (err) {
        res.json({
          status: false,
          message: "Failed to authenticate token.",
        });
      } else {
        req.decode = decoded;
        next();
      }
    });
  } else {
    res.json({
      status: false,
      message: "No token provided.",
    });
  }
}

module.exports = {
  checkAuth: checkAuth,
};
