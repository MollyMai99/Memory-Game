/*----- constants -----*/
const picture = [
  "https://picsum.photos/id/8/5000/3333",
  "https://picsum.photos/id/49/1280/792",
];
const WINNING_COMBOS = [];
const gameStatus = ["Start", "RightContinue", "WrongContinue", "End"];
/* 
Game Status:
Start: choose two pictures;
RightContinue: these two pictures are matched;
WrongContinue: these two pictures are not matched;
End: you match all pictures, win the game 
*/

console.log(picture);

/*----- state variables -----*/
let board;

/*----- cached elements  -----*/
const message = document.querySelector("h1");
const playAgainBtn = document.querySelector("button");

/*----- event listeners -----*/
document.getElementById("board").addEventListener("click", handleShow);
playAgainBtn.addEventListener("click", initialize);

/*----- functions -----*/
initialize();

function initialize() {
  console.log("initialize");
  board = [picture[1], picture[2], picture[1], picture[2]];
  gameStatu = gameStatus[0];
  render();
}

function handleShow(evt) {
  console.log(evt);
  console.log("handleShow");
  checkGameResult;
  render();
}

function checkGameResult() {
  console.log("checkgameresult");
}

function render() {
  renderBoard();
  renderMessage();
}

function renderBoard() {
  console.log("renderBoard");
}

function renderMessage() {
  console.log("renderMessage");
  if (gameStatu === gameStatus[0]) {
    console.log("game status is start");
  } else if (gameStatu === gameStatus[1]) {
    console.log("game status is right continue");
  } else if (gameStatu === gameStatus[2]) {
    console.log("game status is wrong continue");
  } else if (gameStatu === gameStatus[3]) {
    console.log("game status is end");
  }
}
