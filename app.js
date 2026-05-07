const startBtn = document.querySelector("#startbtn");
const pauseBtn = document.querySelector("#pausebtn");
const resetBtn = document.querySelector("#resetbtn");

const roundsCountDisplay = document.getElementById("rounds-count");

const progressbar = document.querySelector(".progressbar");
const progressbarNumber = document.querySelector(".progressbar-number");

const pomodoroBtn = document.getElementById("pomodorobtn");
const shortbrkBtn = document.getElementById("shortbrkbtn");
const longbrkBtn = document.getElementById("longbrkbtn");
const pomCount = document.querySelector(".pomdoro-count");

let pomdoroCount = 0;
const pomodorountilLongbrk = 4; 
const pomodorotimer = 1500;
const shortbreaktimer = 300;
const longbreaktimer = 900;
let timerValue = pomodorotimer;

let multipliervalue = 360 / timerValue;
let progressInterval;
let pomodoroType = "POMODORO"; 



function startTimer() {
    clearInterval(progressInterval);

    progressInterval = setInterval(() => {
        timerValue--;
        console.log(timerValue);
        setProgressInfo();
        if (timerValue <= 0) {
            clearInterval(progressInterval);
            pomdoroCount++;

            let roundsLeft = pomodorountilLongbrk - (pomdoroCount % pomodorountilLongbrk);
            if (pomdoroCount % pomodorountilLongbrk === 0) {
                longbrkBtn.style.display - "flex";
                roundsCountDisplay.textContent = "0";
            }
            else {
                roundsCountDisplay.textCount = roundsLeft;
            }

            pomCount.style.display = "block";
            pomCount.style.color = "white";
            pomCount.style.fontSize = "30px";
            pomCount.textContent = `Pomodoro Count ${pomdoroCount}`;
            if (pomdoroCount % pomodorountilLongbrk === 0) {
                longbrkBtn.style.display = "flex";
            }
            setTimeType(pomodoroType);
        }
    }, 1000);
}

function setProgressInfo() {
    progressbarNumber.textContent = `${NumbertoString(timerValue)}`;
    progressbar.style.background = `conic-gradient(rgb(243, 72, 109) ${timerValue * multipliervalue}deg,crimson 0deg)`;

}

function NumbertoString(number) {
    const minutes = Math.trunc(number / 60).toString().padStart(2, "0");
    const seconds = Math.trunc(number % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

function pauseTimer() {
    clearInterval(progressInterval);
}

function setTimeType(type) {
    pomodoroType = type;
    if (type === "POMODORO") {
        pomodoroBtn.classList.add("active");
        shortbrkBtn.classList.remove("active");
        longbrkBtn.classList.remove("active");
    }
    else if (type === "SHORTBREAK") {
        shortbrkBtn.classList.add("active");
        pomodoroBtn.classList.remove("active");
        longbrkBtn.classList.remove("active");
    }
    else if(type === "LONGBREAK"){
        longbrkBtn.classList.add("active");
        pomodoroBtn.classList.remove("active");
        shortbrkBtn.classList.remove("active");

        pomodoroCount = 0;
        roundsCountDisplay.textContent = pomodorountilLongbrk;
        longbrkBtn.style.display = "none";
    }
    resetTimer();
}

function resetTimer() {
    clearInterval(progressInterval);
    timerValue =
        pomodoroType === "POMODORO"
            ? pomodorotimer 
            : pomodoroType === "SHORTBREAK"
                ? shortbreaktimer
                : longbreaktimer;
    multipliervalue = 360 / timerValue;
    setProgressInfo();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

pomodoroBtn.addEventListener("click", () => setTimeType("POMODORO"));
shortbrkBtn.addEventListener("click", () => setTimeType("SHORTBREAK"));
longbrkBtn.addEventListener("click", () => setTimeType("LONGBREAK"));