// const MongoClient = require("mongodb").MongoClient;
const { ObjectID } = require("bson");
const {MongoClient, ObjectId} = require("mongodb");
let dbName = "rock-paper-scissors";
let connectionString = "mongodb://localhost:27017";
const getDb = async () => {
 let connection = await MongoClient.connect(connectionString);
 let db = connection.db(dbName);
 return db;
};

const getCollection = async (name) => {
    let db = await getDb();
    let collection = db.collection(name);
    return collection;
   };

const createGame = async (newGameData) => {
    let gameCollection = await getCollection('game')
    let result = await gameCollection.insertOne(newGameData)
    console.log(result);
    return result
}

// const findGameByName = async (name) => {
//     let gameCollection = await getCollection ("game")
//     let gameCursor = await gameCollection.find({name : name});
//     let gameArray = await gameCursor.toArray();
//     console.log("game is", gameArray)
// };

const findGameById = async (id) => {
    let gameCollection = await getCollection("game")
    let game = await gameCollection.findOne({_id: ObjectId(id)})
    console.log('game by id :', game)
    return game;
}
const updateGameById = async (id, newGameData) => {
    let gameCollection = await getCollection("game");
    let updated = await gameCollection.updateOne(
        {_id:ObjectId(id)}, 
        {$set :newGameData} 
    );     
        console.log("updated:", updated);
        return updated
};
const findAllGame = async () => {
    let gameCollection = await getCollection ("game")
    let gameCursor = await gameCollection.find({});
    let gameArray = await gameCursor.toArray();
    console.log("All game is", gameArray)
    return gameArray
}
const deleteGameById = async (id)=> {
    let peopleCollection = await getCollection("game");
    let deletedGame = await peopleCollection.deleteOne({_id:ObjectId(id)});
    console.log("deleted:", deletedGame);
    return deletedGame
};

module.exports = {deleteGameById, findAllGame, findGameById,updateGameById, createGame }

