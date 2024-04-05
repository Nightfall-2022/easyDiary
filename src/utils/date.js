export function getCurrentDateStr() {
  // 返回一个当前时间的字符串：格式为“2024/04/01”
  // 创建一个 Date 对象来获取当前时间
  var currentDate = new Date();

  // 获取年、月、日
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1; // 月份是从 0 开始的，所以要加 1
  var day = currentDate.getDate();

  // 如果月份或日期小于 10，则在前面补零
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  // 将年、月、日拼接成字符串，以 "YYYY/MM/DD" 格式输出
  return year + "/" + month + "/" + day;
}

export const myLocale = {
  /* starting with Sunday */
  //   days: "一_二_三_四_五_六_日".split("_"),
  //   daysShort: "一_二_三_四_五_六_日".split("_"),
  months:
    "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
      "_"
    ),
  monthsShort:
    "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
      "_"
    ),
  firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
  format24h: true,
  pluralDay: "dias",
};
