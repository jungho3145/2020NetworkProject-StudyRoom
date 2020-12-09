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

// exports.sendApply = (cb) => {

// }
