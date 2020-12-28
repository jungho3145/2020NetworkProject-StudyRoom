var express = require("express");
var router = express.Router();
var userModel = require("../models/usersDAO");
var teamModel = require("../models/TeamDAO");
var updateModel = require("../models/updateDAO");
var reservationModel = require("../models/reservationDAO");

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.isLogin) {
    updateModel.dataUpdateByTime();
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
  updateModel.dataUpdateByTime();
  userModel.selectUserById(req.session.studentId, (User) => {
    //console.log(User);
    var studentId = String(User[0].studentId);
    var grade = parseInt(studentId.substr(0, 1));
    var classnum = parseInt(studentId.substr(1, 1));
    var num = parseInt(studentId.substr(2, 2));
    //console.log(grade, classnum, num);

    teamModel.readTeam(studentId, (Team) => {
      //console.log(Team);
      teamModel.countTeam(studentId, (count) => {
        //console.log(count);
        teamModel.usingOrBookingData(studentId, (Booking, Using) => {
          var using, booking;
          if (Using[0]) {
            using = {
              usingRoomNum: Using[0].Rooms_TeamId,
              usingRoom: Using[0].name,
            };
          }
          if (Booking[0]) {
            booking = {
              bookingRoomNum: Booking[0].Rooms_TeamId,
              bookingRoom: Booking[0].name,
            };
          }
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
        });
      });
    });
  });
});

router.get("/studentApply", (req, res) => {
  reservationModel.getUsableRooms((results) => {
    updateModel.dataUpdateByTime();
    //console.log(results);
    for (let i = 0; i < results.length; i++) {
      results[i].Reservations = {
        re8: results[i].isReservation8,
        re9: results[i].isReservation9,
        re10: results[i].isReservation10,
        re11: results[i].isReservation11,
      };
      delete results[i].isReservation8;
      delete results[i].isReservation9;
      delete results[i].isReservation10;
      delete results[i].isReservation11;
    }
    console.log(results);
    teamModel.readTeam(req.session.studentId, (teams) => {
      res.render("studentApply", {
        userName: req.session.name,
        usable: results,
        team: teams,
      });
    });
  });
});

router.post("/ApplySend", (req, res) => {
  console.log(req.body);
  var data = req.body;
  if (data.period) {
    reservationModel.sendApply(data.roomName, data.period, data.team);
  }
  res.redirect("/studentApply");
});

router.post("/addTeam", (req, res) => {
  console.log(req.body);
  res.redirect("/studentMain");
});

router.post("/returnRoom", (req, res) => {
  reservationModel.returnRooms(req.body.id);
  res.redirect("/studentMain");
});

module.exports = router;
