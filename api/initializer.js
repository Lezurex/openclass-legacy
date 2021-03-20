const Class = require('./entities/Class');
const User = require('./entities/User');

let connection;

module.exports = async function () {
    console.log("Retrieving cache data from database...")
    connection = global.db;
    global.users = {};
    global.classes = {};
    global.classRelations = {};
    global.tasks = {};
    global.roles = {};
    global.subjects = {};
    await initClasses();
    await initUsers();
    console.log("Data retrieved successfully!");
}

async function initClasses() {
    console.log("Initializing classes...");
    return new Promise(((resolve, reject) => {
        connection.query("SELECT * FROM classes;", async (err, classObjects) => {
            for (let classObject of classObjects) {
                await Class.fromDatabaseObject(classObject);
            }
            resolve();
        });
    }))
}

async function initUsers() {
    console.log("Initializing users...");
    return new Promise(resolve => {
        connection.query("SELECT * FROM users;", async (err, userObjects) => {
            for (let userObject of userObjects) {
                let user = await User.fromDatabaseObject(userObject);
            }
            resolve();
        })
    })
}