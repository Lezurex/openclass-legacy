/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 22.03.21, 07:49
 */

module.exports = (req, res) => {
    let deep = req.query.deep === "1";
    let classes = {};
    for (let [key, classObj] of Object.entries(global.classes)) {
        classes[key] = classObj.toJSON(deep, req.session.user);
    }
    res.status(200).json(classes);
}