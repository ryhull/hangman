const quoteDiv = document.getElementById("quote-area");
const movieDiv = document.getElementById("movie-area");
const letterDiv = document.getElementById("letter-btn-container");
const winLoseDiv = document.getElementById("win-lose");
const guessesSpan = document.getElementById("guesses-remaining");
const streakSpan = document.getElementById("user-streak");
const bestStreakSpan = document.getElementById("best-streak");
const newMovieBtn = document.getElementById("new-movie-btn");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
let prevIndex = [];
let guesses = 5;
let userStreak;
let movie;
let hiddenTitle;

document.addEventListener("load", initializeMovie());

document.addEventListener("load", initializeLS());

function initializeLS() {
    if (localStorage.getItem("currentStreak") === null) {
        localStorage.setItem("currentStreak", 0);
        streakSpan.innerText = 0;
        userStreak = 0;
    } else {
        streakSpan.innerText = localStorage.getItem("currentStreak");
        userStreak = localStorage.getItem("currentStreak");
    }
    if (localStorage.getItem("bestStreak") === null) {
        localStorage.setItem("bestStreak", 0);
        bestStreakSpan.innerText = 0;
    } else {
        bestStreakSpan.innerText = localStorage.getItem("bestStreak");
    }
}

for (let letter of letters) createLetterBtn(letter);
const letterBtns = document.getElementsByClassName("letter-btn");
for (let btn of letterBtns) {
    btn.addEventListener("click", guessLetter);
}

newMovieBtn.addEventListener("click", () => {
    initializeMovie();
    for (let btn of letterBtns) btn.classList.remove("guessed");
    guesses = 5;
    guessesSpan.innerText = getHearts(guesses);
    newMovieBtn.style.display = "none";
});

function createLetterBtn(letter) {
    let btn = document.createElement("button");
    btn.innerText = letter;
    btn.classList.add("letter-btn");
    letterDiv.append(btn);
}

function initializeMovie() {
    let index;
    do {
        index = Math.floor(Math.random() * MOVIE_LIST.length);
    } while (prevIndex.includes(index));
    // Remove the first element of the array each round when it gets too large
    if (prevIndex.length == 10) {
        prevIndex.shift();
    }
    prevIndex.push(index);
    movie = MOVIE_LIST[index].title;
    // Creating the blank spaces for the hidden title
    hiddenTitle = "";
    for (let i = 0; i < movie.length; i++) {
        if (movie[i] != " ") hiddenTitle += "_";
        else hiddenTitle += " ";
    }
    movieDiv.innerHTML = `<p>${hiddenTitle}</p>`;
    quoteDiv.innerHTML = `<p>"${MOVIE_LIST[index].quote}"</p>`;
}

function guessLetter(e) {
    let btn = e.target;
    let letter = btn.innerText;
    if (movie.search(letter) >= 0) {
        for (let i = 0; i < movie.length; i++) {
            if (movie[i] === letter) {
                btn.classList.add("correct");
                hiddenTitle =
                    hiddenTitle.slice(0, i) +
                    letter +
                    hiddenTitle.slice(i + 1, movie.length + 2);
                movieDiv.innerHTML = `<p>${hiddenTitle}</p>`;
                if (hiddenTitle.search("_") < 0) {
                    /*--------------------------------WINNING CONDITION--------------------------------*/
                    for (let btn of letterBtns) btn.classList.add("guessed");
                    newMovieBtn.style.display = "initial";
                    userStreak++;
                    localStorage.setItem("currentStreak", userStreak);
                    streakSpan.innerText = userStreak;
                    if (userStreak > bestStreakSpan.innerText) {
                        bestStreakSpan.innerText = userStreak;
                        localStorage.setItem("bestStreak", userStreak);
                    }
                    alert("You got it!");
                }
            }
        }
    } else {
        btn.classList.add("incorrect");
        guesses--;
        if (guesses == 0) {
            /*--------------------------------LOSING CONDITION--------------------------------*/
            for (let btn of letterBtns) btn.classList.add("guessed");
            newMovieBtn.style.display = "initial";
            userStreak = 0;
            localStorage.setItem("currentStreak", userStreak);
            streakSpan.innerText = userStreak;
            movieDiv.innerHTML = `<p>${movie}</p>`;
            guessesSpan.innerText = getHearts(guesses);
            alert("You have run out of guesses :(");
        } else guessesSpan.innerText = getHearts(guesses);
    }
    setTimeout(() => {
        btn.classList.remove("correct");
        btn.classList.remove("incorrect");
    }, 150)
    btn.classList.add("guessed");
}

function getHearts(lives) {
    let hearts = "";
    for (let i = 0; i < lives; i++)
        hearts += "♥ ";
    return hearts.trim();
}