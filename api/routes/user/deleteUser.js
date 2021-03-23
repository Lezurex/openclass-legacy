/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 22.03.21, 07:49
 */

module.exports = async (req, res) => {
    if (req.session.user.isAdmin) {
        if (req.session.user.id === req.user.id)
            req.session.destroy();
        await req.user.delete();
        res.status(200).json({
            success: true
        })
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        })
    }
}