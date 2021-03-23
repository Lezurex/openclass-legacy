/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 22.03.21, 14:16
 */

const subjects = require('express').Router({mergeParams: true});
const all = require('./all');
const single = require('./single');
const newSubject = require('./new');
const update = require('./update');
const deleteSubject = require('./delete');

subjects.param("subjectId", ((req, res, next, value) => {
    let subject = req.class.subjects[value];
    if (subject) {
        req.subject = subject;
        next();
    } else {
        res.status(404).json({
            error: "Requested subject was not found!",
            code: 404
        })
    }
}))

subjects.get('/', all);
subjects.post('/', newSubject);
subjects.patch('/:subjectId', update);
subjects.delete('/:subjectId', deleteSubject);
subjects.get('/:subjectId', single);

module.exports = subjects;