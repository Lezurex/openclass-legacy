/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 22.03.21, 08:30
 */

const Class = require('../../entities/Class');

module.exports = async (req, res) => {
    if (req.session.user.isAdmin) {
        let data = req.body;
        if (data.name) {
            let newClass = new Class(undefined, data.name);
            await newClass.saveToDB();
            res.status(200).json(newClass.toJSON());
        } else {
            res.status(400).json({
                error: "Bad request",
                code: 400,
            })
        }
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        })
    }
}