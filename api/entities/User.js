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

    static getById(id) {
        if (this.users.keys().find(id)) {
            return this.users[id];
        } else {
            const result = db.con.query("SELECT * FROM users WHERE id = ?", [id]);
            console.log(result);
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