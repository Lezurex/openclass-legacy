module.exports = (req, res) => {
    if (req.params.userId in  global.users) {
        let user = global.users[req.params.userId];
        res.status(200).json(user.toJSON());
    } else {
        res.status(404).json({
            error: "User with specified id not found",
            code: 404
        });
    }
}