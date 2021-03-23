/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 22.03.21, 07:49
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
                res.status(200).json({
                    status: "success"
                })
            }
        })
    } else {
        res.status(403).json({
            error: "You are already logged out!",
            code: 403
        })
    }
}