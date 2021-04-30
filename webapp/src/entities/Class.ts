/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 22:02
 */

import {Subject} from "@/entities/Subject";
import {Role} from "@/entities/Role";
import {Task} from "@/entities/Task";
import {Obj} from "@popperjs/core";

export class Class {

    id : number;
    name : string;
    subjects : {} | undefined = {};
    roles : {} | undefined = {};
    tasks : {} | undefined = {};

    /**
     * @param {number} id
     * @param {string} name
     * @param {{Number:Subject}} subjects
     * @param {{Number:Role}} roles
     * @param {{Number:Task}} tasks
     */
    constructor(id: number, name: string, subjects: {} | undefined, roles: {} | undefined, tasks: {} | undefined) {
        this.id = id;
        this.name = name;
        this.subjects = subjects;
        this.roles = roles;
        this.tasks = tasks;
    }

    static fromJSONDeep(obj: any) {
        const instance = new Class(obj.id, obj.name, undefined, undefined, undefined);
        const subjects : any = {};
        Object.values(obj.subjects).forEach((sObj : any) => {
            const subject = new Subject(sObj.id, sObj.name, sObj.teacher, instance);
            subjects[subject.id] = subject;
        });
        instance.subjects = subjects;
        const roles : any = {};
        Object.values(obj.roles).forEach((rObj : any) => {
            const role = new Role(rObj.id, rObj.name, instance, rObj.permissions);
            roles[role.id] = role;
        });
        instance.roles = roles;
        const tasks : any = {};
        Object.values(obj.tasks).forEach((tObj : any) => {
            const task = new Task(tObj.id, tObj.title, tObj.body, new Date(tObj.dueDate), subjects[tObj.subject], instance, tObj.ticked);
            tasks[task.id] = task;
        });
        instance.tasks = tasks;
        return instance;
    }
}