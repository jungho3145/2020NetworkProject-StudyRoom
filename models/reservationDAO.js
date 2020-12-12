var connection = require("./db");

exports.getUsableRooms = (cb) => {
  connection.query(
    "SELECT * FROM studydb.Rooms WHERE isReservation8 = 0 or isReservation9 = 0 or isReservation10 = 0 or isReservation11 = 0",
    [],
    (error, results, fields) => {
      if (error) {
        console.log(error);
      } else {
        cb(results);
      }
    }
  );
};

exports.sendApply = (roomName, period, teamName) => {
  var startDate, endDate;
  switch (period[0]) {
    case "8":
      startDate = setDate(16, 40);
      break;
    case "9":
      startDate = setDate(17, 40);
      break;
    case "10":
      startDate = setDate(19, 30);
      break;
    case "11":
      startDate = setDate(20, 30);
    default:
      break;
  }
  switch (period[period.length - 1]) {
    case "8":
      endDate = setDate(17, 30);
      break;
    case "9":
      endDate = setDate(18, 30);
      break;
    case "10":
      endDate = setDate(20, 20);
      break;
    case "11":
      endDate = setDate(21, 20);
      break;
  }
  connection.query(
    "SELECT RoomsId FROM Rooms WHERE name = ?",
    [roomName],
    (error, results, fields) => {
      if (error) {
        console.log(error);
      } else {
        connection.query(
          "INSERT INTO `studydb`.`BookingList` (`Rooms`, `Teams`, `startDate`, `endDate`, `isPermission`) VALUES (?, ?, ?, ?, '0');",
          [results[0].RoomsId, teamName, startDate, endDate],
          (error, results, fields) => {
            if (error) {
              console.log(error);
            } else {
              console.log("신청완료");
            }
          }
        );
      }
    }
  );
};

var setDate = (h, m) => {
  date = new Date();
  date.setHours(h, m, 0, 0);
  return date;
};
