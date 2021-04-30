/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 22:02
 */

import {Class} from "@/entities/Class";

export class Role {

    id : number;
    name : string;
    classObj : Class;
    permissions : {addTasks : boolean, editTasks : boolean, deleteTasks : boolean, manageSubjects : boolean} = {
        addTasks: false,
        editTasks: false,
        deleteTasks: false,
        manageSubjects: false
    }

    constructor(id: number, name: string, classObj: Class, permissions: { addTasks: boolean; editTasks: boolean; deleteTasks: boolean; manageSubjects: boolean; }) {
        this.id = id;
        this.name = name;
        this.classObj = classObj;
        this.permissions = permissions;
    }
}