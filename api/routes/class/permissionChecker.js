/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 28.03.21, 14:45
 */

/**
 * Checks if a user has the specified permission in the specified group.
 * @param user {User} The user to be checked for
 * @param classObj {Class} The class where the user has to have the permission
 * @param permissionName {String} The permissions name (see {@link Role.permissions})
 * @returns {boolean} Whether or not the user has the permission.
 */
function hasPermission(user, classObj, permissionName) {
    let relation = Object.values(user.classRelations).find(relation => relation.class.id === classObj.id && relation.role.permissions[permissionName]);
    return !!relation;
}

/**
 * Checks if a user is in the specified class.
 * @param user {User} The user to be checked for
 * @param classObj {Class} The class where the user has to be in
 * @returns {boolean} Whether or not the user is in the class.
 */
function isInClass(user, classObj) {
    let relation = Object.values(user.classRelations).find(relation => relation.class.id === classObj.id);
    return !!relation;
}

/**
 * @type {{hasPermission: (function(User, Class, String): boolean), isInClass: (function(User, Class): boolean)}}
 */
module.exports = {hasPermission: hasPermission, isInClass: isInClass}