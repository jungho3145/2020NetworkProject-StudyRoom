var express = require("express");
var router = express.Router();
var userModel = require("../models/usersDAO");
var teamModel = require("../models/TeamDAO");
var updateModel = require("../models/updateDAO");
var reservationModel = require("../models/reservationDAO");

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.isLogin) {
    res.redirect("/studentMain");
  } else {
    updateModel.dataUpdateByTime();
    res.render("Login", {
      title: "Login",
      isLogin: req.session.isLogin,
      userEmail: req.session.userEmail,
    });
  }
});

router.get("/studentMain", (req, res) => {
  userModel.selectUserById(req.session.studentId, (User) => {
    console.log(User);
    var studentId = String(User[0].studentId);
    var grade = parseInt(studentId.substr(0, 1));
    var classnum = parseInt(studentId.substr(1, 1));
    var num = parseInt(studentId.substr(2, 2));
    console.log(grade, classnum, num);

    teamModel.readTeam(studentId, (Team) => {
      console.log(Team);
      teamModel.countTeam(studentId, (count) => {
        console.log(count);
        teamModel.usingOrBookingData(studentId, (usingOrBooking) => {
          var using, booking;
          var date = new Date();
          if (usingOrBooking.length != 0) {
            console.log(usingOrBooking);
            if (
              usingOrBooking.length >= 1 &&
              date < new Date(usingOrBooking[0].startDate)
            ) {
              console.log("if 1");
              using = false;
              booking = {
                bookingRoom: usingOrBooking[0].name,
              };
              console.log(booking);
            } else if (
              usingOrBooking.length >= 2 &&
              date < new Date(usingOrBooking[1].startDate)
            ) {
              console.log("if 2");
              using = {
                usingRoom: usingOrBooking[0].name,
              };
              booking = {
                bookingRoom: usingOrBooking[1].name,
              };
            }

            console.log("usisg" + using);
            console.log("booking" + booking);
            res.render("studentMain", {
              title: "studentMain",
              user: {
                name: User[0].name,
                Grade: grade,
                Class: classnum,
                Num: num,
              },
              teamCnt: count[0].count,
              Using: using,
              Booking: booking,
              team: Team,
            });
          }
        });
      });
    });
  });
});

router.get("/studentApply", (req, res) => {
  reservationModel.getUsableRooms((results) => {
    var usableData = [{}, {}, {}, {}, {}, {}];
    for (let index = 0; index < usableData.length; index++) {
      usableData[index] = results[0];
      console.log(usableData);
    }
    res.render("studentApply", {
      userName: req.session.name,
      usable: usableData,
    });
  });
});
module.exports = router;
