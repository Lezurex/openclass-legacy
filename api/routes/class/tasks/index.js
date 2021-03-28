/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 28.03.21, 20:52
 */

const tasks = require('express').Router({mergeParams: true});
const all = require('./all');
const single = require('./single');
const create = require('./create');
const update = require('./update');
const deleteTask = require('./delete');
const addTick = require('./addTick');
const deleteTick = require('./deleteTick');

tasks.param('taskId', ((req, res, next, value) => {
    const task = Object.values(req.class.tasks).find(task => task.id + '' === value);
    if (task) {
        req.task = task;
        next();
    } else
        res.status(404).json({ error: "Requested task not found in class!", code: 404 })
}))

tasks.get('/', all);
tasks.get('/:taskId', single);
tasks.patch('/:taskId', update);
tasks.delete('/:taskId', deleteTask);
tasks.post('/:taskId/tick', addTick);
tasks.delete('/:taskId/tick', deleteTick);
tasks.post('/', create);

module.exports = tasks;