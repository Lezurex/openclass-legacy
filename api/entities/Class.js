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
        this.subjects = subjects;
        this.roles = roles;
        this.tasks = tasks;
    }

    static async fromDatabaseObject(obj) {
        return new Promise(((mainResolve, reject) => {
            let newClass = new Class(obj.id, obj.name)
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
                     for (let taskObject of taskObjects) {
                         let task = Task.fromDatabaseObject(taskObject);
                         tasks[task.id] = task;
                     }
                     newClass.tasks = tasks;
                     resolve();
                 });
             }))
            global.classes[newClass.id] = newClass;
            Promise.all(promises).then(results => {
                mainResolve([newClass]);
            })
        }))
    }

}