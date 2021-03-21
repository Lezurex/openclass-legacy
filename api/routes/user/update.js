const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    if (req.session.user.isAdmin || req.session.user.id === req.user.id) {
        let data = req.body;
        let user = req.user;
        data.email ? user.email = data.email : null;
        data.firstname ? user.firstname = data.firstname : null;
        data.lastname ? user.lastname = data.lastname : null;
        if (req.session.user.isAdmin) {
            data.isAdmin ? user.isAdmin = data.isAdmin : null;
        }
        if (data.password) {
            let hash = await bcrypt.hash(data.password, 10);
            user.password = hash;
        }
        user.saveToDB();
        res.status(200).json(user.toJSON());
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        })
    }
}