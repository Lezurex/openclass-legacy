module.exports = class Role {

    static roles = {};

    id;
    name;
    permissions = {
        addTasks: false,
        editTasks: false,
        deleteTasks: false,
        manageSubjects: false
    }


    constructor(id, name, permissions) {
        this.id = id;
        this.name = name;
        this.permissions = permissions;
    }

    static fromDatabaseObject(obj) {
        let role = new Role(obj.id, obj.name);
        role.permissions = {
            addTasks: obj.addTasks === 1,
            editTasks: obj.editTasks === 1,
            deleteTasks: obj.deleteTasks === 1,
            manageSubjects: obj.manageSubjects === 1,
        }
        this.roles[role.id] = role;
        return role;
    }
}