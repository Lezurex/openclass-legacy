const Class = require('../../entities/Class');

module.exports = async (req, res) => {
    if (req.session.user.isAdmin) {
        let data = req.body;
        if (data.name) {
            let newClass = new Class(undefined, data.name);
            await newClass.saveToDB();
            res.status(200).json(newClass.toJSON());
        } else {
            res.status(400).json({
                error: "Bad request",
                code: 400,
            })
        }
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        })
    }
}