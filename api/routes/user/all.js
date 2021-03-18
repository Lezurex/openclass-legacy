const User = require("../../entities/User");

module.exports = (req, res) => {
    let users = User.users;
    res.status(200).json({
        users
    });
}