const express = require("express");
// const res = require("express/lib/response");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(8080, () => console.log("listening on 8080"));

const { compare, chooseNumberOfGame, checkIfGameOver, startGame, getCountP2, getCountP1, getNumberOfPlays, getCountDraw } = require("./functions");
const { createGame, updateGameById } = require("./mongoDb")
let player1Selection, player2Selection;
let player1;
let player2;
let gameId;
let numberOfPlaysResponse;
let number;
let countDraw;
// let numberOfPlays;
// let player1SelectionLowerLetter;
// let player2SelectionLowerLetter;

app.get('/startGame', (req, res) => {
  res.send(
    `Hello player1, please eneter your name:\n
curl "http://localhost:8080/player1Name?name={player1Name}"\n`
  );
});

// app.get('/loadedStartGame', async (req, res) => {
//   let gameId = req.query.gameId
//   let startGame = await loadStartGame(gameId)
//   console.log(startGame)
//   res.send(`Game has been laoded, welcome ${startGame.name}
// to continue plaese use this link:\n
// curl http://localhost:8080/player1Name?name={player1Name}');
// });

app.get('/player1Name', async (req, res) => {
  let name = req.query.name;
  player1 = name;
  let game = await createGame({ player1Name: name })
  res.send(`Welcome to the game,${player1}. Hello player2, please enetr your name:\n
curl "http://localhost:8080/player2Name?gameId=${game.insertedId}&name={player2Name}"\n`
  );
});

app.get('/player2Name', async (req, res) => {
  let name = req.query.name;
  gameId = req.query.gameId;
  console.log(gameId)
  let game = await updateGameById(gameId, { player2Name: name })
  player2 = name;
  res.send(
    `Welcome to the game,${player2}. Please enter and odd number and greater\n
than 1 regarding how many times you wanna play:\n
curl "http://localhost:8080/numberOfPlays?gameId=${gameId}&number={number}"\n`
  );
});

app.get('/numberOfPlays', async (req, res) => {
  number = req.query.number;
  gameId = req.query.gameId;
  let game = await updateGameById(gameId, { selectedTotalnumberOfPlays: number })
  numberOfPlaysResponse = chooseNumberOfGame(number, gameId)
  res.send(numberOfPlaysResponse);
});

app.get('/player1Selection', (req, res) => {
  let selection1 = req.query.selection1;
  player1Selection = selection1;
  // let game = await updateGameById(gameId, {player1Selection: selection1})
  player1SelectionLowerLetter = player1Selection.toLowerCase();
  if (player1SelectionLowerLetter !== 'rock' && player1SelectionLowerLetter !== 'paper' && player1SelectionLowerLetter !== 'scissors') {
    res.send(`${player1},you chose ${player1SelectionLowerLetter}. Please enter the right selection from rock,paper and scissors by using:\n
curl "http://localhost:8080/player1Selection?gameId=${gameId}&selection1={selection1}"\n`)
  } else {
    res.send(`${player1},you chose ${player1SelectionLowerLetter}. ${player2}, please enter your option from from rock,paper and scissors here:\n
curl "http://localhost:8080/player2Selection?gameId=${gameId}&selection2={selection2}"\n`)
  }
});

app.get('/player2Selection', (req, res) => {
  let selection2 = req.query.selection2;
  player2Selection = selection2
  // let game = await updateGameById(gameId, {player2Selection: selection2})
  player2SelectionLowerLetter = player2Selection.toLowerCase()
  if (player2SelectionLowerLetter !== 'rock' && player2SelectionLowerLetter !== 'paper' && player2SelectionLowerLetter !== 'scissors') {
    res.send(`${player2}, you chose ${player2SelectionLowerLetter}. Please enter the right selection from rock, paper and scissors by using:\n
curl "http://localhost:8080/player2Selection?gameId=${gameId}&selection2={selection2}"\n`)
  } else {
    res.send(`${player2}, you selected ${player2SelectionLowerLetter}. Please see the result of the game for this time here:\n
curl "http://localhost:8080/gameResultThisTime?gameId=${gameId}"\n`)
  }
});

app.get('/gameResultThisTime', (req, res) => {
  let winnerThisTime = compare(player1Selection, player2Selection, player1, player2, countDraw)
  // let game = await updateGameById(gameId, {winnerThisTime: winnerThisTime})
  if (winnerThisTime === "draw") {
    res.send(`The game is ${winnerThisTime} !!!. To continue please please go to:\n
curl "http://localhost:8080/player1Selection?gameId=${gameId}&selection1={selection1}"\n`)
  } else {
    res.send(`The winner for this time is ${winnerThisTime}. To continue the game please go to:\n
curl "http://localhost:8080/gameFinalResult"\n`)
  }
});

app.get('/gameFinalResult', async (req, res) => {
  let countp1 = getCountP1()
  console.log(countp1)
  let countp2 = getCountP2()
  console.log(countp2)
  let numberOfPlays = getNumberOfPlays(number)
  console.log(numberOfPlays)
  countDraw = getCountDraw()
  console.log(countDraw)
  let winnerAll = checkIfGameOver(countp1, countp2, numberOfPlays, player1, player2,gameId, countDraw);
  let game = await updateGameById(gameId, { player1TotalWin: countp1, player2TotalWin: countp2, 
    ActualTotalNumberOfPlays: countp1+countp2+countDraw, numberOfDrawPlays: countDraw })
  res.send(winnerAll);
});
