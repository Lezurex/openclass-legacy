const mysql = require("mysql");
const config = require("../../config/config.json").database;
const initializer = require("../initializer");
const fs = require('fs');

const dbStructurePath = "../db_structure.sql";

class Database {

    static con;

    static connect() {
        config.database = "simpleclass";
        global.db = mysql.createConnection(config);
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

    static createTables() {
        fs.readFile(dbStructurePath, "UTF-8", (err, data) => {
            console.log("Initializing database with required tables...");
            if (err) {
                console.error(err);
                console.error("Database structure file failed to load!");
            } else {
                config.database = "simpleclass";
                config.multipleStatements = true;
                const con = mysql.createConnection(config);
                con.connect((err) => {
                    if (err) {
                        console.error(err);
                        console.error("Couldn't connect to database to create required tables!");
                    } else {
                        con.query(data, (err, result) => {
                            if (err) {
                                console.error(err);
                                console.error("Couldn't create required tables in database!")
                            } else {
                                this.connect();
                            }
                        });
                    }
                })
            }
        });
    }

}

module.exports = Database;