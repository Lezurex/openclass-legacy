/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 28.03.21, 20:52
 */
const Tick = require('../../../entities/Tick');

module.exports = async (req, res) => {
    let tick = Object.values(req.task.ticks).find(tick => tick.user.id === req.session.user.id);
    if (tick) res.status(409).json({ error: "Task is already ticked!", code: 409 })
    else {
        tick = new Tick(undefined, req.task, req.session.user);
        await tick.saveToDB();
        global.ticks[tick.id] = tick;
        req.task.ticks[tick.id] = tick;
        res.status(204).send();
    }
}