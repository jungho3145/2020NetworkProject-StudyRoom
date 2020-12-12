var connection = require("./db");

exports.selectUser = function (email, cb) {
  connection.query(
    "SELECT * FROM user WHERE email = ? ",
    [email],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        cb(results);
      }
    }
  );
};

exports.selectUserById = function (studentId, cb) {
  connection.query(
    "SELECT * FROM user WHERE studentId = ?",
    [studentId],
    (error, results, fields) => {
      if (error) {
        console.log(error);
      } else {
        //console.log("Model: " + results[0].name);
        cb(results);
      }
    }
  );
};

exports.insertUser = function (studentid, name, email, pwd, cb) {
  connection.query(
    "INSERT INTO user (studentid, email, pwd, name) VALUES(?, ?, ?, ?)",
    [studentid, email, pwd, name],
    (error, results, fields) => {
      if (error) {
        console.log(error);
      } else {
        cb();
      }
    }
  );
};

exports.selectTeachers = (teacherId, cb) => {
  connection.query(
    "SELECT * FROM teachers WHERE teachersId = ?",
    [teacherId],
    (error, results, fields) => {
      if (error) {
        console.log(error);
      } else {
        cb(results);
      }
    }
  );
};
