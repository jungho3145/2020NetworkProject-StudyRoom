var express = require("express");
var router = express.Router();
var userModel = require("../models/usersDAO");

router.get("/:id", (req, res) => {
  userModel.selectTeachers(req.params.id, (results) => {
    var status = [
      [
        {
          total: 0,
          now: 0,
          move: 0,
          data: ["ha", "ha"],
        },
        {
          total: 0,
          now: 0,
          move: 0,
          data: ["ha", "ha"],
        },
        {
          total: 0,
          now: 0,
          move: 0,
          data: ["ha", "ha"],
        },
        {
          total: 0,
          now: 0,
          move: 0,
          data: ["ha", "ha"],
        },
      ],
      [
        {
          total: 0,
          now: 0,
          move: 0,
          data: ["ha", "ha"],
        },
        {
          total: 0,
          now: 0,
          move: 0,
          data: ["ha", "ha"],
        },
        {
          total: 0,
          now: 0,
          move: 0,
          data: ["ha", "ha"],
        },
        {
          total: 0,
          now: 0,
          move: 0,
          data: ["ha", "ha"],
        },
      ],
      [
        {
          total: 0,
          now: 0,
          move: 0,
          data: ["ha", "ha"],
        },
        {
          total: 0,
          now: 0,
          move: 0,
          data: ["ha", "ha"],
        },
        {
          total: 0,
          now: 0,
          move: 0,
          data: ["ha", "ha"],
        },
        {
          total: 0,
          now: 0,
          move: 0,
          data: ["ha", "ha"],
        },
      ],
    ];
    res.render("teacherManage", {
      title: "teacherManage",
      status: status,
      Name: results[0].name,
    });
  });
});

module.exports = router;
