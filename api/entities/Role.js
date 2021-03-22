/**
 * The role lives within a class. Roles can be assigned to a class relation and define the permissions of the user.
 * @class Role
 */
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

    /**
     * Creates a new role instance
     * @param id {number} Unique identifier to quickly access the class inside the database or the {@link global.roles} list
     * @param name {string} Display name of the role
     * @param classObj {Class} The class where this role lives in
     * @param permissions {{addTasks:boolean,editTasks:boolean,deleteTasks:boolean,manageSubjects:boolean}} Key-value pairs of booleans
     */
    constructor(id, name, classObj, permissions) {
        this.id = id;
        this.name = name;
        this.classObj = name;
        this.permissions = permissions;
    }

    /**
     * Converts the instance to a JSON object without circular values.
     * @returns {{id:number,name:string,class:Class,permissions:{addTasks:boolean,editTasks:boolean,deleteTasks:boolean,manageSubjects:boolean}}} A simplified object of the instance
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            class: this.classObj.id,
            permissions: this.permissions
        }
    }

    /**
     * Deletes the role from the database and the cache and sets the role field of {@link ClassRelation class relations} to null.
     * @async
     * @returns {Promise<>} Resolved when database queries are finished.
     */
    async delete() {
        return new Promise(resolve => {
            global.db.query("DELETE FROM roles WHERE id=?;", [this.id], (err, result) => {
                if (result.affectedRows > 0) {
                    let promises = [];
                    let relations = Object.values(global.classRelations).filter(relation => relation.role.id === this.id);
                    relations.forEach(relation => {
                        relation.role = null;
                        promises.push(relation.saveToDB());
                    })
                    delete this.classObj.roles[this.id];
                    delete global.roles[this.id];
                    delete this;
                    Promise.all(promises).then(() => resolve())
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
                global.db.query("UPDATE roles SET name=?,addTasks=?,deleteTasks=?,manageSubjects=?,FK_class=? WHERE id=?",
                    [this.name, this.permissions.addTasks, this.permissions.deleteTasks, this.permissions.manageSubjects, this.class.id, this.id], err => {
                    if (err) console.error(err);
                    resolve();
                })
            } else {
                global.db.query("INSERT INTO roles(name, addTasks, editTasks, deleteTasks, manageSubjects, FK_class) VALUES (?,?,?,?,?,?)",
                    [this.name, this.permissions.addTasks, this.permissions.deleteTasks, this.permissions.manageSubjects, this.class.id, this.id], (err, result) => {
                    if (err) console.error(err);
                    this.id = result.insertId;
                    global.roles[this.id] = this;
                    resolve();
                })
            }

        })
    }

    /**
     * Converts an entry from the database into a instance.
     * @param obj {{id:number,name:string,FK_class:number,addTasks:number,editTasks:number,deleteTasks:number,manageSubjects:number}} Database entry object
     * @returns {Promise<Class>} Resolved when everything has been loaded.
     */
    static fromDatabaseObject(obj) {
        let permissions = {
            addTasks: obj.addTasks === 1,
            editTasks: obj.editTasks === 1,
            deleteTasks: obj.deleteTasks === 1,
            manageSubjects: obj.manageSubjects === 1,
        }
        let role = new Role(obj.id, obj.name, global.classes[obj.FK_class], permissions);
        global.roles[role.id] = role;
        return role;
    }
}