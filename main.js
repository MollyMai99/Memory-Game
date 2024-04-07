/*----- constants -----*/
const timeLimit = 35;

// twelve cards array
const cardArrayTotal = [
  { name: "1", img: "images/1.jpeg" },
  { name: "2", img: "images/2.jpeg" },
  { name: "3", img: "images/3.jpeg" },
  { name: "4", img: "images/4.jpeg" },
  { name: "5", img: "images/5.jpeg" },
  { name: "6", img: "images/6.jpeg" },
  { name: "1", img: "images/1.jpeg" },
  { name: "2", img: "images/2.jpeg" },
  { name: "3", img: "images/3.jpeg" },
  { name: "4", img: "images/4.jpeg" },
  { name: "5", img: "images/5.jpeg" },
  { name: "6", img: "images/6.jpeg" },
  { name: "7", img: "images/7.jpeg" },
  { name: "8", img: "images/8.jpeg" },
  { name: "7", img: "images/7.jpeg" },
  { name: "8", img: "images/8.jpeg" },
  { name: "9", img: "images/9.jpeg" },
  { name: "10", img: "images/10.jpeg" },
  { name: "9", img: "images/9.jpeg" },
  { name: "10", img: "images/10.jpeg" },
];

const resultMessages = {
  playerChooseLevel: `Choose one difficulty level. Each round you have ${timeLimit} seconds to finish.`,
  preGame: "Press 'Start Game' button to start!",
  startGame: "Game start! Choose two cards.",
  sameCard: "You clicked the same card! Choose again!",
  match: "You found a match! Continue.",
  wrongMatch: "Wrong match! Try again!",
  win: "Congratulations! You matched all the cards.",
  gameOver: "Times up! Game over!",
};

/*----- state variables -----*/
// show game status
let resultMessage;

let cardArray = [];
// store all matched cards
let cardsWon = [];
// store two cards chose by player
let cardsChosen = [];
// store two cards ID chose by player
let cardsChosenId = [];

let timerInterval;
let timerSeconds;

/*----- cached elements  -----*/
const resultDisplay = document.querySelector("#result");
const levelButtons = document.querySelectorAll(".chooseLevel");
const startGameBtn = document.querySelector("#startGame");
const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const timerDisplayElement = document.getElementById("timer");

/*----- event listeners -----*/
startGameBtn.addEventListener("click", startGame);

/*----- functions -----*/
chooseLevel();

function chooseLevel() {
  changeResultMessage(resultMessages.playerChooseLevel);
  renderResult();
  levelButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const level = this.value;
      this.style.backgroundColor = "grey";
      distributeCards(level);
      changeResultMessage(resultMessages.preGame);
      renderResult();
    });
  });
}

function changeResultMessage(message) {
  resultMessage = message;
}

function distributeCards(level) {
  if (level === "easy") {
    cardArray = cardArrayTotal.slice(0, 12);
  } else if (level === "medium") {
    cardArray = cardArrayTotal.slice(0, 16);
  } else if (level === "hard") {
    cardArray = cardArrayTotal.slice(0, 20);
  }
}

function startGame() {
  changeResultMessage(resultMessages.startGame);
  levelButtons.forEach((button) => {
    button.style.backgroundColor = "initial";
  });
  cardsWon = [];
  startTimer();
  removeBoard();
  shuffleCard();
  createBoard();
  initTemVariables();
  render();
}

function removeBoard() {
  const removeBoardcards = document.querySelectorAll("img");
  removeBoardcards.forEach(function (imgElement) {
    imgElement.parentNode.removeChild(imgElement);
  });
}

function initTemVariables() {
  cardsChosen = [];
  cardsChosenId = [];
}

function shuffleCard() {
  cardArray.sort(() => 0.5 - Math.random());
}

function createBoard() {
  cardArray.forEach((element, i) => {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  });
}

function flipCard() {
  let cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);

  // if player choose two cards, call checkForMatch function
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 420);
  }
}

function checkForMatch() {
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];

  // condition 1: if choose the same card, unflip the card
  if (optionOneId == optionTwoId) {
    unFlipCard(cards);
    changeResultMessage(resultMessages.sameCard);
  }
  // condition 2: if two cards match, set white card and remove card eventlistener
  else if (cardsChosen[0] === cardsChosen[1]) {
    setWhiteCard(cards);
    removeCardEvent(cards);
    cardsWon.push(cardsChosen);
    changeResultMessage(resultMessages.match);
  }
  // condition 3: if two cards don't match, unflip cards
  else {
    unFlipCard(cards);
    changeResultMessage(resultMessages.wrongMatch);
  }

  initTemVariables();
  checkForWin();
  render();
}

function unFlipCard(cards) {
  cardsChosenId.forEach((i) => {
    cards[i].setAttribute("src", "images/blank.png");
  });
}

function setWhiteCard(cards) {
  cardsChosenId.forEach((i) => {
    cards[i].setAttribute("src", "images/white.png");
  });
}

function removeCardEvent(cards) {
  cardsChosenId.forEach((i) => {
    cards[i].removeEventListener("click", flipCard);
  });
}

function checkForWin() {
  if (cardsWon.length === cardArray.length / 2) {
    changeResultMessage(resultMessages.win);
    stopTimer();
  }
}

function render() {
  renderResult();
  renderScore();
}

function renderResult() {
  resultDisplay.textContent = resultMessage;
}

function renderScore() {
  scoreDisplay.textContent = `Pairs you matched: ${cardsWon.length}`;
}

// timer function

function startTimer() {
  timerSeconds = 0;
  clearInterval(timerInterval);
  updateTimerDisplay();
  timerInterval = setInterval(function () {
    timerSeconds++;
    checkGameOver();
    updateTimerDisplay();
  }, 1000);
}

function checkGameOver() {
  if (timerSeconds === timeLimit) {
    removeBoard();
    stopTimer();
    changeResultMessage(resultMessages.gameOver);
    render();
  }
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimerDisplay() {
  timerDisplayElement.textContent = formatTime(timerSeconds);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}
