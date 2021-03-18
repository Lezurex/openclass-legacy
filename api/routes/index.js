const routes = require('express').Router();
const models = require('./models');
const cars = require('./cars');
const auth = require("./auth");
const session = require('express-session');
const user = require("./user");
const express = require("express");

routes.use(session({secret: "AP20b", resave: false, saveUninitialized: false}));
routes.use(express.json());

routes.use(((req, res, next) => {
    let path = req.baseUrl + req.path;
    if (path.startsWith("/api/auth/") || path.startsWith("/api/auth")) {
        next();
    } else {
        if (req.session.user) {
            next();
        } else {
            next();
            res.status(401).send();
        }
    }
}))

routes.use('/models', models);
routes.use('/cars', cars);
routes.use('/auth', auth);
routes.use("/user", user);

routes.get("/", (req, res) => {
    res.status(200).json({message: 'Connected!'});
});

module.exports = routes;