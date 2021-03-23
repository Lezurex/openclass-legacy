/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 22.03.21, 13:12
 */

function hasPermission(user, classObj, permissionName) {
    let relation = Object.values(user.classRelations).find(relation => relation.class.id === classObj.id && relation.role.permissions[permissionName]);
    return !!relation;
}

function isInClass(user, classObj) {
    let relation = Object.values(user.classRelations).find(relation => relation.class.id === classObj.id);
    return !!relation;
}

module.exports = {hasPermission: hasPermission, isInClass: isInClass}