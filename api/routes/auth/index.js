const auth = require('express').Router();
const status = require('./status');

auth.all("/", ((req, res, next) => {
    if (req.path.endsWith("auth/") || req.path.endsWith("auth")) {

    }
}));

auth.get("/status", status);
auth.get("/", status);

module.exports = auth;