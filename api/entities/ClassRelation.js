module.exports = class ClassRelation {

    id;
    classId;
    userId;
    roleId;

    constructor(id, classId, userId, roleId) {
        this.id = id;
        this.classId = classId;
        this.userId = userId;
        this.roleId = roleId;
    }

    static fromDatabaseObject(obj) {
        return new ClassRelation(obj.id, obj.FK_class, obj.FK_user, obj.FK_role);
    }
}