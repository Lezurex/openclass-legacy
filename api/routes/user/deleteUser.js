module.exports = async (req, res) => {
    if (req.session.user.isAdmin) { // req.session.user.isAdmin
        if (req.params.userId in global.users) {
            let user = global.users[req.params.userId];
            await user.delete();
            res.status(200).json({
                success: true
            })
        } else {
            res.status(404).json({
                error: "User with specified id not found",
                code: 404
            });
        }
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        })
    }
}