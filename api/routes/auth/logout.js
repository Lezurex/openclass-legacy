/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 28.03.21, 13:40
 */

module.exports = (req, res) => {
    if (req.session.user) {
        req.session.destroy(err => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    error: "Server was unable to destroy session.",
                    code: 500
                });
            } else {
                res.status(204).send();
            }
        })
    } else {
        res.status(403).json({
            error: "You are already logged out!",
            code: 403
        })
    }
}