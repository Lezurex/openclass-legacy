const mysql = require("mysql");
const dbConfig = require("../../config/database.json");
const initializer = require("../initializer");

module.exports = class Database {

    static con;

    static connect() {
        Database.con = mysql.createConnection(dbConfig);
        Database.con.connect(function () {
            console.log("Connected!")
            console.log(Database.con);
            initializer();
        });
    }
}