var express = require("express");
var router = express.Router();
var userModel = require("../models/usersDAO");
var teamModel = require("../models/TeamDAO");
var updateModel = require("../models/updateDAO");

var mystatus = [[], [], []];
global.myStatus = mystatus;
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 4; j++) {
    myStatus[i][j] = {
      total: 0,
      now: 0,
      move: 0,
      data: [],
    };
  }
}

router.get("/:id", (req, res) => {
  userModel.selectTeachers(req.params.id, (teacher) => {
    updateModel.dataUpdateByTime();
    res.render("teacherManage", {
      title: "teacherManage",
      status: myStatus,
      Name: teacher[0].name,
    });
  });
});

module.exports = router;
