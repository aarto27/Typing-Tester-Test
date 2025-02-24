let Jokes = "https://icanhazdadjoke.com/"; 

async function getJokes() {
    try {
        const headers = { accept: "application/json" }; 
        let res = await fetch(Jokes, { headers });  
        const data = await res.json();  
        return data.joke;
    } catch (error) {
        console.log(error);
        return "No joke found";
    }
}

// Selecting elements
let start = document.querySelector("#button1");  
let body = document.querySelector(".container");
let restart = document.querySelector("#button2");
let jokeElement = document.querySelector("#sentence");
let textArea = document.querySelector("#input");
let time = document.querySelector("#time");
let WPM = document.querySelector("#WPM");
let Accuracy = document.querySelector("#accuracy");

let startTime;
let timerStarted = false;
let timerInterval;

function startTimer() {
    if (timerStarted) return; 
    timerStarted = true;
    startTime = new Date().getTime();

    timerInterval = setInterval(() => {
        let Seconds = Math.floor((new Date().getTime() - startTime) / 1000);
        time.innerHTML = `${Seconds}`;

        if (Seconds >= 60) {
            clearInterval(timerInterval);
            time.innerHTML = "0";
            textArea.disabled = true;
        }
    }, 1000);
}


start.addEventListener("click", async function () {
    start.style.display = "none";
    setTimeout(() => {
        body.style.display = "block";
    }, 1000);
    textArea.disabled = false;
    getJokes().then((joke) => {
        jokeElement.textContent = joke;
        textArea.value = ""; 
        WPM.textContent = "0 WPM";
        Accuracy.textContent = "0%";
        time.textContent = "0 sec";
        timerStarted = false; 
        clearInterval(timerInterval); 
    });
});


textArea.addEventListener("input", async function () {
    startTimer(); 

    let jokeText = jokeElement.innerText; 
    let userInput = textArea.value; 
    let correctChars = 0;

    // Compare input character by character
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === jokeText[i]) {
            correctChars++;
        }
    }

    // Accuracy Calculation
    let accuracy = jokeText.length > 0 ? ((correctChars / jokeText.length) * 100).toFixed(2) : 0;
    Accuracy.textContent = `${accuracy}%`;

});


restart.addEventListener("click", function () {
    start.style.display = "block";
    start.style.position = "absolute";
    start.style.left = "910px";
    body.style.display = "none";
    textArea.value = "";
    time.textContent = "0 sec";
    WPM.textContent = "0 WPM";
    Accuracy.textContent = "0%";
    clearInterval(timerInterval);
    timerStarted = false;
    
});
