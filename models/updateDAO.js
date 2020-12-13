var connection = require("./db");

exports.dataUpdateByTime = () => {
  let date = [new Date(), new Date(), new Date(), new Date()];

  date[0].setHours(16, 40, 0, 0);
  date[1].setHours(17, 40, 0, 0);
  date[2].setHours(19, 30, 0, 0);
  date[3].setHours(20, 30, 0, 0);

  connection.query(
    "SELECT * FROM BookingList",
    [],
    (error, results, fields) => {
      if (error) {
        console.log(error);
      } else {
        results.forEach((element) => {
          var endTime = new Date(element.endDate);
          var thisTime = new Date();

          if (thisTime.getTime() >= endTime.getTime()) {
            connection.query(
              "DELETE FROM `studydb`.`BookingList` WHERE (`Rooms_TeamId` = '?');",
              [element.Rooms_TeamId],
              (error, results, fields) => {
                if (error) {
                  console.log(error);
                } else {
                }
              }
            );
          }
        });
      }
    }
  );

  connection.query(
    "SELECT Rooms, startDate, endDate FROM studydb.BookingList WHERE isPermission = 1",
    [],
    (error, results, fields) => {
      if (error) {
        console.log(error);
      } else {
        results.forEach((element) => {
          if (
            new Date(element.startDate) <= date[0] &&
            new Date(element.endDate) >= date[0]
          ) {
            connection.query(
              "UPDATE studydb.Rooms SET isReservation8 = 1 WHERE RoomsId = ?",
              [element.Rooms],
              () => {}
            );
          }

          if (
            new Date(element.startDate) <= date[1] &&
            new Date(element.endDate) >= date[1]
          ) {
            connection.query(
              "UPDATE studydb.Rooms SET isReservation9 = 1 WHERE RoomsId = ?",
              [element.Rooms],
              () => {}
            );
          }

          if (
            new Date(element.startDate) <= date[2] &&
            new Date(element.endDate) >= date[2]
          ) {
            connection.query(
              "UPDATE studydb.Rooms SET isReservation10 = 1 WHERE RoomsId = ?",
              [element.Rooms],
              () => {}
            );
          }

          if (
            new Date(element.startDate) <= date[3] &&
            new Date(element.endDate) >= date[3]
          ) {
            connection.query(
              "UPDATE studydb.Rooms SET isReservation11 = 1 WHERE RoomsId = ?",
              [element.Rooms],
              () => {}
            );
          }
        });
      }
    }
  );

  connection.query(
    "SELECT studentId, Team.TeamId, Teams, startDate, endDate, isPermission FROM BookingList, Team, Team_User where TeamName = Teams AND Team.TeamId = Team_User.TeamId",
    [],
    (error, results, feilds) => {
      if (error) {
        console.log(error);
      } else {
        results.forEach((element) => {
          var date = new Date();
          var start = new Date(element.startDate);
          var end = new Date(element.endDate);
          if (
            element.isPermission == 1 &&
            date.getTime() >= start.getTime() &&
            date.getTime() <= end.getTime()
          ) {
            connection.query(
              "UPDATE `studydb`.`user` SET `isMoved` = '1' WHERE (`studentId` = ?);",
              [element.studentId],
              (error, results, feilds) => {
                if (error) {
                  console.log(error);
                } else {
                  //console.log("유저 이동 업데이트 완료!1");
                }
              }
            );
          } else {
            connection.query(
              "UPDATE `studydb`.`user` SET `isMoved` = '0' WHERE (`studentId` = ?);",
              [element.studentId],
              (error, results, feilds) => {
                if (error) {
                  console.log(error);
                } else {
                  //console.log("유저 이동 업데이트 완료!2");
                }
              }
            );
          }
        });
      }
    }
  );

  connection.query("SELECT * FROM user", [], (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
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

      for (let i = 0; i < results.length; i++) {
        const element = results[i];
        global.gradeNum = parseInt(String(element.studentId).substr(0, 1));
        global.classNum = parseInt(String(element.studentId).substr(1, 1));
        //console.log(gradeNum, classNum);
        // console.log(myStatus);
        //
        myStatus[gradeNum - 1][classNum - 1].total =
          myStatus[gradeNum - 1][classNum - 1].total + 1;
        if (element.isMoved == 1) {
          myStatus[gradeNum - 1][classNum - 1].move =
            myStatus[gradeNum - 1][classNum - 1].move + 1;
          var addGrade = gradeNum;
          var addClass = classNum;
        } else {
          myStatus[gradeNum - 1][classNum - 1].now =
            myStatus[gradeNum - 1][classNum - 1].now + 1;
        }
      }
    }
  });

  connection.query(
    "SELECT Rooms.name as roomName, user.name, user.studentId FROM user, Team_User, Team, Rooms, BookingList where user.studentId = Team_User.studentId and Team_User.TeamId = Team.TeamId and RoomsId = bookingList.Rooms and TeamName = BookingList.Teams and isPermission = 1 and isMoved = 1",
    [],
    (error, results, fields) => {
      if (error) {
        console.log(error);
      } else {
        for (let index = 0; index < results.length; index++) {
          const element = results[index];
          var addGrade = parseInt(String(element.studentId).substr(0, 1));
          var addClass = parseInt(String(element.studentId).substr(1, 1));
          myStatus[addGrade - 1][addClass - 1].data.push(
            results[0].name + results[0].roomName
          );
          //console.log(myStatus[addGrade - 1][addClass - 1].data);
        }
      }
    }
  );
};

global.sleep = (delay) => {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
};
