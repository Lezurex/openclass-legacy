/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 28.03.21, 00:01
 */

module.exports = (req, res) => {
    if (req.session.user.isAdmin) {
        let data = req.body;
        if (Object.keys(data).includes('role')) {
            if (data.role) {
                if (Object.keys(req.relation.class.roles).includes(data.role + '')) {
                    req.relation.role = req.relation.class.roles[data.role];
                    req.relation.saveToDB();
                    res.status(200).json(req.relation.toJSON());
                } else {
                    res.status(404).json({
                        error: "Role does not exist in relation's class!",
                        code: 404
                    })
                }
            } else {
                req.relation.role = null;
                req.relation.saveToDB();
                res.status(200).json(req.relation.toJSON());
            }
        } else {
            res.status(400).json({
                error: "Bad request! Provide role id to be set",
                code: 400
            });
        }
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: 403
        });
    }
}