const board = document.querySelector('.boardContainer');
const turnDisp = document.querySelector('#turn');
const currPlayerDisp = document.querySelector('#currPlayer');
const score = document.querySelector('#score');
const error = document.querySelector('#error');
document.querySelector('#btn1').addEventListener("click",machineVshuman);
document.querySelector('#btn3').addEventListener("click",humanVshuman);
const buttonMH = document.querySelector('#btn1')
const buttonHH = document.querySelector('#btn3')

const game = {
  currentPlayer: "",
  mode:"",
  board: [["","",""],["","",""],["","",""]],
  turn: 0,
  p1Icon: "x",
  p2Icon: "o",
  winner: "none",
  score_p1: 0,
  score_p2: 0,
  score_m: 0,
  resetGame,
  startAgain,
  addIcon,
  displayTurnInfo,
  displayWinMessage,
  displayWrongMessage,
  prepareBoard,
  updateScore
}
function resetGame() {
  this.currentPlayer =  "";
  this.mode = "";
  this.board =  [["","",""],["","",""],["","",""]];
  this.turn =  0;
  this.winner =  "none";
  this.score_p1 = 0,
  this.score_p2 = 0,
  this.score_m = 0,
  this.prepareBoard()
  buttonMH.style.backgroundColor = "white", color = "black";
  buttonMH.style.color = "black";
  buttonHH.style.backgroundColor = "white";
  buttonHH.style.color = "black";
}

function startAgain () {
  console.log(game.currentPlayer)
  if(game.mode === 'hh') {
    game.currentPlayer =  game.currentPlayer == "p2" ? "p1" : "p2";
  }else {
    game.currentPlayer =  game.currentPlayer == "p1" ? "m" : "p1";
  }
  game.board =  [["","",""],["","",""],["","",""]];
  game.turn =  1;
  game.winner =  "none";
  game.prepareBoard()
  if(game.currentPlayer === "m"){
    machinePlays()
  }
}

function addIcon (row,col,icon) { 
  if(icon === 'x'){
    document.querySelector(`.square${(row*3)+col}`).innerHTML= `<div class="cross"></div>`;
  }else{
    document.querySelector(`.square${(row*3)+col}`).innerHTML= `<div class="circle"></div>`;
  }
}

function displayWrongMessage () {
  error.innerHTML = 'You cannot select that square!';
}

function addSelection (ind) {
  ind = parseInt(ind)
  if(game.currentPlayer === 'm') {
    alert("wait for machine")
  }else {
    const res = game.mode === 'hh' ? this.handleSelectionHH(Math.floor(ind/3),ind%3) : this.handleSelectionMH(Math.floor(ind/3),ind%3)
    if (!res) {
      this.displayWrongMessage()
    }
  }
}

function prepareBoard () {
  let boardString = `<div class="board">`;
  for (let i = 0; i < 9; i++) {
    boardString += ` <div class="square square${i}" id="${i}" onclick="addSelection(${i})"> </div> `
  }
  board.innerHTML = `${boardString}</div>`;
}

function displayTurnInfo () {
  turnDisp.innerHTML = `Turn: ${this.turn}`;
  currPlayerDisp.innerHTML = `Current Player: ${this.currentPlayer === 'p1' ? 'player 1' : this.currentPlayer === 'p2' ? 'player 2' : 'machine'}`;
  error.innerHTML = '';
}

function updateScore () {
  if (this.mode === 'hh'){
    score.innerHTML = `player 1: ${this.score_p1} - player 2: ${this.score_p2}`;
  } else {
    score.innerHTML = `player 1: ${this.score_p1} - machine: ${this.score_m}`;
  }
}

function displayWinMessage () {
  alert(`${this.currentPlayer === 'p1' ? 'player 1' : this.currentPlayer === 'p2' ? 'player 2' : 'machine'} has won!`)
}

