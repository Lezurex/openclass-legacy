/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 3/25/21, 4:22 PM
 */

module.exports = (req, res) => {
    if (req.session.user.isAdmin || req.session.user.id === req.user.id) {
        let relations = {};
        for (let relation of Object.values(req.user.classRelations)) {
            let obj = relation.toJSON();
            relations[obj.id] = obj;
        }
        res.status(200).json(relations);
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: 403
        })
    }
}