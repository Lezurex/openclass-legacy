const mysql = require("mysql");
const dbConfig = require("../../config/database.json");

class Database {

    static instance;

    con;

    constructor() {
        this.con = mysql.createConnection(dbConfig);
        this.con.connect;
        Database.instance = this;
    }
}

module.exports = Database;