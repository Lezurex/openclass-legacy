/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 3/25/21, 3:57 PM
 */

let relations = require('express').Router();
let all = require('./all');

relations.get('/', all)

module.exports = relations;