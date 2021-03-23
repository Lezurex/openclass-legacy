/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 23.03.21, 17:19
 */

const db = require("../database/Database");
const ClassRelation = require("./ClassRelation");

/**
 * Represents a user of the webservice. Will be used on the req.session object.
 * @class User
 */
module.exports = class User {

    id;
    email;
    password;
    firstname;
    lastname;
    isAdmin;
    settings;
    classRelations = {};

    /**
     * Creates a new user instance.
     * @param id {number} Unique identifier to quickly access the class inside the database or the {@link global.users} list
     * @param email {String} The user's email address
     * @param password {String} The user's hashed password
     * @param firstname {String} The user's first name, if set
     * @param lastname {String} The user's last name, if set
     * @param isAdmin {boolean} Whether or not the user has administration permissions.
     * @param settings {{}=} Not used yet
     * @constructor
     */
    constructor(id, email, password, firstname, lastname, isAdmin, settings) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.isAdmin = isAdmin;
        this.settings = settings;
    }

    /**
     * Converts the instance to a JSON object without circular values.
     * @returns {{id:number,email:string,firstname:string,lastname:string,isAdmin:boolean,classRelations:{ClassRelation}}}
     * A simplified object of the instance.
     */
    toJSON() {
        let obj = {};
        obj.id = this.id;
        obj.email = this.email;
        obj.firstname = this.firstname;
        obj.lastname = this.lastname;
        obj.isAdmin = this.isAdmin;
        let classRelations = {};
        for (let [key, relation] of Object.entries(this.classRelations)) {
            classRelations[key] = relation.toJSON();
        }
        obj.classRelations = classRelations;
        return obj;
    }

    /**
     * Saves the instance to the database or creates a new entry if the id is undefined.
     * @async
     * @returns {Promise<>} Resolved when database queries are finished.
     */
    async saveToDB() {
        return new Promise(resolve => {
            if (this.id) {
                global.db.query("UPDATE users SET email=?,password=?,firstname=?,lastname=?,isAdmin=? WHERE id=?", [this.email, this.password, this.firstname, this.lastname, this.isAdmin, this.id], (err, result) => {
                    if (err) console.error(err);
                    resolve();
                })
            } else {
                global.db.query("INSERT INTO users(email,password,firstname,lastname,isAdmin) VALUES (?,?,?,?,?)", [this.email, this.password, this.firstname, this.lastname, this.isAdmin, this.id], (err, result) => {
                    if (err) console.error(err);
                    this.id = result.insertId;
                    global.users[this.id + ""] = this;
                    resolve();
                })
            }

        })
    }

    /**
     * Deletes the user from the database and the cache and removes all related {@link ClassRelation class relations}.
     * @async
     * @returns {Promise<>} Resolved when database queries are finished.
     */
    async delete() {
        return new Promise(resolve => {
            global.db.query("DELETE FROM users WHERE id=?;", [this.id], (err, result) => {
                if (result.affectedRows > 0) {
                    let promises = [];
                    for (let relation of Object.values(this.classRelations)) {
                        delete this.classRelations[relation.id];
                        promises.push(relation.delete());
                    }
                    delete global.users[this.id];
                    delete this;
                    Promise.all(promises).then((value => {
                        resolve();
                    }))
                }
            })
        })
    }

    /**
     * Converts an entry from the database into an instance.
     * @param obj {{id:number,email:string,password:string,firstname:string,lastname:string,isAdmin:boolean}} Database entry object
     * @returns {Promise<User>} Promise with converted user instance when finished.
     * @async
     */
    static async fromDatabaseObject(obj) {
        return new Promise(mainResolve => {
            let user = new User(obj.id, obj.email, obj.password, obj.firstname, obj.lastname, obj.isAdmin);
            global.users[user.id + ''] = user;
            global.db.query("SELECT * FROM classRelation WHERE FK_user = ?;", [user.id], (err, result) => {
                for (let relationObject of result) {
                    let relation = ClassRelation.fromDatabaseObject(relationObject);
                    user.classRelations[relation.id] = relation;
                }
                mainResolve(user);
            });
        })
    }


}