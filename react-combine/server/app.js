const express = require('express');
const path = require('path');
const static = require('serve-static');
const session = require('express-session');
const database = require('./database');
// const cookieParser = require('cookie-parser'); 나중에 자동로그인 구현
const bodyparser = require('body-parser');
const crypto = require('crypto');
const fileUpload = require('express-fileupload');
const app = express();
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
    if ((/email\/authentication\/.{1,}/.test(req.path)) || (/^(\/api\/)/.test(req.path))) next()
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


app.listen(process.env.ENTRYDSM_PORT, function () {
    console.log(process.env.ENTRYDSM_PORT + ' ON');
    database();
});