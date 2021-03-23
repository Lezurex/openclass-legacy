/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 23.03.21, 17:19
 */

module.exports = async (req, res) => {
    if (req.session.user.isAdmin) {
        await req.role.delete();
        res.status(200).json({
            status: "success"
        })
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: 403
        })
    }
}