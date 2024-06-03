let gameName = "Guess the word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game  created by Elzero Web School`;

let numbersOfTries = 6;
let numbersOfLetters = 6;
let currentTry = 1;

let wordToGuess = "";
let words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "Elzero",
  "School",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

function generateInputs() {
  let inputsContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numbersOfTries; i++) {
    let tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>try${i}</span>`;
    if (i !== 1) tryDiv.classList.add("disabled-inputs");
    for (let j = 1; j <= numbersOfLetters; j++) {
      let input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxLength", "1");
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();
  //parent(3)//
  let inputDisabledDiv = document.querySelectorAll(".disabled-inputs input");
  // console.log(inputDisabledDiv);
  inputDisabledDiv.forEach((input) => (input.disabled = true));

  let inputs = document.querySelectorAll("input");
  // console.log(inputs);
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      let nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      let currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        let nextInput = currentIndex + 1;
        if (nextInput < inputs.length) {
          inputs[nextInput].focus();
        }
      }
      if (event.key === "ArrowLeft") {
        let prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

let guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);
console.log(wordToGuess);

function handleGuesses() {
  let sucessGuess = true;
  console.log(wordToGuess);
  for (let i = 1; i <= numbersOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    if (letter === actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      sucessGuess = false;
    } else {
      inputField.classList.add("no");
      sucessGuess = false;
    }
  }

  if (sucessGuess) {
    messageArea.innerHTML = ` you win the word is<span>${wordToGuess}</span>`;
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-input"));
    checkButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-input");
    let currentInputs = document.querySelectorAll(`.try-${currentTry} input`);
    currentInputs.forEach((input) => (input.disabled = true));

    currentTry++;

    let nextInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextInputs.forEach((input) => (input.disabled = false));
    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-input");
      el.children[1].focus();
    } else {
      messageArea.innerHTML = `you lose the word is ${wordToGuess}`;
      checkButton.disabled = true;
    }
  }
}

window.onload = function () {
  generateInputs();
};
