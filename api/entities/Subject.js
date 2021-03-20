module.exports = class Subject {

    id;
    name;
    teacher;
    classObj;

    constructor(id, name, teacher, classObj) {
        this.id = id;
        this.name = name;
        this.teacher = teacher;
        this.classObj = classObj;
    }

    async delete() {
        return new Promise(resolve => {
            global.db.query("DELETE FROM subjects WHERE id=?;", [this.id], (err, result) => {
                if (result.affectedRows > 0) {
                    delete global.subjects[this.id];
                    delete this.classObj.subjects[this.id];
                    delete this;
                    resolve();
                }
            })
        })
    }

    async saveToDB() {
        return new Promise(resolve => {
            if (this.id) {
                global.db.query("UPDATE ticks SET FK_task=?,FK_user=? WHERE id=?", [this.task.id, this.user.id, this.id], (err, result) => {
                    if (err) console.error(err);
                    resolve();
                })
            } else {
                global.db.query("INSERT INTO ticks(FK_task, FK_user) VALUES (?,?)", [this.task.id, this.user.id], (err, result) => {
                    if (err) console.error(err);
                    this.id = result.insertId;
                    global.ticks[this.id] = this;
                    resolve();
                })
            }

        })
    }

    static fromDatabaseObject(obj) {
        let subject = new Subject(obj.id, obj.name, obj.teacher, global.classes[obj.FK_class]);
        global.subjects[subject.id] = subject;
        return subject;
    }
}