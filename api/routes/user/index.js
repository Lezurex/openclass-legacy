const user = require("express").Router();
const all = require("./all");

user.get("/", all);

module.exports = user;