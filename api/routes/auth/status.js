module.exports = (req, res) => {
    let loggedIn = req.session.user !== undefined;
    res.json({loggedIn: loggedIn});
}