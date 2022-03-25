const readlineSync = require("readline-sync");
const { createGame } = require("./mongoDb");
let countp1 = 0;
let countp2 = 0;
let numberOfPlays = 0;
let countDraw = 0;
let player1SelectionLowerLetter;
let player2SelectionLowerLetter;
let gameId;

let startGame = () => {
  console.log(`curl"http://localhost:8080/startGame"`)
}

// const loadStartGame= async (id) => {
//   let loadedStartGame = await findGameById(id)
//   startGame = loadedStartGame;
//   return startGame
// };
// const createGameState = async (name) => {
//   let newGameState = await createGame({name:name, countp1:0, countp2:0})
// }
const chooseNumberOfGame = (numberOfPlaysInput, gameId) => {
  numberOfPlays = numberOfPlaysInput;
  if (numberOfPlaysInput % 2 === 0 || numberOfPlaysInput <= 1 || isNaN(numberOfPlaysInput)){

    return `Please enter an odd number and greater than one.`;

  } else {
    return `you want to play ${numberOfPlays} times. Please choose your option from rock, paper and scissors here:\n
curl "http://localhost:8080/player1Selection?gameId=${gameId}&selection1={selection1}"\n`;
  }
}

const getCountP1 =  () => {
  return countp1;
}

const getCountP2 =  () => {
  return countp2;
}
const getCountDraw = () =>{
  return countDraw;
}

const getNumberOfPlays =  () => {
  return numberOfPlays;
}

const checkIfGameOver = (countp1, countp2, numberOfPlays, player1, player2, gameId, countDraw) => {
  if (countp1 >= ((numberOfPlays - 1) / 2) + 1 || countp2 >= ((numberOfPlays - 1) / 2) + 1) {
    let player1Name = player1;
    let player2Name = player2;
    
    return `The game is over. ${player1Name} won ${countp1} time(s), ${player2Name} won ${countp2} time(s) out of ${countp1+ countp2+ countDraw} total plays.`
  } else {
    return `The game ISNOT over. Please continue playing the game by using this link:,\n
curl "http://localhost:8080/player1Selection?selection1={selection1}"\n`
  }
}

function compare(a, b, c, d, f) {
  if (a === "rock") {
    if (b === "rock" ) {
      countDraw++
      return "draw"
    } else if (b === "paper") {
      countp2++
      return d;
    } else if (b === "scissors") {
      countp1++
      return c;
    }
  } else if (a === "paper") {
    if (b === "rock") {
      countp1++
      return c;
    } else if (b === "paper") {
      countDraw++
      return "draw";
    } else if (b === "scissors" ) {
      countp2++
      return d;
    }
  } else if (a === "scissors") {
    if (b === "rock") {
      countp2++
      return d;
    } else if (b === "paper") {
      countp1++
      return c;
    } else if (b === "scissors") {
      countDraw++
      return "draw";
    }
  }
}
module.exports = { compare, chooseNumberOfGame,startGame, checkIfGameOver, getCountP2, getCountP1, getNumberOfPlays, getCountDraw };