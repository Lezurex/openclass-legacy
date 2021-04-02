/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 02.04.21, 10:37
 */

export default class Task {

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

    static async fromJSON(obj) {
        return new Promise(resolve => {
            if (obj.subject.id in Object.keys(global.subjects)) {

            } else {

            }
        })
    }
}