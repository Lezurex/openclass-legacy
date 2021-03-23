/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 23.03.21, 17:19
 */

const Tick = require('./Tick');

/**
 * Represents a single task/assignment of a class and keeps information about it.
 * @class Task
 */
module.exports = class Task {

    id;
    title;
    body;
    dueDate;
    subjectId;
    classId;
    ticks = {};

    /**
     * Creates a new task instance.
     * @param id {number} Unique identifier to quickly access the class inside the database or the {@link global.tasks} list
     * @param title {string} Short heading of the task
     * @param body {string} Longer description of the task with details. Can contain HTML-formatted content.
     * @param dueDate {Date} Date when this task should be done
     * @param subjectId {number} ID of the related subject
     * @param classId {number} ID of the class this task belongs to
     */
    constructor(id, title, body, dueDate, subjectId, classId) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.dueDate = dueDate;
        this.subjectId = subjectId;
        this.classId = classId;
    }

    /**
     * Converts the instance to a JSON object without circular values.
     * @returns {{id:number,title:string,body:string,dueDate:string,subject:number,class:number}}
     * A simplified object of the instance. Class and subject are linked with its IDs. Date is formatted as ISO string.
     */
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            body: this.body,
            dueDate: this.dueDate.toISOString(),
            subject: this.subjectId,
            class: this.classId,
        }
    }

    /**
     * Deletes the task from the database and the cache and removes it from the class.
     * @async
     * @returns {Promise<>} Resolved when database queries are finished.
     */
    async delete() {
        return new Promise(resolve => {
            global.db.query("DELETE FROM tasks WHERE id=?;", [this.id], (err, result) => {
                if (result.affectedRows > 0) {
                    delete global.classes[this.classId].tasks[this.id];
                    delete global.tasks[this.id];
                    delete this;
                    resolve();
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
                global.db.query("UPDATE tasks SET title=?,body=?,dueDate=?,FK_subject=?,FK_class=? WHERE id=?", [this.title, this.body, this.dueDate, this.subjectId, this.classId, this.id], (err, result) => {
                    if (err) console.error(err);
                    resolve();
                })
            } else {
                global.db.query("INSERT INTO tasks(title, body, dueDate, FK_subject, FK_class) VALUES (?,?,?,?,?)", [this.title, this.body, this.dueDate, this.subjectId, this.classId], (err, result) => {
                    if (err) console.error(err);
                    this.id = result.insertId;
                    global.tasks[this.id] = this;
                    resolve();
                })
            }

        })
    }

    /**
     * Converts an entry from the database into an instance.
     * @param obj {{id:number,title:string,body:string,dueDate:Date,FK_subject:number,FK_class:number}} Database entry object
     * @returns {Promise<Task>} Promise with converted task instance when finished.
     * @async
     */
    static async fromDatabaseObject(obj) {
        return new Promise(resolve => {
            let task = new Task(obj.id, obj.title, obj.body, obj.dueDate, obj.FK_subject, obj.FK_class);
            global.tasks[task.id] = task;
            global.classes[task.classId].tasks[task.id] = task;
            global.db.query("SELECT * FROM ticks WHERE FK_task=?", [task.id], (err, result) => {
                for (let tickObj of result) {
                    let tick = Tick.fromDatabaseObject(tickObj);
                    task.ticks[tick.id] = tick;
                }
                resolve(task);
            })
        })
    }

};