module.exports = async (req, res) => {
    if (req.session.user.isAdmin) {
        if (req.session.user.id === req.user.id)
            req.session.destroy();
        await req.user.delete();
        res.status(200).json({
            success: true
        })
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        })
    }
}