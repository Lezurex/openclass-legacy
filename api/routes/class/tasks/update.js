/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 28.03.21, 17:45
 */

const hasPermission = require('../permissionChecker').hasPermission;
const Task = require('../../../entities/Task');

module.exports = async (req, res) => {
    if (req.session.user.isAdmin || hasPermission(req.session.user, req.class, "editTasks")) {
        let task = req.task;
        let data = req.body;
        if (data.title || data.body || data.dueDate || data.subject) {
            let date = undefined;
            if (data.dueDate) {
                let date = new Date(data.dueDate);
                if (isNaN(date.getTime())) {
                    res.status(400).json({error: "Date is invalid!", code: 400});
                    return;
                }
            }
            let subject = undefined;
            if (data.subject) {
                subject = Object.values(req.class.subjects).find(subject => subject.id === data.subject);
                if (!subject) {
                    res.status(404).json({error: "Subject not found!", code: 404});
                    return;
                }
            }
            data.title ? task.title = data.title : null;
            data.body ? task.body = data.body : null;
            date ? task.dueDate = date : null;
            subject ? task.subjectId = subject.id : null;

            await task.saveToDB();
            res.status(200).json(task.toJSON());
        } else res.status(400).json({error: "Bad request! Title, body, dueDate or subjectId are required!", code: 400})
    } else res.status(403).json({error: "Forbidden", code: 403})
}