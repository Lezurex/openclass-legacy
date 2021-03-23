/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 23.03.21, 17:19
 */

const roles = require('express').Router({mergeParams: true});
const all = require('./all');
const single = require('./single');
const create = require('./create');
const update = require('./update');
const deleteRole = require('./delete');

roles.param('roleId', ((req, res, next, value) => {
    let role = Object.values(req.class.roles).find(role => role.id === (value * 1));
    if (role) {
        req.role = role;
        next();
    } else {
        res.status(404).json({
            error: "Role not found!",
            code: 404
        });
    }
}))

roles.get('/', all)
roles.get('/:roleId', single);
roles.post('/', create);
roles.patch('/:roleId', update);
roles.delete('/:roleId', deleteRole);

module.exports = roles;