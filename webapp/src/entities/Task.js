/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 10.04.21, 00:37
 */

export default class Task {

    id;
    title;
    body;
    dueDate;
    subjectId;
    classId;
    ticked;

    constructor(id, title, body, dueDate, subjectId, classId, ticked) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.dueDate = dueDate;
        this.subjectId = subjectId;
        this.classId = classId;
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