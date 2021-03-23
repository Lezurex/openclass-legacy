/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 22.03.21, 07:49
 */

const auth = require('express').Router();
const status = require('./status');
const login = require('./login');
const logout = require('./logout');

auth.get("/status", status);
auth.post("/login", login)
auth.post("/logout", logout);
auth.get("/", status);

module.exports = auth;