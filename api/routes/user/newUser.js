const User = require("../../entities/User");
const Bcrypt = require('bcrypt');
const [checkEmail, checkPassword] = require('./inputValidation');

module.exports = (req, res) => {
    if (req.session.user.isAdmin) {
        let data = req.body;
        if (data.email && data.password) {
            switch (checkEmail(data.email)) {
                case 200:
                    if (checkPassword(data.password)) {
                        Bcrypt.hash(data.password, 10, async (err, hash) => {
                            if (err) throw err;
                            if (!data.isAdmin) data.isAdmin = 0;
                            let user = new User(undefined, data.email, hash, data.firstname, data.lastname, data.isAdmin);
                            await user.saveToDB();
                            res.status(200).json(user.toJSON());
                        });
                    } else {
                        res.status(400).json({
                            error: "Password does not meet requirements!",
                            code: 1003
                        });
                    }
                    break;
                case 1001:
                    res.status(400).json({
                        error: "Invalid email!",
                        code: 1002
                    });
                    break;
                case 1002:
                    res.status(400).json({
                        error: "Email already registered!",
                        code: 1001
                    });
                    break;
            }
        } else {
            res.status(400).json({
                error: "Bad request",
                code: 400
            });
        }
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        })
    }
}