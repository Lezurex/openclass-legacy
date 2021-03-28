/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 28.03.21, 20:52
 */

module.exports = async (req, res) => {
    let tick = Object.values(req.task.ticks).find(tick => tick.user.id === req.session.user.id);
    if (tick) {
        await tick.delete();
        res.status(204).send();
    }
    else res.status(409).json({ error: "Task is not ticked yet!", code: 409 })
}