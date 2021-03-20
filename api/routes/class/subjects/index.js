const subjects = require('express').Router({mergeParams: true});
const all = require('./all');
const single = require('./single');

subjects.get('/', all);
subjects.get('/:subjectId', single)

module.exports = subjects;