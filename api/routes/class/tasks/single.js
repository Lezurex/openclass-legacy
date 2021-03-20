module.exports = (req, res) => {
    let task = Object.values(req.class.tasks).find(task => task.id === (req.params.taskId * 1));
    if (task) {
        res.status(200).json(task);
    } else {
        res.status(404).json({
            error: "Task not found in class!",
            code: 404
        })
    }
}