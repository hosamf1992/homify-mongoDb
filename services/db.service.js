
const MongoClient = require('mongodb').MongoClient;

const config = require('../config')

module.exports = {
    getCollection
}

// Database Name

var dbConn = null;

async function getCollection(collectionName, dbName) {
    const db = await connect(dbName)
    return db.collection(collectionName);
}

async function connect(dbName) {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}




