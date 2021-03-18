const db = require("../database/Database");
const Subject = require('./Subject');
const Role = require('./Role');
const Task = require('./Task');

module.exports = class Class {

    static classes = {};

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

    static fromDatabaseObject(obj) {
        let subjectObjects = db.con.query("SELECT * FROM subjects WHERE FK_class = ?;", [obj.id]);
        let roleObjects = db.con.query("SELECT * FROM roles WHERE FK_class = ?;", [obj.id]);
        let taskObjects = db.con.query("SELECT * FROM tasks WHERE FK_class = ?;", [obj.id]);

        let subjects = {};
        for (let subjectObject of subjectObjects) {
            let subject = Subject.fromDatabaseObject(subjectObject);
            subjects[subject.id] = subject;
        }

        let roles = {};
        for (let roleObject of roleObjects) {
            let role = Role.fromDatabaseObject(roleObject);
            roles[role.id] = role;
        }

        let tasks = {};
        for (let taskObject of taskObjects) {
            let task = Task.fromDatabaseObject(taskObject);
            tasks[task.id] = task;
        }

        let newClass = new Class(obj.id, obj.name)
    }

}