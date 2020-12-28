var connection = require("./db");

exports.readTeam = (studentId, cb) => {
  sql =
    "SELECT TeamName, TeamLeader, teachers.name FROM user, Team_User, Team, teachers where user.studentId = Team_User.studentId and Team_User.TeamId = Team.TeamId and teachers.teachersId = Team.teacher and user.studentId = ?";
  value = [studentId];
  connection.query(sql, value, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      //console.log(results);
      cb(results);
    }
  });
};

exports.countTeam = (studentId, cb) => {
  sql = "SELECT count(Team_Userid) as count FROM Team_User Where studentId = ?";
  value = [studentId];
  connection.query(sql, value, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      //console.log(results);
      cb(results);
    }
  });
};

exports.usingOrBookingData = (studentId, cb) => {
  sql =
    "SELECT BookingList.Rooms_TeamId, Rooms.name, BookingList.startDate, BookingList.endDate, BookingList.isPermission FROM BookingList, Team, Team_User, user, Rooms where BookingList.Teams = Team.TeamName and BookingList.Rooms = Rooms.RoomsId and Team_User.TeamId = Team.TeamId and Team_User.studentId = user.studentId and user.studentId = ? and isPermission = 0 ORDER BY BookingList.startDate";
  values = [studentId];
  connection.query(sql, values, (error, Booking, fields) => {
    if (error) {
      console.log(error);
    } else {
      sql =
        "SELECT BookingList.Rooms_TeamId, Rooms.name, BookingList.startDate, BookingList.endDate, BookingList.isPermission FROM BookingList, Team, Team_User, user, Rooms where BookingList.Teams = Team.TeamName and BookingList.Rooms = Rooms.RoomsId and Team_User.TeamId = Team.TeamId and Team_User.studentId = user.studentId and user.studentId = ? and isPermission = 1 ORDER BY BookingList.startDate";
      values = [studentId];
      connection.query(sql, values, (error, Using, fields) => {
        if (error) {
          console.log(error);
        } else {
          cb(Booking, Using);
        }
      });
    }
  });
};

// exports.usingRoomDatabyTeam = (teamName, cb) => {
//   sql =
//     "SELECT name FROM BookingList, Rooms WHERE Teams = ? AND isPermission = 1 AND Rooms = RoomsId";
//   values = [teamName];
//   connection.query(sql, values, (error, results, fields) => {
//     if (error) {
//       console.log(error);
//     } else {
//       cb(results);
//     }
//   });
// };
