/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 21:28
 */

import {Subject} from "@/entities/Subject";
import {Role} from "@/entities/Role";
import {Task} from "@/entities/Task";

export class Class {

    id;
    name;
    subjects = {};
    roles = {};
    tasks = {};

    /**
     * @param {number} id
     * @param {string} name
     * @param {{Number:Subject}} subjects
     * @param {{Number:Role}} roles
     * @param {{Number:Task}} tasks
     */
    constructor(id, name, subjects, roles, tasks) {
        this.id = id;
        this.name = name;
        this.subjects = subjects;
        this.roles = roles;
        this.tasks = tasks;
    }

    static fromJSONDeep(obj) {
        const instance = new Class(obj.id, obj.name);
        const subjects = {};
        Object.values(obj.subjects).forEach(sObj => {
            const subject = new Subject(sObj.id, sObj.name, sObj.teacher, instance);
            subjects[subject.id] = subject;
        });
        instance.subjects = subjects;
        const roles = {};
        Object.values(obj.roles).forEach(rObj => {
            const role = new Role(rObj.id, rObj.name, instance, rObj.permissions);
            roles[role.id] = role;
        });
        instance.roles = roles;
        const tasks = {};
        Object.values(obj.tasks).forEach(tObj => {
            const task = new Task(tObj.id, tObj.title, tObj.body, new Date(tObj.dueDate), subjects[tObj.subject], instance, tObj.ticked);
            tasks[task.id] = task;
        });
        instance.tasks = tasks;
        return instance;
    }
}