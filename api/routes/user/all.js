module.exports = (req, res) => {
    let users = {};
    for (let [key, user] of Object.entries(global.users)) {
        users[key] = user.toJSON();
    }
    res.status(200).json(users);
}