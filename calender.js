let date = document.querySelector(".date");
let day = document.querySelector(".day");
let month = document.querySelector(".month");
let year = document.querySelector(".year");

let now = new Date();
const a = now.getDate();
const b = now.getDay();
const c = now.getMonth();
const d = now.getFullYear();

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

date.textContent = a;
day.textContent = weekDays[b];
month.textContent = allMonths[c];
year.textContent = d;
