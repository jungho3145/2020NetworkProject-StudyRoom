var connection = require("./db");

exports.readTeam = (studentId, cb) => {
  sql =
    "SELECT Team.TeamName, Team.TeamLeader, teachers.name FROM studydb.user, studydb.Team_User, studydb.Team, studydb.teachers where user.studentId = Team_User.studentId and Team_User.TeamId = Team.TeamId and teachers.teachersId = Team.teacher and user.studentId = ?";
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
  sql =
    "SELECT count(Team_Userid) as count FROM studydb.Team_User Where studentId = ?";
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
    "SELECT Rooms.name, BookingList.startDate, BookingList.endDate FROM studydb.BookingList, studydb.Team, studydb.Team_User, studydb.user, studydb.Rooms where BookingList.Teams = Team.TeamName and BookingList.Rooms = Rooms.RoomsId and Team_User.TeamId = Team.TeamId and Team_User.studentId = user.studentId and user.studentId = ? and isReturned = 0 ORDER BY BookingList.startDate";
  values = [studentId];
  connection.query(sql, value, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      cb(results);
    }
  });
};
