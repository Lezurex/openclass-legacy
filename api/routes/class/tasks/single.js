/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 22.03.21, 07:49
 */

module.exports = (req, res) => {
    let task = Object.values(req.class.tasks).find(task => task.id === (req.params.taskId * 1));
    if (task) {
        res.status(200).json(task);
    } else {
        res.status(404).json({
            error: "Task not found in class!",
            code: 404
        })
    }
}