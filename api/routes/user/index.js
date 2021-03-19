const user = require("express").Router();
const all = require("./all");
const single = require('./single');
const newUser = require("./newUser");
const deleteUser = require('./deleteUser');

user.get("/", all);
user.get("/:userId", single)
user.delete("/:userId", deleteUser)
user.post("/", newUser)

module.exports = user;