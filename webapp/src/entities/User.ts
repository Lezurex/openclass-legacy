/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 22:04
 */

export class User {

    id : number;
    email : string;
    firstname : string | null;
    lastname : string | null;
    isAdmin : boolean;
    settings : any;
    classRelations : any;

    constructor(id: number, email: string, firstname: string | null, lastname: string | null, isAdmin: boolean, settings: any, classRelations: any) {
        this.id = id;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.isAdmin = isAdmin;
        this.settings = settings;
        this.classRelations = classRelations;
    }

    static fromJSON(obj: { id: number; email: string; firstname: string | null; lastname: string | null; isAdmin: boolean; settings: any; classRelations: any; }) {
        const user = new User(obj.id, obj.email, obj.firstname, obj.lastname, obj.isAdmin, obj.settings, obj.classRelations);
        return user;
    }
}