const mysql = require("mysql");
const dbConfig = require("../../config/database.json");
const initializer = require("../initializer");

class Database {

    static con;

    static connect() {
        Database.con = mysql.createConnection(dbConfig);
        Database.con.connect(function ()
        {
            global.db = Database.con;
            console.log("Connected!")
            initializer();
        });
    }
}

module.exports = Database;