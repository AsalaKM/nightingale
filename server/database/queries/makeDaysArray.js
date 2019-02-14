// stores birthday, favourite subject and least favourite subject for user

module.exports = daysArray => new Promise((resolve, reject) => {
  const daysNumberArray = [];
  // ref day to integer
  const weekday = new Array(7);
  weekday.Sunday = 0;
  weekday.Monday = 1;
  weekday.Tuesday = 2;
  weekday.Wednesday = 3;
  weekday.Thursday = 4;
  weekday.Friday = 5;
  weekday.Saturday = 6;

  // loop over array of day-strings and push related integer
  daysArray.forEach((day) => {
    daysNumberArray.push(weekday[day.stringValue]);
  });
  // clear all duplicates
  const uniqueDays = [...new Set(daysNumberArray)];

  resolve(uniqueDays);
});
