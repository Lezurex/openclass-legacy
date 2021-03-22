const hasPermission = require('../permissionChecker').hasPermission;

module.exports = (req, res) => {
    if (req.session.user.isAdmin || hasPermission(req.session.user, req.class, "manageSubjects")) {
        let data = req.body;
        if (data.name || data.teacher) {
            let subject = req.subject;
            data.name ? subject.name = data.name : null;
            data.teacher ? subject.teacher = data.teacher : null;
            subject.saveToDB();
        } else {
            res.status(400).json({
                error: "Bad request. Provide name and/or teacher.",
                code: 400
            })
        }
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        })
    }
}