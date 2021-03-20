const tasks = require('express').Router({mergeParams: true});
const all = require('./all');
const single = require('./single');

tasks.get('/', all);
tasks.get('/:taskId', single);

module.exports = tasks;