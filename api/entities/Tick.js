/**
 * Represents a tick of a user in a task.
 * @class Tick
 */
module.exports = class Tick {

    id;
    task;
    user;

    /**
     * Creates a new tick instance.
     * @param id {number} Unique identifier to quickly access the class inside the database
     * @param task {Task} Task to which this tick is related to
     * @param user {User} The creator of this tick
     */
    constructor(id, task, user) {
        this.id = id;
        this.task = task;
        this.user = user;
    }

    /**
     * Converts an entry from the database into an instance.
     * @param obj {{id:number,FK_task:number,FK_user:number}} Database entry object
     * @returns {Tick} Converted tick instance
     * @async
     */
    static fromDatabaseObject(obj) {
        let tick = new Tick(obj.id, global.tasks[obj.FK_task], global.users[obj.FK_user]);
        global.ticks[tick.id] = tick;
        return tick;
    }

    /**
     * Deletes the tick from the database and the cache and removes it from the task.
     * @async
     * @returns {Promise<>} Resolved when database queries are finished.
     */
    async delete() {
        return new Promise(resolve => {
            global.db.query("DELETE FROM ticks WHERE id=?;", [this.id], (err, result) => {
                if (result.affectedRows > 0) {
                    delete global.ticks[this.id];
                    delete this.task.ticks[this.id];
                    delete this;
                    resolve();
                }
            })
        })
    }

    /**
     * Saves the instance to the database or creates a new entry if the id is undefined.
     * @async
     * @returns {Promise<>} Resolved when database queries are finished.
     */
    async saveToDB() {
        return new Promise(resolve => {
            if (this.id) {
                global.db.query("UPDATE ticks SET FK_task=?,FK_user=? WHERE id=?", [this.task.id, this.user.id, this.id], (err, result) => {
                    if (err) console.error(err);
                    resolve();
                })
            } else {
                global.db.query("INSERT INTO ticks(FK_task, FK_user) VALUES (?,?)", [this.task.id, this.user.id], (err, result) => {
                    if (err) console.error(err);
                    this.id = result.insertId;
                    global.ticks[this.id] = this;
                    resolve();
                })
            }

        })
    }
}