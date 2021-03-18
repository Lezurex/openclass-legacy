const Database = require('./database/Database');
const Class = require('./entities/Class');

module.exports = function () {
    initClasses();
}

function initClasses() {
    console.log(Database.con);
    let db = Database.con;
    let classObjects = db.query("SELECT * FROM classes;");

    for (let classObject of classObjects) {
        let classInstance = Class.fromDatabaseObject(classObject);
    }
    console.log(Class.classes);
}

function initUsers() {

}