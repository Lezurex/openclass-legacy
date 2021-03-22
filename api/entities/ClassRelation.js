/**
 * The class relation connects a {@link User} with a {@link Class} and defines their relation.
 * The relation also includes the {@link Role} of the user in that class, which contains permissions.
 * @class ClassRelation
 */
module.exports = class ClassRelation {

    id;
    class;
    user;
    role;

    /**
     * Creates a new ClassRelation instance
     * @param id {number} Unique identifier to quickly access the class relation inside the database or the
     * {@link global.classRelations} list
     * @param classInstance {Class} Instance of the class related to the user
     * @param user {User} Instance of the user related to the class
     * @param role {Role} The role of the user inside the class
     */
    constructor(id, classInstance, user, role) {
        this.id = id;
        this.class = classInstance;
        this.user = user;
        this.role = role;
    }

    /**
     * Converts the instance to a JSON object without circular values.
     * @returns {{id:number,class:number,user:number,role:Role}} A simplified object of the instance
     */
    toJSON() {
        let obj = {};
        obj.id = this.id;
        obj.class = this.class.id;
        obj.user = this.user.id;
        obj.role = this.user.role;
        return obj;
    }

    /**
     * Deletes the relation from the database and the cache.
     * @async
     * @returns {Promise<>} Resolved when the database query is finished.
     */
    async delete() {
        return new Promise(resolve => {
            global.db.query("DELETE FROM classRelation WHERE id=?;", [this.id], (err, result) => {
                if (result.affectedRows > 0) {
                    delete global.classRelations[this.id];
                    delete this.user.classRelations[this.id];
                    delete this;
                    resolve();
                }
            })
        })
    }

    /**
     * Saves the instance to the database or creates a new entry if the id is undefined.
     * @async
     * @returns {Promise<>} Resolved when the database queries are finished.
     */
    async saveToDB() {
        return new Promise(resolve => {
            if (this.id) {
                global.db.query("UPDATE classRelation SET FK_class=?,FK_user=?,FK_role=? WHERE id=?", [this.class.id, this.user.id, this.role.id, this.id], (err, result) => {
                    if (err) console.error(err);
                    resolve();
                })
            } else {
                global.db.query("INSERT INTO classRelation(FK_user, FK_class, FK_role) VALUES (?,?,?)", [this.user.id, this.class.id, this.role.id], (err, result) => {
                    if (err) console.error(err);
                    this.id = result.insertId;
                    global.classRelations[this.id] = this;
                    resolve();
                })
            }

        })
    }

    /**
     * Converts an entry from the database into a instance.
     * @param obj {{id:number,FK_class:number,FK_user:number,FK_role:number}} Database entry object
     * @returns {ClassRelation} Converted ClassRelation instance
     */
    static fromDatabaseObject(obj) {
        let relation = new ClassRelation(parseInt(obj.id), global.classes[obj.FK_class + ''], global.users[obj.FK_user + ''], global.roles[obj.FK_role + '']);
        global.classRelations[relation.id] = relation;
        return relation;
    }
}