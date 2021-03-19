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

    static fromDatabaseObject(obj) {
        let task = new Task(obj.id, obj.title, obj.body, obj.dueDate, obj.FK_subject, obj.FK_class);
        global.tasks[task.id] = task;
    }

}