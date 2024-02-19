const logger = require("../logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const {emailValidation, passValidation}  = require("../middleware/validation");

const link = "https://kappa.lol/VMimi";
const messanger = "https://kappa.lol/iSONv";

exports.form = (req, res) => {
  res.render("registerForm", { errors: {}, link: link, messanger: messanger });
  logger.info("Зашли на страницу с регистрацией");
};

exports.submit = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findByEmail(email, (error, user) => {
    if (error) return next(error);
    if (user) {
      logger.error("Такой пользователь в базе уже существует.");
      console.log("Такой пользователь в базе уже существует.");
      res.redirect("/");
    } else {
      User.create(req.body, (err) => {
        if (err) return next(err);
        req.session.userEmail = email;
        req.session.userName = name;
        res.redirect("/");
      });
      const token = jwt.sign(
        { name: req.body.name },

        (process.env.JWTTOKENSECRET = "aboba"),
        {
          expiresIn: 60 * 60,
        }
      );
      logger.info("Token подготовлен " + token);
    }
  });
};
