module.exports = class Task {

    id;
    title;
    body;
    dueDate;
    subjectId;
    classId;

    constructor(id, title, body, dueDate, subjectId, classId) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.dueDate = dueDate;
        this.subjectId = subjectId;
        this.classId = classId;
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

    static fromDatabaseObject(obj) {
        let task = new Task(obj.id, obj.title, obj.body, obj.dueDate, obj.FK_subject, obj.FK_class);
        global.tasks[task.id] = task;
        return task;
    }

}