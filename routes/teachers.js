var express = require("express");
var router = express.Router();
var userModel = require("../models/usersDAO");
var updateModel = require("../models/updateDAO");
var reservationModel = require("../models/reservationDAO");

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
      id: teacher[0].teachersId,
    });
  });
});

router.get("/:id/applyManage", (req, res) => {
  //console.log("step1");
  userModel.selectTeachers(req.params.id, (teacher) => {
    // console.log("step2");
    reservationModel.getApplyListbyName(teacher[0].name, (apply) => {
      //console.log(apply.length);
      var applyList = [];
      for (let i = 0; i < apply.length; i++) {
        const element = apply[i];
        applyList.push({
          id: element.Rooms_TeamId,
          name: element.name,
          Teams: element.Teams,
          period: getPeriodString(element.startDate, element.endDate),
        });
      }
      //console.log("step4");
      res.render("teacherApplyManage", {
        title: "apply",
        applyList: applyList,
        userName: teacher[0].name,
        userId: teacher[0].teachersId,
      });
    });
  });
});

router.post("/:id/applyOk", (req, res) => {
  reservationModel.ApplyOk(req.body.id, () => {
    console.log("확인");
  });
  res.redirect("applyManage");
});

let startDate = [new Date(), new Date(), new Date(), new Date()];

startDate[0].setHours(16, 40, 0, 0);
startDate[1].setHours(17, 40, 0, 0);
startDate[2].setHours(19, 30, 0, 0);
startDate[3].setHours(20, 30, 0, 0);

let endDate = [new Date(), new Date(), new Date(), new Date()];

endDate[0].setHours(17, 30, 0, 0);
endDate[1].setHours(18, 30, 0, 0);
endDate[2].setHours(20, 20, 0, 0);
endDate[3].setHours(21, 20, 0, 0);

var getPeriodString = (startTime, endTime) => {
  var start = new Date(startTime);
  var end = new Date(endTime);
  console.log(start + " : " + end);
  var startPeriod, endPeriod;
  var returnString = "";

  if (start.getTime() <= startDate[0].getTime()) {
    startPeriod = 8;
  } else if (
    start.getTime() >= startDate[0].getTime() &&
    start.getTime() <= startDate[1].getTime()
  ) {
    startPeriod = 9;
  } else if (
    start.getTime() >= startDate[1].getTime() &&
    start.getTime() <= startDate[2].getTime()
  ) {
    startPeriod = 10;
  } else if (
    start.getTime() >= startDate[2].getTime() &&
    start.getTime() <= startDate[3].getTime()
  ) {
    startPeriod = 11;
  }

  if (end.getTime() <= endDate[0].getTime()) {
    endPeriod = 8;
  } else if (
    end.getTime() >= endDate[0].getTime() &&
    end.getTime() <= endDate[1].getTime()
  ) {
    endPeriod = 9;
  } else if (
    end.getTime() >= endDate[1].getTime() &&
    end.getTime() <= endDate[2].getTime()
  ) {
    endPeriod = 10;
  } else if (
    end.getTime() >= endDate[2].getTime() &&
    end.getTime() <= endDate[3].getTime()
  ) {
    endPeriod = 11;
  }
  //   console.log(
  //     start.getTime() >= startDate[0].getTime() &&
  //       start.getTime() <= startDate[1].getTime()
  //   );
  //  console.log(startPeriod + ", " + endPeriod);
  for (let i = startPeriod; i <= endPeriod; i++) {
    //console.log(i);
    if (i == endPeriod) {
      returnString += " " + i;
    } else {
      returnString += " " + i + ",";
    }
  }

  return returnString + "교시";
};

module.exports = router;
