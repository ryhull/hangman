const hintDiv = document.getElementById("hint-area");
const wordDiv = document.getElementById("word-area");
const letterDiv = document.getElementById("letter-btns");
const winLoseDiv = document.getElementById("win-lose");
const guessesSpan = document.getElementById("guesses-remaining");
const streakSpan = document.getElementById("user-streak");
const bestStreakSpan = document.getElementById("best-streak");
const newWordBtn = document.getElementById("new-word-btn");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWYXZ".split("");
let lives = 5;
let userStreak;
let word;
let hiddenWord;

document.addEventListener("load", initializeWord());

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

newWordBtn.addEventListener("click", () => {
    initializeWord();
    for (let btn of letterBtns) btn.classList.remove("guessed");
    lives = 5;
    guessesSpan.innerText = lives;
});

function createLetterBtn(letter) {
    let btn = document.createElement("button");
    btn.innerText = letter;
    btn.classList.add("letter-btn");
    letterDiv.append(btn);
}

function initializeWord() {
    let index = Math.floor(Math.random() * WORD_LIST.length);
    word = WORD_LIST[index].word;
    // Creating the blank spaces for the hidden word
    hiddenWord = "";
    for (let i = 0; i < word.length; i++) {
        if (word[i] != " ") hiddenWord += "_";
        else hiddenWord += " ";
    }
    wordDiv.innerHTML = `<p>${hiddenWord}</p>`;
    hintDiv.innerHTML = `<p>Hint: ${WORD_LIST[index].hint}</p>`;
}

function guessLetter(e) {
    let btn = e.target;
    let letter = btn.innerText;
    if (word.search(letter) >= 0) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                hiddenWord =
                    hiddenWord.slice(0, i) +
                    letter +
                    hiddenWord.slice(i + 1, word.length + 2);
                wordDiv.innerHTML = `<p>${hiddenWord}</p>`;
                if (hiddenWord.search("_") < 0) {
                    /*--------------------------------WINNING CONDITION--------------------------------*/
                    for (let btn of letterBtns) btn.classList.add("guessed");
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
        console.log("oof");
        lives--;
        if (lives < 0) {
            /*--------------------------------LOSING CONDITION--------------------------------*/
            for (let btn of letterBtns) btn.classList.add("guessed");
            userStreak = 0;
            localStorage.setItem("currentStreak", userStreak);
            streakSpan.innerText = userStreak;
            wordDiv.innerHTML = `<p>${word}</p>`;
            alert("You have run out of guesses :(");
        } else guessesSpan.innerText = lives;
    }
    btn.classList.add("guessed");
}
