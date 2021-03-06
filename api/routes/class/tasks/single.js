/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 28.03.21, 20:56
 */

module.exports = (req, res) => {
    let task = req.task.toJSON(req.session.user);
    // Adding subject details
    task.subject = global.subjects[task.subjectId].toJSON();
    res.status(200).json(task);
}