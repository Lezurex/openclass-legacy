const User = require("../../entities/User");
const Bcrypt = require('bcrypt');

const emailRegex = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])";
// Minimum 8 characters, uppercase, lowercase, number, special char
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm;

module.exports = (req, res) => {
    if (true) { // req.session.user.isAdmin
        let data = req.body;
        if (data.email && data.password) {
            if (!Object.values(global.users).find(user => user.email.toLowerCase() === data.email.toLowerCase())) {
                if (data.email.match(emailRegex)) {
                    if (data.password.match(passwordRegex)) {
                        let hash = Bcrypt.hash(data.password, 10, async (err, hash) => {
                            if (err) throw err;
                            if (!data.isAdmin) data.isAdmin = 0;
                            let user = new User(undefined, data.email, hash, data.firstname, data.lastname, data.isAdmin);
                            await user.saveToDB();
                            res.status(200).json(user.toJSON());
                        })
                    } else {
                        res.status(400).json({
                            error: "Password does not meet requirements!",
                            code: 1003
                        });
                    }
                } else {
                    res.status(400).json({
                        error: "Invalid email!",
                        code: 1002
                    });
                }
            } else {
                res.status(400).json({
                    error: "Email already registered!",
                    code: 1001
                });
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