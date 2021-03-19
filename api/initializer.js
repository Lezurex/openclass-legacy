const Database = require('./database/Database');
const Class = require('./entities/Class');

let connection;

module.exports = async function () {
    connection = global.db;
    global.users = {};
    global.classes = {};
    global.classRelations = {};
    global.tasks = {};
    global.roles = {};
    global.subjects = {};
    await initClasses();

}

async function initClasses() {
    return new Promise(((resolve, reject) => {
        connection.query("SELECT * FROM classes;", async (err, classObjects) => {
            for (let classObject of classObjects) {
                let classInstance = await Class.fromDatabaseObject(classObject);
                console.log(classInstance)
            }
            resolve(true);
        });
    }))
}

function initUsers() {

}