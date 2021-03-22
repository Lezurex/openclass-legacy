function hasPermission(user, classObj, permissionName) {
    let relation = Object.values(user.classRelations).find(relation => relation.class.id === classObj.id && relation.role.permissions[permissionName]);
    return !!relation;
}

function isInClass(user, classObj) {
    let relation = Object.values(user.classRelations).find(relation => relation.class.id === classObj.id);
    return !!relation;
}

module.exports = {hasPermission: hasPermission, isInClass: isInClass}