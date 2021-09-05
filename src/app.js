const quoteDiv = document.getElementById("quote-area");
const movieDiv = document.getElementById("movie-area");
const letterDiv = document.getElementById("letter-btns");
const winLoseDiv = document.getElementById("win-lose");
const livesSpan = document.getElementById("lives-remaining");
const streakSpan = document.getElementById("user-streak");
const bestStreakSpan = document.getElementById("best-streak");
const newMovieBtn = document.getElementById("new-movie-btn");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWYXZ".split("");
let prevIndex = [];
let lives = 3;
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
    lives = 3;
    livesSpan.innerText = lives;
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
    if (prevIndex.length == 10) {prevIndex.shift()}
    prevIndex.push(index)
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
        lives--;
        if (lives < 1) {
            /*--------------------------------LOSING CONDITION--------------------------------*/
            for (let btn of letterBtns) btn.classList.add("guessed");
            newMovieBtn.style.display = "initial";
            userStreak = 0;
            localStorage.setItem("currentStreak", userStreak);
            streakSpan.innerText = userStreak;
            movieDiv.innerHTML = `<p>${movie}</p>`;
            alert("You have run out of lives :(");
        } else livesSpan.innerText = lives;
    }
    btn.classList.add("guessed");
}
