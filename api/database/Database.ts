/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 8/7/21, 12:57 AM
 */

import mysql, {Connection} from "mysql";
const config = require('../../config/config.json');
import initializer from "../initializer";
import fs from "fs";

const dbStructurePath = "../db_structure.sql";

/**
 * Class used to connect to the database and initialize it.
 */
class Database {

    static con : Connection;

    /**
     * Connects to the database with the given options. Initializes an event handler when
     * the connection gets lost and tries to reconnect.
     */
    static connect() {
        config.database === undefined ? config.database = 'openclass' : '';
        global.db = mysql.createConnection(config);
        /**
         * Register an event handler for errors
         */
        global.db.on("error", (error: { fatal: any; code: string; }) => {
            if (!error.fatal)
                return;
            // Exclude errors related to connection problems
            if (!['PROTOCOL_PACKETS_OUT_OF_ORDER', 'PROTOCOL_CONNECTION_LOST', 'ECONNREFUSED'].includes(error.code)) {
                console.error(error);
            }
            console.log("Database connection lost or failed. Trying to reconnect in 10s...");
            setTimeout(() => {
                // Retry the connection after 10 seconds
                Database.connect();
            }, 10000);
        })
        global.db.connect(function (err: any) {
            if (err) {
                global.db.emit("error", err);
                return;
            }
            console.log("Connected!")
            // Start the initializer when connection is established
            initializer();
        });
    }

    /**
     * Initializes the database with the required tables by executing the SQL script.
     */
    static createTables() {
        // Read the SQL statements from the template SQL file
        fs.readFile(dbStructurePath, "UTF-8", (err, data) => {
            console.log("Initializing database with required tables...");
            if (err) {
                console.error(err);
                console.error("Database structure file failed to load!");
            } else {
                // If there is no database name set in the config, use openclass.
                config.database === undefined ? config.database = 'openclass' : '';
                // Replace all occurrences of openclass with the specified name
                let script = data.replace(/openclass/g, config.database);
                let settings = JSON.parse(JSON.stringify(config));
                settings.multipleStatements = true;
                delete settings.database;
                const con = mysql.createConnection(settings);
                con.connect((err) => {
                    if (err) {
                        console.error(err);
                        console.error("Couldn't connect to database to create required tables! Please check the credentials and restart to retry!");
                    } else {
                        con.query(script, err => {
                            if (err) {
                                console.error(err);
                                console.error("Couldn't create required tables in database!")
                            } else {
                                con.end();
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