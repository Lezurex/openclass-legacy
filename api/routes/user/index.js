const user = require("express").Router();
const all = require("./all");
const single = require('./single');
const newUser = require("./newUser");
const deleteUser = require('./deleteUser');
const update = require('./update');

user.param("userId", (req, res, next, value) => {
    let user = global.users[value];
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(404).json({
            error: "User with specified id not found",
            code: 404
        });
    }
})

user.get("/", all);
user.get("/:userId", single)
user.delete("/:userId", deleteUser)
user.patch("/:userId", update);
user.post("/", newUser)

module.exports = user;