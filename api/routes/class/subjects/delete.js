/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 22.03.21, 13:12
 */

const hasPermission = require('../permissionChecker').hasPermission;

module.exports = async (req, res) => {
    if (req.session.user.isAdmin || hasPermission(req.session.user, req.class, "manageSubjects")) {
        let subject = req.subject;
        await subject.delete();
        res.status(200).json({
            status: "success"
        });
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        });
    }
}