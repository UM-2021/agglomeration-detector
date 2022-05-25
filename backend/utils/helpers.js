const luxon = require('luxon');
const { DateTime } = luxon;

exports.parseMongooseDate = (date) => {
  const stringDate = date.toString();
  return DateTime.fromFormat(stringDate.substring(0, 23), 'ccc LLL dd yyyy TT');
};
