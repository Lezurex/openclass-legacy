module.exports = async (req, res) => {
    if (req.session.user.isAdmin) {
        await req.role.delete();
        res.status(200).json({
            status: "success"
        })
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: 403
        })
    }
}