/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 22.03.21, 07:49
 */

const bcrypt = require('bcrypt');
const [checkEmail, checkPassword] = require('./inputValidation');

module.exports = async (req, res) => {
    if (req.session.user.isAdmin || req.session.user.id === req.user.id) {
        let data = req.body;
        let user = req.user;
        if (data.email) {
            switch (checkEmail(data.email)) {
                case 200:
                    break;
                case 1001:
                    res.status(400).json({
                        error: "Invalid email!",
                        code: 1002
                    });
                    return;
                case 1002:
                    res.status(400).json({
                        error: "Email already registered!",
                        code: 1001
                    });
                    return;
            }
        }
        if (data.password) {
            if (!checkPassword(data.password)) {
                res.status(400).json({
                    error: "Password does not meet requirements!",
                    code: 1003
                });
                return;
            }
        }
        data.email ? user.email = data.email : null;
        data.firstname ? user.firstname = data.firstname : null;
        data.lastname ? user.lastname = data.lastname : null;
        if (req.session.user.isAdmin) {
            data.isAdmin ? user.isAdmin = data.isAdmin : null;
        }
        if (data.password) {
            let hash = await bcrypt.hash(data.password, 10);
            user.password = hash;
        }
        user.saveToDB();
        res.status(200).json(user.toJSON());
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        })
    }
}