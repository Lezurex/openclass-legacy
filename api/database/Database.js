const mysql = require("mysql");
const dbConfig = require("../../config/database.json");
const initializer = require("../initializer");

class Database {

    static con;

    static connect() {
        global.db = mysql.createConnection(dbConfig);
        global.db.on("error", error => {
            if (!error.fatal)
                return;
            if (!['PROTOCOL_PACKETS_OUT_OF_ORDER', 'PROTOCOL_CONNECTION_LOST', 'ECONNREFUSED'].includes(error.code)) {
                throw error;
            }
            console.log("Database connection lost or failed. Trying to reconnect in 10s...");
            setTimeout(() => {
                Database.connect();
            }, 10000);
        })
        global.db.connect(function (err) {
            if (err) {
                db.emit("error", err);
                return;
            }
            console.log("Connected!")
            initializer();
        });
    }
}

module.exports = Database;