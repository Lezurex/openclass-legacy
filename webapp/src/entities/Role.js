/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 12.04.21, 10:35
 */

export class Role {

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
        this.classObj = classObj;
        this.permissions = permissions;
    }
}