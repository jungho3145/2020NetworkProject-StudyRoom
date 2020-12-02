var connection = require("./db");

exports.selectUser = function (email, cb) {
  connection.query(
    "SELECT * FROM user WHERE email = ?",
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
