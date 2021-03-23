/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 22.03.21, 14:18
 */

const hasPermission = require('../permissionChecker').hasPermission;

module.exports = async (req, res) => {
    if (req.session.user.isAdmin || hasPermission(req.session.user, req.class, "manageSubjects")) {
        let data = req.body;
        if (data.name || data.teacher) {
            let subject = req.subject;
            data.name ? subject.name = data.name : null;
            data.teacher ? subject.teacher = data.teacher : null;
            await subject.saveToDB();
            res.status(200).json(subject.toJSON());
        } else {
            res.status(400).json({
                error: "Bad request. Provide name and/or teacher.",
                code: 400
            })
        }
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        })
    }
}