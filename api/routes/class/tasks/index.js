/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 22.03.21, 07:49
 */

const tasks = require('express').Router({mergeParams: true});
const all = require('./all');
const single = require('./single');

tasks.get('/', all);
tasks.get('/:taskId', single);

module.exports = tasks;