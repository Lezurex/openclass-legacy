const db = require("../database/Database");
const ClassRelation = require("./ClassRelation");

module.exports = class User {

    id;
    email;
    password;
    firstname;
    lastname;
    isAdmin;
    settings;
    classRelations = {};

    constructor(id, email, password, firstname, lastname, isAdmin, settings) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.isAdmin = isAdmin;
        this.settings = settings;
    }

    toJSON() {
        let obj = {};
        obj.id = this.id;
        obj.email = this.email;
        obj.firstname = this.firstname;
        obj.lastname = this.lastname;
        obj.isAdmin = this.isAdmin;
        let classRelations = {};
        for (let [key, relation] of Object.entries(this.classRelations)) {
            classRelations[key] = relation.toJSON();
        }
        obj.classRelations = classRelations;
        return obj;
    }

    async saveToDB() {
        return new Promise(resolve => {
            if (this.id) {
                global.db.query("UPDATE users SET email=?,password=?,firstname=?,lastname=?,isAdmin=? WHERE id=?", [this.email, this.password, this.firstname, this.lastname, this.isAdmin, this.id], (err, result) => {
                    if (err) console.error(err);
                    resolve();
                })
            } else {
                global.db.query("INSERT INTO users(email,password,firstname,lastname,isAdmin) VALUES (?,?,?,?,?)", [this.email, this.password, this.firstname, this.lastname, this.isAdmin, this.id], (err, result) => {
                    if (err) console.error(err);
                    this.id = result.insertId;
                    global.users[this.id + ""] = this;
                    resolve();
                })
            }

        })
    }

    async delete() {
        return new Promise(resolve => {
            global.db.query("DELETE FROM users WHERE id=?;", [this.id], (err, result) => {
                if (result.affectedRows > 0) {
                    let promises = [];
                    for (let relation of Object.values(this.classRelations)) {
                        delete this.classRelations[relation.id];
                        promises.push(relation.delete());
                    }
                    delete global.users[this.id];
                    delete this;
                    Promise.all(promises).then((value => {
                        resolve();
                    }))
                }
            })
        })
    }

    static getById(id) {
        if (this.users.keys().find(id)) {
            return this.users[id];
        } else {
            const result = db.con.query("SELECT * FROM users WHERE id = ?", [id]);
        }
    }

    static async fromDatabaseObject(obj) {
        return new Promise(mainResolve => {
            let user = new User(parseInt(obj.id), obj.email, obj.password, obj.firstname, obj.lastname, obj.isAdmin);
            global.users[user.id + ''] = user;
            global.db.query("SELECT * FROM classRelation WHERE FK_user = ?;", [user.id], (err, result) => {
                for (let relationObject of result) {
                    let relation = ClassRelation.fromDatabaseObject(relationObject);
                    user.classRelations[relation.id] = relation;
                }
                mainResolve(user);
            });
        })
    }


}