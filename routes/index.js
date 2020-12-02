var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("Login", {
    title: "Login",
    isLogin: req.session.isLogin,
    userEmail: req.session.userEmail,
  });
});

module.exports = router;
