module.exports = (req, res) => {
    let classes = {};
    for (let [key, classObj] of Object.entries(global.classes)) {
        classes[key] = classObj.toJSON();
    }
    res.status(200).json(classes);
}