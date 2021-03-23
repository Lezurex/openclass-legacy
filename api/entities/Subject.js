/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 23.03.21, 17:19
 */

/**
 * Used to describe a category or group of tasks of a certain subject in school.
 * Tasks are relating to subjects.
 * @class Subject
 */
module.exports = class Subject {

    id;
    name;
    teacher;
    classObj;

    /**
     * Creates a new subject instance.
     * @param id {number} Unique identifier to quickly access the class inside the database or the {@link global.subjects} list
     * @param name {string} Display name of the subject
     * @param teacher {string} Name of the teacher teaching this subject in school
     * @param classObj {Class} The class to which this subject belongs to
     */
    constructor(id, name, teacher, classObj) {
        this.id = id;
        this.name = name;
        this.teacher = teacher;
        this.classObj = classObj;
    }

    /**
     * Converts the instance to a JSON object without circular values.
     * @returns {{id:number,name:string,teacher:string,class:number}} A simplified object of the instance. Class is linked with its ID.
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            teacher: this.teacher,
            class: this.classObj.id
        }
    }

    /**
     * Deletes the subject from the database and the cache, including all the related tasks to it.
     * @async
     * @returns {Promise<>} Resolved when database queries are finished.
     */
    async delete() {
        return new Promise(resolve => {
            global.db.query("DELETE FROM subjects WHERE id=?;", [this.id], (err, result) => {
                if (result.affectedRows > 0) {
                    let tasksToDelete = Object.values(this.classObj.tasks).filter(task => task.subjectId === this.id);
                    tasksToDelete.forEach(task => task.delete());
                    delete global.subjects[this.id];
                    delete this.classObj.subjects[this.id];
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
                global.db.query("UPDATE subjects SET name=?,teacher=?,FK_class=? WHERE id=?", [this.name, this.teacher, this.classObj.id, this.id], (err, result) => {
                    if (err) console.error(err);
                    resolve();
                })
            } else {
                global.db.query("INSERT INTO subjects(name,teacher,FK_class) VALUES (?,?,?)", [this.name, this.teacher, this.classObj.id], (err, result) => {
                    if (err) console.error(err);
                    this.id = result.insertId;
                    global.subjects[this.id] = this;
                    resolve();
                })
            }

        })
    }

    /**
     * Converts an entry from the database into an instance.
     * @param obj {{id:number,name:string,teacher:string,FK_class:number}} Database entry object
     * @returns {Subject} Converted subject instance.
     */
    static fromDatabaseObject(obj) {
        let subject = new Subject(obj.id, obj.name, obj.teacher, global.classes[obj.FK_class]);
        global.subjects[subject.id] = subject;
        return subject;
    }
}