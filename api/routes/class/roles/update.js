module.exports = async (req, res) => {
    if (req.session.user.isAdmin) {
        let role = req.role;
        let data = req.body;
        if (data.permissions) {
            let permissions = {
                addTasks: !!data.permissions.addTasks,
                editTasks: !!data.permissions.editTasks,
                deleteTasks: !!data.permissions.deleteTasks,
                manageSubjects: !!data.permissions.manageSubjects
            };
            role.permissions = permissions;
        }
        data.name ? role.name = data.name : null;
        await role.saveToDB();
        res.status(200).json(role.toJSON());
    } else {
        res.status(403).json({
            error: "Forbidden",
            code: 403
        })
    }
}