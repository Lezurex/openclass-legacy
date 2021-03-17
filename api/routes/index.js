const routes = require('express').Router();
const models = require('./models');
const cars = require('./cars');
const auth = require("./auth");
const session = require('express-session');

routes.use(session({secret: "AP20b"}));

routes.use(((req, res, next) => {
    let path = req.baseUrl + req.path;
    if (path.startsWith("/api/auth/status") || path.startsWith("")) {
        next();
    }
    console.log(path);
    res.status(401).send();
}))

routes.use('/models', models);
routes.use('/cars', cars);
routes.use('/auth', auth);

routes.get("/", (req, res) => {
    res.status(200).json({message: 'Connected!'});
});

module.exports = routes;