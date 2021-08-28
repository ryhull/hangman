const hintDiv = document.getElementById("hint-area");
const wordDiv = document.getElementById("word-area");
const letterDiv = document.getElementById("letter-btns");
const livesSpan = document.getElementById("lives");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWYXZ".split("");
let lives = 5;
let userStreak = 0;
let word;
let hiddenWord;

document.addEventListener("load", initializeWord());

for (let letter of letters) createLetterBtn(letter);
const letterBtns = document.getElementsByClassName("letter-btn");
for (let btn of letterBtns) {
    btn.addEventListener("click", guessLetter);
}

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
                    console.log("WINRAR");
                    for (let btn of letterBtns) btn.classList.add("guessed");
                    //TODO - Winning Condition things--------------------------------------
                }
            }
        }
    } else {
        console.log("oof");
        lives--;
        if (lives < 0) {
            console.log("Depressing loss :'(");
            // TODO - Losing Condition things ---------------------------------------------
            for (let btn of letterBtns) btn.classList.add("guessed");
        } else livesSpan.innerText = lives;
    }
    btn.classList.add("guessed");
}

