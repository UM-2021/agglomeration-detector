const luxon = require('luxon');
const { DateTime } = luxon;

exports.parseMongooseDate = (date) => {
  const stringDate = date.toString();
  return DateTime.fromFormat(stringDate.substring(0, 23), 'ccc LLL dd yyyy TT');
};

exports.getDateTimeTimeframe = (date) => {
  // + 3 because of uruguay's timezone
  const hour = date.hour + 3;
  return hour < 6
    ? 0
    : hour >= 6 && hour < 12
    ? 1
    : hour >= 12 && hour < 18
    ? 2
    : 3;
};
