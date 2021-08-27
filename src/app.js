const letterDiv = document.getElementById("letter-btns");
const wordDiv = document.getElementById("word-area");
const scoreDiv = document.getElementById("score-area");
const hintDiv = document.getElementById("hint-area");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWYXZ".split("");
let lives = 5;
let userStreak;
let word;
let hiddenWord;

for (let letter of letters) createLetterBtn(letter);

function createLetterBtn(letter) {
    let btn = document.createElement("button");
    btn.innerText = letter;
    btn.classList.add("letter-btn");
    letterDiv.append(btn);
}

scoreDiv.innerHTML = `<p>Lives Remaining: <span id="lives">5</span></p>
                      <p>Current Streak: <span id="userStreak">0</span></p>
                      <hr>`;

const WORD_LIST = [
    { word: "PIKACHU", hint: "Lightning Type" },
    { word: "BATMAN", hint: "Nocturnal Cosplayer" },
    { word: "MICHELANGELO", hint: "Turtle Painter" },
];

document.addEventListener("load", initializeWord());

function initializeWord() {
    // Choose the word, will be randomized later
    //let index = 2;
    let index = Math.floor(Math.random()*3)
    word = WORD_LIST[index].word;

    // Initializing the blank spaces for the hidden word
    hiddenWord = "";
    for (let i = 0; i < word.length; i++) hiddenWord += "_ ";
    hiddenWord = hiddenWord.trim();
    wordDiv.innerHTML = `<p>${hiddenWord}</p>`;
    hintDiv.innerHTML = `<p>Hint: ${WORD_LIST[index].hint}</p>`;
}

function guessLetter(e) {
    let btn = e.target;
    let letter = btn.innerText;

    if (word.search(letter) >= 0) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                hiddenWord = hiddenWord.split(" ").join("");
                hiddenWord =
                    hiddenWord.slice(0, i) +
                    letter +
                    hiddenWord.slice(i + 1, word.length + 2);
                hiddenWord = hiddenWord.split("").join(" ");
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
        } else document.getElementById("lives").innerText = lives;
    }

    btn.classList.add("guessed");
    btn.parentNode.removeChild(btn);
}

const letterBtns = document.getElementsByClassName("letter-btn");

for (let btn of letterBtns) {
    btn.addEventListener("click", guessLetter);
}
