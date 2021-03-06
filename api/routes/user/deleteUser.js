/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 28.03.21, 13:40
 */

module.exports = async (req, res) => {
    if (req.session.user.isAdmin) {
        if (req.session.user.id === req.user.id)
            req.session.destroy();
        await req.user.delete();
        res.status(204).send();
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        })
    }
}