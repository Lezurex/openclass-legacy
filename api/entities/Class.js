/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 23.03.21, 17:19
 */

const Subject = require('./Subject');
const Role = require('./Role');
const Task = require('./Task');

/**
 * A class is the foundation of the application. Tasks, roles and subjects live inside of a class.
 * A user can belong to a class through a {@link ClassRelation}.
 * @class Class
 */
module.exports = class Class {

    id;
    name;
    subjects;
    roles;
    tasks;

    /**
     * Creates a new class instance
     * @param id {number} Unique identifier to quickly access the class inside the database or the {@link global.classes} list
     * @param name {string} Display name of the class
     * @param subjects {Object} List with {@link Subject Subjects} and their IDs as key
     * @param roles {Object} List with {@link Role Roles} and their IDs as key
     * @param tasks {Object} List with {@link Task Tasks} and their IDs as key
     */
    constructor(id, name, subjects, roles, tasks) {
        this.id = id;
        this.name = name;
        subjects ? this.subjects = subjects : this.subjects = {};
        roles ? this.roles = roles : this.roles = {};
        tasks ? this.tasks = tasks : this.tasks = {};
    }

    /**
     * Converts the instance to a JSON object without circular values.
     * @returns {{id:number,name:string,subjects:[number],roles:[number],tasks:[number]}}
     * A simplified object of the instance. Subjects, roles and tasks are linked with their IDs.
     */
    toJSON(deep = false, user = undefined) {
        let subjects = [];
        for (let subject of Object.values(this.subjects)) {
            if (deep)
                subjects.push(subject.toJSON())
            else
                subjects.push(subject.id);
        }
        let roles = [];
        for (let role of Object.values(this.roles)) {
            if (deep)
                roles.push(role.toJSON())
            else
                roles.push(role.id);
        }
        let tasks = [];
        for (let task of Object.values(this.tasks)) {
            if (deep)
                tasks.push(task.toJSON(user));
            else
                tasks.push(task.id);
        }
        let obj = {};
        obj.id = this.id;
        obj.name = this.name;
        obj.subjects = subjects;
        obj.roles = roles;
        obj.tasks = tasks;
        return obj;
    }

    /**
     * Deletes the class from the database and the cache, including all the relations to it.
     * @async
     * @returns {Promise<>} Resolved when database queries are finished.
     */
    async delete() {
        return new Promise(resolve => {
            global.db.query("DELETE FROM classes WHERE id=?;", [this.id], (err, result) => {
                if (result.affectedRows > 0) {
                    let promises = [];
                    for (let subject of Object.values(this.subjects)) {
                        promises.push(subject.delete());
                    }
                    for (let task of Object.values(this.tasks)) {
                        promises.push(task.delete());
                    }
                    for (let role of Object.values(this.roles)) {
                        promises.push(role.delete());
                    }
                    Promise.all(promises).then(value => {
                        delete global.classes[this.id];
                        delete this;
                        resolve();
                    })
                }
            })
        })
    }

    /**
     * Saves the instance to the database or creates a new entry if the id is undefined.
     * @async
     * @returns {Promise<>} Resolved when database queries are finished.
     */
    async saveToDB() {
        return new Promise(resolve => {
            if (this.id) {
                global.db.query("UPDATE classes SET name=? WHERE id=?", [this.name, this.id], (err, result) => {
                    if (err) console.error(err);
                    resolve();
                })
            } else {
                global.db.query("INSERT INTO classes(name) VALUES (?)", [this.name], (err, result) => {
                    if (err) console.error(err);
                    this.id = result.insertId;
                    global.classes[this.id] = this;
                    resolve();
                })
            }

        })
    }

    /**
     * Converts an entry from the database into a instance and loads all of its relations (tasks, roles, subjects).
     * @param obj {Object} Database entry object
     * @returns {Promise<Class>} Resolved when everything has been loaded.
     */
    static async fromDatabaseObject(obj) {
        return new Promise(((mainResolve, reject) => {
            let newClass = new Class(parseInt(obj.id), obj.name)
            let promises = [];
            let subjects = {};
            promises.push(new Promise(resolve => {
                global.db.query("SELECT * FROM subjects WHERE FK_class = ?;", [obj.id], (err, subjectObjects) => {
                    for (let subjectObject of subjectObjects) {
                        let subject = Subject.fromDatabaseObject(subjectObject);
                        subjects[subject.id] = subject;
                    }
                    newClass.subjects = subjects;
                    resolve();
                });
            }));
            let roles = {};
            promises.push(new Promise(resolve => {
                global.db.query("SELECT * FROM roles WHERE FK_class = ?;", [obj.id], (err, roleObjects) => {
                    for (let roleObject of roleObjects) {
                        let role = Role.fromDatabaseObject(roleObject);
                        roles[role.id] = role;
                    }
                    newClass.roles = roles;
                    resolve();
                });
            }))
            let tasks = {};
            promises.push(new Promise(resolve => {
                global.db.query("SELECT * FROM tasks WHERE FK_class = ?;", [obj.id], (err, taskObjects) => {
                    let taskPromises = [];
                    for (let taskObject of taskObjects) {
                        taskPromises.push(Task.fromDatabaseObject(taskObject).then(task => {
                            tasks[task.id] = task;
                        }));
                    }
                    Promise.all(taskPromises).then(() => {
                        newClass.tasks = tasks;
                        resolve();
                    })
                });
            }))
            global.classes[newClass.id] = newClass;
            Promise.all(promises).then(results => {
                mainResolve([newClass]);
            })
        }))
    }

}