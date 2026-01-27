const { MongoClient } = require('mongodb');
const dbUrl = "mongodb://localhost:27017"

const client = new MongoClient(dbUrl);

let dbConnection = async() => {
    await client.connect();
    console.log("MongoDB Connected Successfully");
    let db = client.db("schoolDB");
    return db;
}

module.exports = {dbConnection};
