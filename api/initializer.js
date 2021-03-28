/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 28.03.21, 20:30
 */

/**
 * This file contains the initial loader which loads in all the data from the database.
 */

const Class = require('./entities/Class');
const User = require('./entities/User');

let connection;

/**
 * Initializes the global cache lists and fills them with data from the database.
 * @returns {Promise<void>}
 */
module.exports = async function () {
    console.log("Retrieving data from database...")
    connection = global.db;
    global.users = {};
    global.classes = {};
    global.classRelations = {};
    global.tasks = {};
    global.roles = {};
    global.subjects = {};
    global.ticks = {};
    await initClasses();
    await initUsers();
    addUsersToTicks();
    console.log("Data retrieved successfully!");
}

async function initClasses() {
    console.log("Initializing classes...");
    return new Promise((resolve => {
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
                await User.fromDatabaseObject(userObject);
            }
            resolve();
        })
    })
}

function addUsersToTicks() {
    console.log("Initializing ticks...");
    for (let tick of Object.values(global.ticks)) {
        tick.user = global.users[tick.user];
    }
}