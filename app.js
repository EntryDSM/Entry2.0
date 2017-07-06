var express = require('express');
var path = require('path');
var config = require('./config');
var static = require('serve-static');
var session = require('express-session');
var database = require('./mongo/database');
var bodyparser = require('body-parser');
var crypto = require('crypto');

var app = express();

let userRouter = require('./routes/user/router');

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');

app.use('/public', static(path.join(__dirname, '/public')));
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(session({
    key : 'entrykey',
    secret: 'secret',
    resave:false
}));

app.use(bodyparser.json());

app.use('/',userRouter);

app.listen(config.server_port, function () {
    console.log(config.server_port + 'ON');
    database.init(app, config);
});

//router 모듈화 