const user = require("express").Router();
const all = require("./all");
const newUser = require("./newUser")

user.get("/", all);
user.post("/", newUser)

module.exports = user;