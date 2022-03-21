const readlineSync = require("readline-sync");

let countp1 = 0;
let countp2 = 0;
let numberOfPlays = 0;

const startGame = () => {
  console.log(`curl http://localhost:4000/startGame `)
}

const chooseNumberOfGame = (numberOfPlaysInput) => {
  numberOfPlays = numberOfPlaysInput;
  if (numberOfPlaysInput % 2 === 0 || numberOfPlaysInput <= 1 || isNaN(numberOfPlaysInput)){

    return `Please enter an odd number and greater than 1.`;

  } else {
    return `you want to play ${numberOfPlays} times. Please choose your option here:\n
curl http://localhost:4000/player1Selection?selection1={selection1}\n`;
  }
}
const getCountP1 = () => {
  return countp1;
}

const getCountP2 = () => {
  return countp2;
}

const getNumberOfPlays = () => {
  return numberOfPlays;
}

const checkIfGameOver = (countp1, countp2, numberOfPlays, player1, player2) => {
  if (countp1 >= ((numberOfPlays - 1) / 2) + 1 || countp2 >= ((numberOfPlays - 1) / 2) + 1) {
    let player1Name = player1;
    let player2Name = player2;
    return `The game is over. ${player1Name} won ${countp1} time(s), ${player2Name} won ${countp2} time(s) out of ${countp1 + countp2} total plays.`
  } else {
    return `Please continue playing the game,\n
curl http://localhost:4000/player1Selection?selection1={selection1}\n`
  }
}

function compare(a, b, c, d) {
  if (a === "rock") {

    if (b === "rock" ) {
      return "draw"
    } else if (b === "paper") {
      countp2++
      return d;
    } else if (b === "scissors") {
      countp1++
      return c;
    }
  } else if (a === "paper") {
    if (b === 'rock') {
      countp1++
      return c;
    } else if (b === 'paper') {
      return 'draw';
    } else if (b === 'scissors' ) {
      countp2++
      return d;
    }
  } else if (a === "scissors") {
    if (b === 'rock') {
      countp2++
      return d;
    } else if (b === 'paper') {
      countp1++
      return c;
    } else if (b === 'scissors') {
      return 'draw';
    }
  }
}
module.exports = { compare, chooseNumberOfGame, startGame, checkIfGameOver, getCountP2, getCountP1, getNumberOfPlays };