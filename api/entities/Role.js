module.exports = class Role {

    id;
    name;
    classObj;
    permissions = {
        addTasks: false,
        editTasks: false,
        deleteTasks: false,
        manageSubjects: false
    }


    constructor(id, name, classObj, permissions) {
        this.id = id;
        this.name = name;
        this.classObj = name;
        this.permissions = permissions;
    }

    async delete() {
        return new Promise(resolve => {
            global.db.query("DELETE FROM roles WHERE id=?;", [this.id], (err, result) => {
                if (result.affectedRows > 0) {
                    delete this.classObj.roles[this.id];
                    delete global.roles[this.id];
                    delete this;
                    resolve();
                }
            })
        })
    }

    async saveToDB() {
        return new Promise(resolve => {
            if (this.id) {
                global.db.query("UPDATE roles SET name=?,addTasks=?,deleteTasks=?,manageSubjects=?,FK_class=? WHERE id=?",
                    [this.name, this.permissions.addTasks, this.permissions.deleteTasks, this.permissions.manageSubjects, this.class.id, this.id], (err, result) => {
                    if (err) console.error(err);
                    resolve();
                })
            } else {
                global.db.query("INSERT INTO roles(name, addTasks, editTasks, deleteTasks, manageSubjects, FK_class) VALUES (?,?,?,?,?,?)",
                    [this.name, this.permissions.addTasks, this.permissions.deleteTasks, this.permissions.manageSubjects, this.class.id, this.id], (err, result) => {
                    if (err) console.error(err);
                    this.id = result.insertId;
                    global.ticks[this.id] = this;
                    resolve();
                })
            }

        })
    }

    static fromDatabaseObject(obj) {
        let role = new Role(obj.id, obj.name, global.classes[obj.FK_class]);
        role.permissions = {
            addTasks: obj.addTasks === 1,
            editTasks: obj.editTasks === 1,
            deleteTasks: obj.deleteTasks === 1,
            manageSubjects: obj.manageSubjects === 1,
        }
        global.roles[role.id] = role;
        return role;
    }
}