const express = require('express');
const http = require('http');
const path = require('path');

const publicPath = path.join(__dirname,"../public");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
const server = http.createServer(app);
server.listen(port,() => {
    console.log(`Started on port ${port}`);
});



module.exports.server = server;
module.exports.app = app;