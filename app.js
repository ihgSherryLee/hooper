var express = require('express');
var app = express();

var routes = require('./routes');

console.log(routes)

routes.all(app);

app.listen(8083);