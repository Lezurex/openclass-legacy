/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 22.03.21, 07:49
 */

module.exports = async (req, res) => {
    if (req.session.user.isAdmin) {
        await req.class.delete();
        res.status(200).json({
            success: true
        });
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        });
    }
}