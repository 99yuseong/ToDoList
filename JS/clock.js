// clock
const main = document.querySelector(".timeSection .main");
const mainTime = document.querySelector(".timeSection .mainTime");
const clockHour = mainTime.querySelector(".clockHour");
const clockMinute = mainTime.querySelector(".clockMinute");

// count down
const countDown = document.querySelector(".timeSection .countDown");
const countDownTime = document.querySelector(".timeSection .countDownTime");
//percent bar
const progress = document.querySelector(".progress");
const percentBarBack = document.querySelector(".percentBarBack");
const percentBar = document.querySelector(".percentBar");
const percentText = document.querySelector(".percentText");
// click change button
const clickChangeBtn = document.querySelector(".timeSection .clickChangeBtn");
// start Date setting
const dischargedDate = new Date(Date.UTC(2021, 8, 25, 0, 0, 0, 0));
// End Date setting
const OpenCourseDate = new Date(Date.UTC(2022, 1, 28, 0, 0, 0, 0));
// // unit setting
const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

//
//
// 1. clock
function handleClock() {
    const TimeNow = new Date();
    const hours = String(TimeNow.getHours());
    const minutes = String(TimeNow.getMinutes());
    // clock innerText
    clockHour.innerText = `${hours.padStart(2, "0")}`;
    clockMinute.innerText = `${minutes.padStart(2, "0")}`;
    if (clockMinute.innerText === "00") {
        checkGreetingTime();
    }
}

handleClock();
setInterval(handleClock, 1000);

//
//
// 2. countDown
function handleCountDown() {
    const timeNow = new Date();
    const remainedTime = OpenCourseDate - timeNow.getTime();

    const rmDays = String(Math.floor(remainedTime / day));
    const rmH = String(Math.floor((remainedTime % day) / hour));
    const rmMin = String(Math.floor((remainedTime % hour) / minute));
    const rmSec = String(Math.floor((remainedTime % minute) / second));
    //count down innerText
    countDownTime.innerText = `${rmDays}d ${rmH.padStart(2, 0)}h ${rmMin.padStart(2, 0)}m ${rmSec.padStart(2, 0)}s`;
}

handleCountDown();
setInterval(handleCountDown, 1000);

//
//
// 3. remaining days percent

function handlePercentDate() {
    const timeNow = new Date();
    const percentDate = ((timeNow - dischargedDate) * 100) / (OpenCourseDate - timeNow);
    percentBar.style.width = `${percentDate}%`;
    percentText.innerText = `${percentDate.toFixed(6)}%`;
    percentText.style.marginLeft = `${percentDate}%`;
}

handlePercentDate();
setInterval(handlePercentDate, 10);

//
//
// 4. click for change event
function changeShowing() {
    main.classList.toggle("hidden");
    countDown.classList.toggle("hidden");
    progress.classList.toggle("hidden");
}

clickChangeBtn.addEventListener("click", changeShowing);
