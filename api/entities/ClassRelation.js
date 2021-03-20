module.exports = class ClassRelation {

    id;
    class;
    user;
    role;

    constructor(id, classInstance, user, role) {
        this.id = id;
        this.class = classInstance;
        this.user = user;
        this.role = role;
    }

    toJSON() {
        let obj = {};
        obj.id = this.id;
        obj.class = this.class.id;
        obj.user = this.user.id;
        obj.role = this.user.role;
        return obj;
    }

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

    static fromDatabaseObject(obj) {
        let relation = new ClassRelation(parseInt(obj.id), global.classes[obj.FK_class + ''], global.users[obj.FK_user + ''], global.roles[obj.FK_role + '']);
        global.classRelations[relation.id] = relation;
        return relation;
    }
}