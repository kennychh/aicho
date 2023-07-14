const monthsAgo = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22,
];
const monthsAgoStr = [
  "Today",
  "Yesterday",
  "2 days ago",
  "3 days ago",
  "4 days ago",
  "5 days ago",
  "6 days ago",
  "Last week",
  "2 weeks ago",
  "3 weeks ago",
  "Last month",
  "2 months ago",
  "3 months ago",
  "4 months ago",
  "5 months ago",
  "6 months ago",
  "7 months ago",
  "8 months ago",
  "9 months ago",
  "10 months ago",
  "11 months ago",
  "12 months ago",
  "A long time ago",
];

export const getTimeCreated = () => {
  var date = new Date().toString();
  return date;
};

export const getDiffInMonths = (date_1, date_2) => {
  var diffInMonths = (date_1.getFullYear() - date_2.getFullYear()) * 12;
  diffInMonths -= date_2.getMonth();
  diffInMonths += date_1.getMonth();
  return diffInMonths;
};

const diffDays = (date1, date2) => {
  var Difference_In_Time = date1.getTime() - date2.getTime();
  var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
  return Difference_In_Days;
};
const isDaysAgo = (someDate, daysAgo) => {
  const today = new Date();
  today.setDate(today.getDate() - daysAgo);
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

export const getMonthsAgo = (chatDetails, cutOffNum = 0) => {
  if (chatDetails[0]) {
    const chatDates = chatDetails.map((item) => item[1]).slice(cutOffNum);
    const currentDate = new Date();
    return chatDates.reduce((result, date, index) => {
      const diff = diffDays(currentDate, new Date(date));
      var diffInMonths =
        getDiffInMonths(currentDate, new Date(date)) + monthsAgoStr.length - 14;
      if (diff == 0) {
        diffInMonths = 0;
      } else if (diff <= 6) {
        diffInMonths = diff;
      } else if (diff <= 14) {
        diffInMonths = 7;
      } else if (diff <= 21) {
        diffInMonths = 8;
      } else if (diff <= 28) {
        diffInMonths = 9;
      } else if (diffInMonths > monthsAgoStr.length - 1) {
        diffInMonths = monthsAgoStr.length - 1;
      }
      const month = monthsAgo[diffInMonths];

      if (!result[month]) {
        result[month] = [];
      }
      result[month].push(index + cutOffNum);
      return result;
    }, {});
  }
  return {};
};

export const getMonthsAgoStr = (months) => {
  const result = [];
  if (months) {
    months.map((month) => {
      const monthAgoStr = monthsAgoStr[month];
      result.push(monthAgoStr);
    });
  }
  return result;
};
