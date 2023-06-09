const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function signUp(req, res) {
  //Sign up
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already exists!",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const user = {
              name: req.body.name,
              surname: req.body.surname,
              lastPosition: req.body.lastPosition,
              email: req.body.email,
              password: hash,
              type: req.body.type
            };

            models.User.create(user)
              .then((result) => {
                res.status(201).json({
                  message: "User created successfully",
                });
              })
              .catch((error) => {
                console.log('error: ', error)
                res.status(500).json({
                  message: "Something went wrong!",
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      console.log('error: ', error)

      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

function login(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid credentials!1",
        });
      } else {
        let bool = bcryptjs.compare(req.body.password, user.password);
        if (bool) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user.id,
              username: user.name,
              type: user.type
            },
            process.env.JWT_KEY,
            function (err, token) {
              res.status(200).json({
                message: "Authentication successful!",
                token: token,
              });
            }
          );
        } else {
          res.status(401).json({
            message: "Invalid credentials!2",
          });
        }
      }
    })
    .catch((error) => {
      console.log("error : ", error)
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

module.exports = {
  signUp: signUp,
  login: login,
};
