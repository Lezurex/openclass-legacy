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

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            teacher: this.teacher,
            class: this.classObj.id
        }
    }

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

    static fromDatabaseObject(obj) {
        let subject = new Subject(obj.id, obj.name, obj.teacher, global.classes[obj.FK_class]);
        global.subjects[subject.id] = subject;
        return subject;
    }
}