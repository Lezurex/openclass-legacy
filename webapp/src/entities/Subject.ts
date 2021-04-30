/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 21:27
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