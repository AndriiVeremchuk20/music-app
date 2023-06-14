export const getSoundTime = (timeSeconds: number | undefined): string => {
  if (!timeSeconds) {
    return "";
  }

  const hours = Math.floor(timeSeconds / 3600);
  const minutes = Math.floor((timeSeconds % 3600) / 60);
  const seconds = Math.floor(timeSeconds % 60);

  const formattedHours = hours > 0 ? `${hours}:` : "";
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
};
