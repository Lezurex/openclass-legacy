/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 22.03.21, 15:24
 */

const classRouter = require('express').Router();
const all = require('./all');
const single = require('./single');
const subjects = require('./subjects');
const roles = require('./roles');
const tasks = require('./tasks');
const newClass = require('./new');
const deleteClass = require('./delete');
const update = require('./update');

const isInClass = require('./permissionChecker').isInClass;

classRouter.param('classId', ((req, res, next, value) => {
    const classObj = Object.values(global.classes).find(candidate => candidate.id === (value * 1));

    if (classObj) {
        if (req.session.user.isAdmin || isInClass(req.session.user, classObj)) {
            req.class = classObj;
            next();
        } else {
            res.status(403).json({
                error: "Forbidden. You are not a member of this class.",
                code: 403
            });
        }
    } else {
        res.status(404).json({
            error: "Requested class was not found!",
            code: 404
        });
    }
}))
classRouter.use('/:classId/subjects', subjects);
classRouter.use('/:classId/roles', roles);
classRouter.use('/:classId/tasks', tasks);

classRouter.get('/', all);
classRouter.get("/:classId", single);
classRouter.delete("/:classId", deleteClass);
classRouter.patch('/:classId', update);
classRouter.post("/", newClass);

module.exports = classRouter;