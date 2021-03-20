module.exports = class Tick {

    id;
    task;
    user;


    constructor(id, task, user) {
        this.id = id;
        this.task = task;
        this.user = user;
    }

    static fromDatabaseObject(obj) {
        let tick = new Tick(obj.id, global.tasks[obj.FK_task], global.users[obj.FK_user]);
        global.ticks[tick.id] = tick;
    }

    async delete() {
        return new Promise(resolve => {
            global.db.query("DELETE FROM ticks WHERE id=?;", [this.id], (err, result) => {
                if (result.affectedRows > 0) {
                    delete global.ticks[this.id];
                    delete this;
                    resolve();
                }
            })
        })
    }

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