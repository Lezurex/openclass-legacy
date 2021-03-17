const mysql = require("mysql");
const dbConfig = require("../../config/database.json");

class Database {

    #_con;

    constructor() {
        this.#_con = mysql.createConnection(dbConfig);
        this.#_con.connect(function (err) {
            if (err) {
                console.error("Connection to database failed successfully: " + err.code);
                return;
            }
            console.log("Connected!");
        });
    }

    get con() {
        return this.#_con;
    }
}

module.exports = Database;