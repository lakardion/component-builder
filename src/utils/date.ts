const SECONDS_IN_MINUTE = 60;
/**
 * Return in mm:ss format  the duration
 */
export const secondsToDuration = (seconds: number) => {
  //datefns does not offer this kind of operation
  const totalMinutes = seconds / SECONDS_IN_MINUTE;
  const parsedMinutes = Math.floor(totalMinutes);
  const parsedSeconds = Math.floor(
    (totalMinutes - parsedMinutes) * SECONDS_IN_MINUTE
  )
    .toString()
    .padStart(2, "0");
  return `${parsedMinutes.toString().padStart(2, "0")}:${parsedSeconds}`;
};
