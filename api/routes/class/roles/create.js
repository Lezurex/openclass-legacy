const Role = require('../../../entities/Role');

module.exports = async (req, res) => {
    if (req.session.user.isAdmin) {
        let data = req.body;
        if (data.name) {
            let permissions = {
                addTasks: !!data.permissions.addTasks,
                editTasks: !!data.permissions.editTasks,
                deleteTasks: !!data.permissions.deleteTasks,
                manageSubjects: !!data.permissions.manageSubjects
            };
            let role = new Role(undefined, data.name, req.class, permissions);
            await role.saveToDB();
            req.class.roles[role.id] = role;
            res.status(200).json(role.toJSON());
        } else {
            req.status(400).json({
                error: "Bad request. Provide a name!",
                code: 400
            })
        }
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: 403
        })
    }
}