/* Human vs Human version */
function humanVshuman () {
  game.resetGame();
  game.mode = "hh";
  game.currentPlayer = "p1";
  game.turn = 1;
  game.displayTurnInfo()
  game.updateScore()
  buttonHH.style.backgroundColor = "blue"
  buttonHH.style.color = "white"
}

function handleSelectionHH (row,col) {
  if(game.board[row][col]){
    return false
  }
  console.log("current player",game.currentPlayer)
  game.board[row][col] = game.currentPlayer;
  
  game.addIcon(row,col,game[`${game.currentPlayer}Icon`])
  // console.log(game.board)
  if (checkWin(row,col)){
    game.winner = game.currentPlayer;
    game[`score_${game.currentPlayer}`] += 1;
    game.displayWinMessage()
    game.updateScore()
    setTimeout(game.startAgain,1000)
  } else {console.log(game.turn)
    if(game.turn === 9) {
      alert ("no one wins")
      setTimeout(game.startAgain,1000)
    } else {
      game.currentPlayer = game.currentPlayer == "p2" ? "p1" : "p2";
      game.turn++;
      game.displayTurnInfo() 
    }
  }
  return true

}

function reducer (acc,ele) {
  if(game.board[ele[0]][ele[1]] !== game.currentPlayer){
    acc = false
  }
  return acc
}

function checkWin(row,col) {

  if([[row,0],[row,1],[row,2]].reduce(reducer,true)){
    return true
  }
  if([[0,col],[1,col],[2,col]].reduce(reducer,true)){
    return true
  }
  if(row==col){
    if([[0,0],[1,1],[2,2]].reduce(reducer,true)){
      return true
    }
  }
  if(row+col == 2) {
    if([[0,2],[1,1],[2,0]].reduce(reducer,true)){
      return true
    }
  }
  return false
}

/* Machine vs Human */
function machineVshuman () {
  game.resetGame()
  game.mode = "mh";
  game.currentPlayer = "m";
  game.turn = 1;
  game.displayTurnInfo()
  game.updateScore()
  setTimeout(machinePlays,1000)
  buttonMH.style.backgroundColor = "blue"
  buttonMH.style.color = "white"

}

function handleSelectionMH(row,col) {
  if(game.board[row][col]){
    return false
  }

  game.board[row][col] = game.currentPlayer;
  
  game.addIcon(row,col,game.p1Icon)
  // console.log(game.board)
  if (checkWin(row,col)){
    game.winner = game.currentPlayer;
    game[`score_${game.currentPlayer}`] += 1;
    game.displayWinMessage()
    game.updateScore()
    setTimeout(game.startAgain,1000)
  } else {
    if(game.turn === 9) {
      alert ("no one wins")
      setTimeout(game.startAgain,1000)
    } else {
      game.currentPlayer = "m";
      game.turn++;
      game.displayTurnInfo()
      setTimeout(machinePlays,1000)
    }
  }
  return true
}

function machinePlays () {
  let row = 0;
  let col = 0;
  let flag = true;
  let ite = 0;
  while (flag && ite < 20) {
    row = Math.round(Math.random()*2);
    col = Math.round(Math.random()*2);
    flag = game.board[row][col];
    ite++;
  }
  if(ite == 20 ){
    alert("machine gives up")
    game.resetGame()
    game.currentPlayer = game.mode === 'mh' ? 'm' : 'h';
    game.turn = 1;
    game.displayTurnInfo()
  }
  game.board[row][col] = "m";
  
  game.addIcon(row,col,game.p2Icon)

  if (checkWin(row,col)){
    game.winner = game.currentPlayer;
    game[`score_${game.currentPlayer}`] += 1;
    game.displayWinMessage()
    game.updateScore()
    setTimeout(game.startAgain,1000)
  } else {
    if(game.turn === 9) {
      alert ("no one wins")
      setTimeout(game.startAgain,1000)
    } else {
      game.currentPlayer = "p1";
      game.turn++;
      game.displayTurnInfo() 
    }
  }
}