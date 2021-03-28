/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 27.03.21, 22:34
 */

module.exports = (req, res) => {
    res.status(200).json(req.relation.toJSON());
}
