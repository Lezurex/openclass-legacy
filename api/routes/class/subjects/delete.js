const hasPermission = require('../permissionChecker').hasPermission;

module.exports = async (req, res) => {
    if (req.session.user.isAdmin || hasPermission(req.session.user, req.class, "manageSubjects")) {
        let subject = req.subject;
        await subject.delete();
        res.status(200).json({
            status: "success"
        });
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: "403"
        });
    }
}