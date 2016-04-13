var express = require('express');
var app = express();
// body-parser能够获取到req.body
var bodyParser = require('body-parser');
app.use(bodyParser.json());  

var routes = require('./routes')(app);

app.listen(8083);