module.exports = (req, res) => {
    if (req.session.user) {
        req.session.destroy(err => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    error: "Server was unable to destroy session.",
                    code: 500
                });
            } else {
                res.status(200).json({
                    status: "success"
                })
            }
        })
    } else {
        res.status(403).json({
            error: "You are already logged out!",
            code: 403
        })
    }
}