/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 22:02
 */

import {Subject} from "@/entities/Subject";
import {Class} from "@/entities/Class";

export class Task {

    id : number;
    title : string;
    body : string;
    dueDate : Date;
    subject : Subject;
    classObj : Class;
    ticked : boolean;

    constructor(id : number, title: string, body: string, dueDate: Date, subject: Subject, classObj: Class, ticked: boolean) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.dueDate = dueDate;
        this.subject = subject;
        this.classObj = classObj;
        this.ticked = ticked;
    }

    static fromJSON(obj: any) {
        const task = new Task(
            obj.id,
            obj.title,
            obj.body,
            new Date(obj.dueDate),
            obj.subject,
            obj.class,
            obj.ticked
        );
        window.API.tasks.tasks.value[task.id] = task;
        return task;
    }
}