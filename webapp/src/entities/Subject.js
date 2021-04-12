/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 12.04.21, 10:15
 */

export class Subject {

    id;
    name;
    teacher;
    classObj;

    constructor(id, name, teacher, classObj) {
        this.id = id;
        this.name = name;
        this.teacher = teacher;
        this.classObj = classObj;
    }
}