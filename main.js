/*----- constants -----*/
const picture = { 1: "", 2: "" };
const WINNING_COMBOS = [];

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
}

function handleShow(evt) {
  console.log(evt);
  console.log("handleShow");
  render();
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
}
