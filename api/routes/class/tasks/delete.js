/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 28.03.21, 20:42
 */
const hasPermission = require('../permissionChecker').hasPermission;

module.exports = async (req, res) => {
    if (req.session.user.isAdmin || hasPermission(req.session.user, req.class, "deleteTasks")) {
        await req.task.delete();
        res.status(204).send();
    } else res.status(403).json({ error: "Forbidden", code: 403 });
}