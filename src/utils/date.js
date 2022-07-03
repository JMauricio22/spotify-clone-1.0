export function spotifyDateFormat(d) {
  return new Date(d).toLocaleDateString('en-US', {
    dateStyle: 'medium',
  });
}

export function convertMsToMin(ms) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${minutes}:${seconds}`;
}
