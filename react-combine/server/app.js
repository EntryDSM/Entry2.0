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

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(bodyparser.urlencoded({
    extended: false
}));


//세션 설정필요
app.use(session({
    key: 'entrykey',
    secret: 'secret',
    resave: false
}));

app.get('*', (req, res, next) => {
    console.log(req.path);
    if ((/unemail\/.{1,}/.test(req.path)) || (/^(\/api\/)/.test(req.path))) next()
    else res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.use(bodyparser.json());

// app.use(require('express-method-override')('method_override_param_name'));
app.use(fileUpload());

app.use('/images', static(path.join(__dirname, '/images')));

app.use('/', userRouter);
app.use('/api', applydataRouter);
app.use('/api', QnARouter);
app.use('/api', schoolRouter);


app.listen(config.server_port, function () {
    console.log(config.server_port + ' ON');
    database.init(app, config);
});