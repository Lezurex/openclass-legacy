const classRouter = require('express').Router();
const all = require('./all');
const single = require('./single');
const subjects = require('./subjects');
const roles = require('./roles');
const tasks = require('./tasks');

classRouter.param('classId', ((req, res, next, value) => {
    const classObj = Object.values(global.classes).find(candidate => candidate.id === (value * 1));

    if (classObj) {
        req['class'] = classObj;
        next();
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

module.exports = classRouter;