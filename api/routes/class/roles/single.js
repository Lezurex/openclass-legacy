module.exports = (req, res) => {
    let role = Object.values(req.class.roles).find(role => role.id === (req.params.roleId * 1));

    if (role) {
        res.status(200).json(role);
    } else {
        res.status(404).json({
            error: "Role not found!",
            code: 404
        })
    }
}