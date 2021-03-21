module.exports = async (req, res) => {
    if (req.session.user.isAdmin) {
        let data = req.body;
        let classObj = req.class;
        data.name ? classObj.name = data.name : null;
        await classObj.saveToDB();
        res.status(200).json(classObj.toJSON());
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        });
    }
}