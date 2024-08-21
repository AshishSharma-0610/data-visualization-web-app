// config/database.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let db;

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        db = client.db("RQ_Analytics");
    } catch (e) {
        console.error("Could not connect to MongoDB", e);
        process.exit(1);
    }
}

function getDB() {
    return db;
}

module.exports = { connectDB, getDB };