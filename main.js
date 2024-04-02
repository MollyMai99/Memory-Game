/*----- constants -----*/
const cardArray = [
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
];
const resultMessages = {
  sameCard: "You clicked the same card! Choose again!",
  match: "You found a match! Continue!",
  wrongMatch: "Wrong match! Try again!",
  win: "Congratulations! You matched all the cards!",
};

/*----- state variables -----*/
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let resultMessage;

/*----- cached elements  -----*/
const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector("#result");
const scoreDisplay = document.querySelector("#score");

/*----- event listeners -----*/

/*----- functions -----*/
initialize();

function initialize() {
  shuffleCard();
  createBoard();
}

function shuffleCard() {
  cardArray.sort(() => 0.5 - Math.random());
}

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  }
}

function flipCard() {
  let cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 600);
  }
}

function checkForMatch() {
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];

  if (optionOneId == optionTwoId) {
    unFlipCard(cards);
    resultMessage = resultMessages.sameCard;
  } else if (cardsChosen[0] === cardsChosen[1]) {
    setWhiteCard(cards);
    removeCardEvent(cards);
    cardsWon.push(cardsChosen);
    resultMessage = resultMessages.match;
  } else {
    unFlipCard(cards);
    resultMessage = resultMessages.wrongMatch;
  }
  cardsChosen = [];
  cardsChosenId = [];
  if (cardsWon.length === cardArray.length / 2) {
    resultMessage = resultMessages.win;
  }
  render();
}

function render() {
  scoreDisplay.textContent = `Score: ${cardsWon.length}`;
  resultDisplay.textContent = resultMessage;
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
