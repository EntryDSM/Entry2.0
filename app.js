var express = require('express');
var path = require('path');
var config = require('./config');
var static = require('serve-static');
var session = require('express-session');
var database = require('./database/database');
var bodyparser = require('body-parser');
var crypto = require('crypto');
var fileUpload = require('express-fileupload');
var app = express();

let userRouter = require('./routes/user/router');
let applydataRouter = require('./routes/applydata/router');
let QnARouter = require('./routes/QnA/router');
let schoolRouter = require('./routes/school/router');

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');

app.use('/public', static(path.join(__dirname, '/public')));
app.use(bodyparser.urlencoded({
    extended: false
}));

//세션 설정필요
app.use(session({
    key: 'entrykey',
    secret: 'secret',
    resave: false
}));

app.use(bodyparser.json());

// app.use(require('express-method-override')('method_override_param_name'));
app.use(fileUpload());

app.use('/images', static(path.join(__dirname, '/images')));

app.use('/', userRouter);
app.use('/', applydataRouter);
app.use('/', QnARouter);
app.use('/', schoolRouter);

app.listen(config.server_port, function () {
    console.log(config.server_port + ' ON');
    database.init(app, config);
});