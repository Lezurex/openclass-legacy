module.exports = (req, res) => {
    if (req.session.user.isAdmin || req.session.user.id === req.user.id) {

    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        })
    }
}