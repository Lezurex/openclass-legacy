const mysql = require("mysql");
const path = require("path");
const fs = require("fs");

class Database {

    #_con;

    constructor() {
        let credentials = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config/database.json")).toString());
        this.#_con = mysql.createConnection(credentials);
        this.#_con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        })
    }

    get con() {
        return this.#_con;
    }
}

module.exports = Database;