const express = require('express');
const path = require('path');
const static = require('serve-static');
const session = require('express-session');
const database = require('./database');
// const cookieParser = require('cookie-parser'); 나중에 자동로그인 구현
const bodyparser = require('body-parser');
const crypto = require('crypto');
const fileUpload = require('express-fileupload');
const morgan = require('morgan')
const app = express();

const router = require('./routes');
const adminRouter = require('./admin/router');

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');

morgan.token('sessionKey', function getKey(req) { return req.session ? req.session.key : undefined })
app.use(morgan('SessionKey - :sessionKey :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));

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

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('*', (req, res, next) => {
    if ((/email\/authentication\/.{1,}/.test(req.path)) || (/^(\/api\/)/.test(req.path)) || (/^(\/admin)/.test(req.path))) {
        next()
    } else res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.use(bodyparser.json());

// app.use(require('express-method-override')('method_override_param_name'));
app.use(fileUpload());

app.use('/', router);
app.use('/', adminRouter);


app.listen(process.env.ENTRYDSM_PORT, function() {
    console.log(process.env.ENTRYDSM_PORT + ' ON');
    const secret = process.env.ENTRYDSM_SECRET;
    const cipher = crypto.createCipher('aes192', secret);
    let encryptedEmail = cipher.update('super@entrydsm.hs.kr', 'utf8', 'hex');
    encryptedEmail += cipher.final('hex');
    console.log(encryptedEmail);

    const encryptedPassword = crypto.createHmac('sha1', secret)
    .update('welcome18freshmen!')
    .digest('base64');

    console.log(encryptedPassword);
    database();
});