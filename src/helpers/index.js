import moment from "moment";

export const isNowDayOrNight = (sunriseTime, sunsetTime, startTime) => {
  const start = startTime ? moment(startTime) : moment();

  return start.isBetween(moment(sunriseTime), moment(sunsetTime))
    ? "day"
    : "night";
};
