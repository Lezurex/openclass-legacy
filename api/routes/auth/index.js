const auth = require('express').Router();
const status = require('./status');

auth.get("/status", status);
auth.get("/", status);

module.exports = auth;