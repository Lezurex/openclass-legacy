module.exports = (req, res) => {
    const subject = Object.values(req.class.subjects).find(subject => subject.id === (req.params.subjectId * 1));
    if (subject) {
        res.status(200).json(subject);
    } else {
        res.status(404).json({
            error: "Subject not found on class.",
            code: 404
        })
    }
}