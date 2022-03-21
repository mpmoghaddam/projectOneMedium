const express = require("express");
const app = express();

app.listen(4000, () => console.log("listening on 4000"));

const { compare, chooseNumberOfGame,  checkIfGameOver,startGame, getCountP2, getCountP1, getNumberOfPlays } = require("./index");

let player1Selection, player2Selection;
let player1;
let player2;
let player1SelectionLowerLetter;
let player2SelectionLowerLetter;

app.get('/startGame', (req, res) => {
  res.send(
    `Hello player1, please eneter your name:\n
curl http://localhost:4000/player1Name?name={player1Name}\n`
  );
});

app.get('/player1Name', (req, res) => {
  let name = req.query.name;
  player1 = name;
  res.send(
    `Welcome to the game,${player1}. Hello player2, please enetr your name:\n
curl http://localhost:4000/player2Name?name={player2Name}\n`
  );
});

app.get('/player2Name', (req, res) => {
  let name = req.query.name;
  player2 = name;
  res.send(
    `Welcome to the game,${player2}. Please enter and odd number and greater than 1 regarding how many times you wanna play:\n
curl http://localhost:4000/numberOfPlays?number={number}\n`
  );
});

app.get('/numberOfPlays', (req, res) => {
  let number = req.query.number;
  let numberOfPlaysResponse = chooseNumberOfGame(number)
  res.send(numberOfPlaysResponse);
  });

app.get('/player1Selection', (req, res) => {
  let selection1 = req.query.selection1;
  player1Selection = selection1;
  player1SelectionLowerLetter = player1Selection.toLowerCase();
  if (player1SelectionLowerLetter !== 'rock' && player1SelectionLowerLetter !== 'paper' && player1SelectionLowerLetter !== 'scissors' ) {
    res.send(`${player1},you chose ${player1SelectionLowerLetter}. Please enter the right selection from rock,paper and scissors by using:\n
curl http://localhost:4000/player1Selection?selection1={selection1}\n`)
  } else {
    res.send(`${player1},you chose ${player1SelectionLowerLetter}. ${player2}, please select your option from here:\n
curl http://localhost:4000/player2Selection?selection2={selection2}\n`)
  }
});

app.get('/player2Selection', (req, res) => {
  let selection2 = req.query.selection2;
  player2Selection = selection2
  player2SelectionLowerLetter = player2Selection.toLowerCase()
  if (player2SelectionLowerLetter !== 'rock' && player2SelectionLowerLetter !== 'paper' && player2SelectionLowerLetter !== 'scissors') {
    res.send(`${player2}, you chose ${player2SelectionLowerLetter}. Please enter the right selection from rock, paper and scissors by using:\n
curl http://localhost:4000/player2Selection?selection2={selection2}\n`)
  } else {
    res.send(`${player2}, you selected ${player2SelectionLowerLetter}. Please see the result of the game for this time here:\n
curl http://localhost:4000/gameResultThisTime\n`)
  }
});

app.get('/gameResultThisTime', (req, res) => {
  let winnerThisTime = compare(player1SelectionLowerLetter, player2SelectionLowerLetter, player1, player2)
  if (winnerThisTime === "draw") {
    res.send(`The game is ${winnerThisTime} !!!. To continue please go to:\n
curl http://localhost:4000/player1Selection?selection1={selection1}\n`)
  } else {
    res.send(`The winner for this time is ${winnerThisTime}. To continue please go to:\n
curl http://localhost:4000/gameFinalResult\n`)
  }
});

app.get('/gameFinalResult', (req, res) => {
  let number = req.query.number;
  let countp1 = getCountP1()
  let countp2 = getCountP2()
  let numberOfPlays = getNumberOfPlays(number)
  let winnerAll = checkIfGameOver(countp1, countp2, numberOfPlays, player1, player2);
  res.send(winnerAll);

});
