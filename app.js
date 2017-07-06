var express = require('express');
var path = require('path');
var config = require('./config');
var static = require('serve-static');
var session = require('express-session');
var database = require('./mongo/database');
var bodyparser = require('body-parser');
var usertest = require('./routes/user');
var crypto = require('crypto');

var app = express();

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

app.listen(config.server_port, function () {
    console.log(config.server_port + 'ON');
    database.init(app, config);
});

app.post('/signin',usertest.login);
app.post('/signup',usertest.adduser);
app.get('/check/:email',usertest.sendemail);
app.get('/unemail/:email', usertest.unemail);
app.get('/checkpw/:salt',usertest.checkmail);
app.get('/findEmail',usertest.findEmail);
app.post('/account/password/demand',usertest.sendfindemail);
app.post('/account/password',usertest.changepassword);