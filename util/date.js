export const getFormattedDate = (date) => {
  // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return date.toISOString().slice(0, 10); // the to both return are the same
};

// We get a date that is X number of days in the past
export const getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
