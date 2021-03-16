const models = require('express').Router();
const all = require('./all');
const single = require('./single');
const cars = require('./cars');
const data = require('../../data.json');

// Gets called whenever modelId is present as a parameter in the URI
models.param("modelId", (req, res, next, value) => {
    const model = data.models.find(m => m.id === (value * 1));

    if (model) {
        req['model'] = model;
        next();
    } else {
        res.status(404).send('Invalid model ID');
    }
})

models.use('/:modelId/cars', cars);

models.get('/', all);
models.get('/:modelId', single)

module.exports = models;