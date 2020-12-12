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
    "SELECT Rooms, startDate, endDate FROM studydb.BookingList WHERE isPermission = 0",
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
    "SELECT studentId, Team.TeamId, Teams, startDate, endDate FROM BookingList, Team, Team_User where TeamName = Teams AND Team.TeamId = Team_User.TeamId AND isPermission = 1",
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
            date.getTime() >= start.getTime() &&
            date.getTIme <= end.getTime()
          ) {
            connection.query(
              "UPDATE `studydb`.`user` SET `isMoved` = '1' WHERE (`studentId` = ?);",
              [element.studentId],
              (error, results, feilds) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log("유저 이동 업데이트 완료!");
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
                  console.log("유저 이동 업데이트 완료!");
                }
              }
            );
          }
        });
      }
    }
  );
};
