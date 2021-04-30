/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 22:02
 */

import {Class} from "@/entities/Class";

export class Subject {

    id : number;
    name : string;
    teacher : string | null | undefined;
    classObj : Class;

    constructor(id: number, name: string, teacher: string | null | undefined, classObj: Class) {
        this.id = id;
        this.name = name;
        this.teacher = teacher;
        this.classObj = classObj;
    }
}