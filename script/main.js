const modalBackground = document.querySelector(".modal-bg");
const modalForm = document.querySelector(".modal");
const scoreInput = document.querySelector("#score");
const secondeInput = document.querySelector("#seconds");
const minuteInput = document.querySelector("#minutes");
const timerP = document.querySelector(".timer-card p");

const t1Div = document.querySelector(".team1");
const t2Div = document.querySelector(".team2");
const startButton = document.querySelector(".start");
const resetButton = document.querySelector(".reset");
const timerButton = document.querySelector(".timer");

let targetScore = 0;
let limitSecond = 0;
let limitMinute = 0;
let isPlaying = false;

let [milliseconds,seconds,minutes] = [0,0,0];
let int = null;

modalForm.addEventListener("submit", runGame);

t1Div.addEventListener("click", addPoint);
t2Div.addEventListener("click", addPoint);
startButton.addEventListener("click", start);
resetButton.addEventListener("click", reset);

function runGame(ev) {
    ev.preventDefault();
    targetScore = scoreInput.value;
    limitSecond = secondeInput.value;
    limitMinute = minuteInput.value;

    if (targetScore === "" && limitSecond === "" && limitMinute === "") {
        alert("Vous devez définir au moins une valeur de fin de partie");
        return;
    }

    if (limitSecond > 0 || limitMinute > 0) {
        [milliseconds,seconds,minutes] = [10,limitSecond,limitMinute];
    }

    modalBackground.style.display = "none";
    modalForm.style.display = "none";
}

function start(ev) {
    if (targetScore > 0) {
        int = setInterval(displayTimer,10);
        timerP.textContent = "Temps de jeu";
    } else {
        int = setInterval(displayTimerDesc,10);
        timerP.textContent = "Temps Restant";
    }
    startButton.style.display = "none";
    isPlaying = true;
}

function stop(ev) {
    clearInterval(int);
    isPlaying = false;
    resetButton.style.display = "block";
}

function addPoint(ev) {
    if (isPlaying) {
        currentScore = parseInt(ev.target.textContent);
        newScore = currentScore + 1;
        ev.target.textContent = newScore;

        if (newScore == targetScore) {
            stop();
        }
    }


}

function reset(ev) {
    location.reload();
}

function displayTimer(){
    milliseconds+=10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
        }
    }

 let m = minutes < 10 ? "0" + minutes : minutes;
 let s = seconds < 10 ? "0" + seconds : seconds;
 let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

 timerButton.textContent = ` ${m}:${s}:${ms}`;
}

function displayTimerDesc() {
    milliseconds -= 10;
    if (milliseconds === 0 && seconds > 0) {
        milliseconds = 1000;
        seconds--;
        if(seconds == 0 && minutes > 0){
            seconds = 60;
            minutes--;
        }
    }

    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

    timerButton.textContent = ` ${m}:${s}:${ms}`; 

    if (milliseconds == 0 && seconds == 0 && minutes == 0) {
        stop();
    }
}