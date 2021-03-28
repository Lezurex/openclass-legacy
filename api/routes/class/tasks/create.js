/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 28.03.21, 15:22
 */

const hasPermission = require('../permissionChecker').hasPermission;
const Task = require('../../../entities/Task');

module.exports = async (req, res) => {
    if (req.session.user.isAdmin || hasPermission(req.session.user, req.class, "addTasks")) {
        let data = req.body;
        if (data.title && data.body && data.dueDate && data.subject) {
            let date = new Date(data.dueDate);
            if (!isNaN(date.getTime())) {
                let subject = Object.values(req.class.subjects).find(subject => subject.id === data.subject);
                if (subject) {
                    let task = new Task(
                        undefined,
                        data.title,
                        data.body,
                        date,
                        data.subject,
                        req.class.id
                    );
                    await task.saveToDB();
                    global.tasks[task.id] = task;
                    req.class.tasks[task.id] = task;
                    res.status(200).json(task.toJSON());
                } else res.status(404).json({ error: "Subject not found!", code: 404 });
            } else res.status(400).json({ error: "Date is invalid!", code: 400 });
        } else res.status(400).json({ error: "Bad request! Title, body, dueDate and subjectId are required!", code: 400 })
    } else res.status(403).json({ error: "Forbidden", code: 403 })
}