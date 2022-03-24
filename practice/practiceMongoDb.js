// const MongoClient = require("mongodb").MongoClient;
const { ObjectID } = require("bson");
const {MongoClient, ObjectId} = require("mongodb");
let dbName = "Moh";
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

const createPerson = async (newPersonData) => {
    let peopleCollection = await getCollection('people')
    let result = await peopleCollection.insertOne(newPersonData)
    console.log(result)
}

const findPeopleByName = async (name) => {
    let peopleCollection = await getCollection ("people")
    let peopleCursor = await peopleCollection.find({name : name});
    let peopleArray = await peopleCursor.toArray();
    console.log("people is", peopleArray)
};

const findPersonById = async (id) => {
    let peopleCollection = await getCollection("people")
    let person = await peopleCollection.findOne({_id: ObjectId(id)})
    console.log('person by id :', person)
}
const updatePersonById = async (id, newPersonData) => {
    let peopleCollection = await getCollection("people");
    let updated = await peopleCollection.updateOne(
        {_id:ObjectId(id)}, 
        {$set :newPersonData} 
    );     
        console.log("updated:", updated);
};
const findAllPeople = async () => {
    let peopleCollection = await getCollection ("people")
    let peopleCursor = await peopleCollection.find({});
    let peopleArray = await peopleCursor.toArray();
    console.log("All people is", peopleArray)
}
const deletPersonById = async (id)=> {
    let peopleCollection = await getCollection("people");
    let deletedPerson = await peopleCollection.deleteOne({_id:ObjectId(id)});
    console.log("deleted:", deletedPerson);
}

// deletPersonById("623baf6576129c6cb4100130")
// findAllPeople()
// updatePersonById("623bb4549a456cacee8b22bf", {name: "Moh"})
// findPeopleByName("Danielle")
createPerson({name: "Dani", age:36});
// findPersonByName("Danielle");
// findPersonById("623baf6576129c6cb4100130")

