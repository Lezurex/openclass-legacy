/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 10.04.21, 00:37
 */

export class Task {

    id;
    title;
    body;
    dueDate;
    subject;
    classObj;
    ticked;

    constructor(id, title, body, dueDate, subject, classObj, ticked) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.dueDate = dueDate;
        this.subject = subject;
        this.classObj = classObj;
        this.ticked = ticked;
    }

    static fromJSON(obj) {
        let task = new Task(
            obj.id,
            obj.title,
            obj.body,
            new Date(obj.dueDate),
            obj.subject,
            obj.class,
            obj.ticked
        );
        global.API.tasks.tasks.value[task.id] = task;
        return task;
    }
}