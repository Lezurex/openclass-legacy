const roles = require('express').Router({mergeParams: true});
const all = require('./all');
const single = require('./single');

roles.get('/', all)
roles.get('/:roleId', single);

module.exports = roles;