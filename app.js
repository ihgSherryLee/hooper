var express = require('express');
var app = express();

var routes = require('./routes')(app);

app.listen(8083);