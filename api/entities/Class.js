const con = require("../database/Database");
const Subject = require('./Subject');
const Role = require('./Role');
const Task = require('./Task');

module.exports = class Class {

    id;
    name;
    subjects;
    roles;
    tasks;

    constructor(id, name, subjects, roles, tasks) {
        this.id = id;
        this.name = name;
        subjects ? this.subjects = subjects : this.subjects = {};
        roles ? this.roles = roles : this.roles = {};
        tasks ? this.tasks = tasks : this.tasks = {};
    }

    toJSON() {
        let subjects = [];
        for (let subject of Object.values(this.subjects)) {
            subjects.push(subject.id);
        }
        let roles = [];
        for (let role of Object.values(this.roles)) {
            roles.push(role.id);
        }
        let tasks = [];
        for (let task of Object.values(this.tasks)) {
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