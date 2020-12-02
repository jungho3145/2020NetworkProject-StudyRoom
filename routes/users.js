var express = require("express");
var router = express.Router();
var model = require("../models/usersDAO");

/* GET users listing. */
router.post("/login", (req, res) => {
  if (req.body.email && req.body.pwd) {
    console.log("req.body: ", req.body);
    model.selectUser(req.body.email, (results) => {
      //res.send(results[0]);
      console.log("results: ", results);
      console.log(
        req.body.email,
        results[0].email,
        req.body.pwd,
        results[0].pwd
      );
      if (
        req.body.email === results[0].email &&
        req.body.pwd === results[0].pwd
      ) {
        // 로그인 성공 req.session에 기록
        req.session.isLogin = true;
        req.session.userEmail = req.body.email;
        res.redirect("/");
      } else {
        res.send("<h1>로그인 실패</h1>");
      }
    });
  } else {
    res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) console.log(`req.session.destroy error : ${err}`);
    res.redirect("/");
  });
});

router.post("/signUp", (req, res) => {
  if (
    req.body.email &&
    req.body.name &&
    req.body.grade &&
    req.body.class &&
    req.body.num &&
    req.body.pwd
  ) {
    var studentid = parseInt(
      req.body.grade.toString() +
        req.body.class.toString() +
        req.body.num.toString()
    );

    var name = req.body.name;
    var email = req.body.email;
    var pwd = req.body.pwd;

    model.insertUser(studentid, name, email, pwd, () => {
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
