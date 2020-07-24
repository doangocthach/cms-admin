export const converDateNow = (now) => {
  let today = new Date(parseInt(now));
  let day = today.getDate() + "";
  let month = today.getMonth() + 1 + "";
  let year = today.getFullYear() + "";
  let hour = today.getHours() + "";
  let minutes = today.getMinutes() + "";
  let seconds = today.getSeconds() + "";

  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;

  function checkZero(data) {
    if (data.length == 1) {
      data = "0" + data;
    }
    return data;
  }
};
