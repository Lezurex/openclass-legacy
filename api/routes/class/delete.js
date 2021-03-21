module.exports = async (req, res) => {
    if (req.session.user.isAdmin) {
        await req.class.delete();
        res.status(200).json({
            success: true
        });
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        });
    }
}