const express = require("express");
const path = require("path");
const Database = require("./database/Database");
const routes = require('./routes');
const app = express(),
    port = 3080;

Database.connect();

app.use(express.static(path.join(__dirname, '../webapp/dist')));

// Bind all api routes to the endpoint
app.use('/api', routes);

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../webapp/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});