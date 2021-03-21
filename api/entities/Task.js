const Tick = require('./Tick');

module.exports = class Task {

    id;
    title;
    body;
    dueDate;
    subjectId;
    classId;
    ticks = {};

    constructor(id, title, body, dueDate, subjectId, classId) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.dueDate = dueDate;
        this.subjectId = subjectId;
        this.classId = classId;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            body: this.body,
            dueDate: this.dueDate.toISOString(),
            subject: this.subjectId,
            classId: this.classId,
        }
    }

    async delete() {
        return new Promise(resolve => {
            global.db.query("DELETE FROM tasks WHERE id=?;", [this.id], (err, result) => {
                if (result.affectedRows > 0) {
                    delete global.tasks[this.id];
                    delete this;
                    resolve();
                }
            })
        })
    }

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

    static async fromDatabaseObject(obj) {
        return new Promise(resolve => {
            let task = new Task(obj.id, obj.title, obj.body, obj.dueDate, obj.FK_subject, obj.FK_class);
            global.tasks[task.id] = task;
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