/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 4/13/21, 8:18 AM
 */

export class User {

    id;
    email;
    firstname;
    lastname;
    isAdmin;
    settings;
    classRelations;

    constructor(id, email, firstname, lastname, isAdmin, settings, classRelations) {
        this.id = id;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.isAdmin = isAdmin;
        this.settings = settings;
        this.classRelations = classRelations;
    }

    static fromJSON(obj) {
        let user = new User(obj.id, obj.email, obj.firstname, obj.lastname, obj.isAdmin, obj.settings, obj.classRelations);
        return user;
    }
}