/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 28.03.21, 21:13
 */

module.exports = (req, res) => {
    let tasks = {};
    for (let relation of Object.values(req.session.user.classRelations)) {
        for (let task of Object.values(global.classes[relation.class].tasks)) {
            let json = task.toJSON(req.session.user);
            json.subject = global.subjects[task.subjectId].toJSON();
            tasks[task.id] = json;
        }
    }
    res.status(200).json(tasks);
}