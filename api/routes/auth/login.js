const Bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    if (req.session.user === undefined) {
        let data = req.body;
        if (data.email && data.password) {
            let user = Object.values(global.users).find(user => user.email === data.email)
            if (user) {
                let result = await Bcrypt.compare(data.password, user.password)
                if (result) {
                    req.session.user = user;
                    res.status(200).json({
                        status: "success"
                    });
                    return;
                }
            }
            res.status(403).json({
                error: "Wrong credentials!",
                code: 1012
            });
        } else {
            res.status(400).json({
                error: "Bad request",
                code: 400
            });
        }
    } else {
        res.status(400).json({
            error: "You are already logged in! Use /api/auth/logout to invalidate your session!",
            code: 1011
        });
    }
}