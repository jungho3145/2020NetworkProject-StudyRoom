function numToString(grade, classnum, num) {
  if (num < 10) {
    return grade.toString() + classnum.toString() + "0" + num.toString();
  } else {
    return grade.toString() + classnum.toString() + num.toString();
  }
}

stringToNum = (string) => {
  var grade = parseInt(string.substr(0, 1));
  var classnum = parseInt(string.substr(1, 1));
  var num = parseInt(string.substr(2, 2));

  return {
    grade: grade,
    classnum: classnum,
    num: num,
  };
};
