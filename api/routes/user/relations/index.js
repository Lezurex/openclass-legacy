/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 27.03.21, 23:51
 */

const relations = require('express').Router();
const all = require('./all');
const single = require('./single');
const update = require('./update');

relations.param("relationId", ((req, res, next, value) => {
    if (req.user.classRelations[value]) {
        req.relation = req.user.classRelations[value];
        next();
    } else {
        res.status(404).json({
            error: "Requested relation not found!",
            code: 404
        })
    }
}))

relations.get('/', all)
relations.get('/:relationId', single);
relations.patch('/:relationId', update);

module.exports = relations;