
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://amit:tutu@cluster0-fu2ws.mongodb.net/test?retryWrites=true&w=majority";
const config = require('../config')
const logger = require('./logger.service')


module.exports = {
    getCollection
}

// Database Name

var dbConn = null;
const dbName = 'house_db';
async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}

async function connect() {
    if (dbConn) return dbConn;
    try {
      
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        // const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err;
    }
}






