const auth = require('express').Router();
const status = require('./status');
const login = require('./login');
const logout = require('./logout');

auth.get("/status", status);
auth.post("/login", login)
auth.post("/logout", logout);
auth.get("/", status);

module.exports = auth;