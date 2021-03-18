module.exports = class Subject {

    static subjects = {};

    id;
    name;
    teacher;


    constructor(id, name, teacher) {
        this.id = id;
        this.name = name;
        this.teacher = teacher;
    }

    static fromDatabaseObject(obj) {
        let subject = new Subject(obj.id, obj.name, obj.teacher);
        this.subjects[subject.id] = subject;
        return subject;
    }
}