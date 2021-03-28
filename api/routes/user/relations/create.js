/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 28.03.21, 13:17
 */
const ClassRelation = require('../../../entities/ClassRelation');

module.exports = async (req, res) => {
    if (req.session.user.isAdmin) {
        let data = req.body;
        if (data.class) {
            if (Object.keys(global.classes).includes(data.class + '')) {
                if (!Object.values(req.user.classRelations).find(relation => relation.class.id === data.class)) {
                    let relation;
                    if (data.role) {
                        if (Object.keys(global.classes[data.class].roles).includes(data.role + '')) {
                            relation = new ClassRelation(undefined, global.classes[data.class], req.user, global.roles[data.role]);
                        } else {
                            res.status(404).json({
                                error: "Role does not exist in relation's class!",
                                code: 404
                            });
                            return;
                        }
                    } else {
                        relation = new ClassRelation(undefined, global.classes[data.class], req.user, null);
                    }
                    await relation.saveToDB();
                    req.user.classRelations[relation.id] = relation;
                    global.classRelations[relation.id] = relation;
                    res.status(200).json(relation.toJSON());
                } else res.status(409).json({ error: "User already has a relation to this class.", code: 409 })
            } else res.status(404).json({ error: "Class with specified ID not found!", code: 404 })
        } else res.status(400).json({ error: "Class ID not specified!", code: 400 })
    } else res.status(403).json({ error: "Forbidden", code: 403} )
}