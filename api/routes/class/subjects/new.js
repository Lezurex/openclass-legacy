const Subject = require('../../../entities/Subject');
const hasPermission = require('../permissionChecker');

module.exports = async (req, res) => {
    if (req.session.user.isAdmin || hasPermission(req.session.user, req.class, 'manageSubjects')) {
        let data = req.body;
        if (data.name && data.teacher) {
            let subject = new Subject(undefined, data.name, data.teacher, req.class);
            await subject.saveToDB();
            req.class.subjects[subject.id] = subject;
            res.status(200).json(subject.toJSON());
        } else {
            res.status(400).json({
                error: "Bad request. Provide name and teacher.",
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