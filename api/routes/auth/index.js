const auth = require('express').Router();
const status = require('./status');
const register = require("./register");

auth.get("/status", status);
auth.post("/register", register)
auth.get("/", status);

module.exports = auth;