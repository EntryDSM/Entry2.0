var express = require('express');
var path = require('path');
var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');
var config = require('./config');
var static = require('serve-static');
var database = require('./mongo/database');
var router = require('./routes/router');
var bodyparser = require('body-parser');
var usertest = require('./routes/user');
var crypto = require('crypto');

var app = express();
var email;
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/public', static(path.join(__dirname, '/public')));
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());
router.init(app, express.Router());

app.listen(config.server_port, function () {
    console.log(config.server_port + 'ON');
    database.init(app, config);
});

app.get('/check/:email', function (req, res) {
    email = req.params.email;
    usertest.unemail(req, res, email, function (err, enemail) {
        var con = require('./confi.json');
        var sender = 'EntryDsm < syeutyu123@gmail.com >';
        var receiver = email;
        var mailTitle = 'Mail test';
        var name;
        name = enemail;
        console.log(name);

        //암호화된 이메일 name이고 a태그안에 속성으로 넣기만하면 됩니다.
        /* html을 require해서 얻어오는 방식을 잘 모르겠습니다 수정해야될것같고 a태크로는 예시 태그를 달았습니다 */
        var text1 =' <script>#EmailCover{width:55rem;height:28.5rem;border:1px solid gray;margin:0 auto;margin-top:5rem;border-radius:5px}</script><div id="EmailCover"><img src="https://scontent-icn1-1.xx.fbcdn.net/v/t34.0-12/19142146_1827248010924506_1038302564_n.png?oh=5529b183b457fc685804d9c35b675083&oe=59439DAD" id="DSM_Logo"><div id="Explain_Title"> Check your Email to join</div> <div id="Sub_Explain">EntryDSM에 가입하기 위한 이메일을 확인해주세요! <br>원서 접수 기간은 10/23일 부터 10/26일까지이니 이점 주의하시길 바랍니다.</div><form action=""><div id="ClickButton"><div id="ButtonText"><a href="/unemail/'
        var text2 = name+'">Check Now</div></div></form></div>';
        var html = text1.concat(text2);
      
        var mailOptions = {
            from: sender,
            to: receiver,
            subject: mailTitle,
            html: html
        };
        var transporter = nodemailer.createTransport(smtpPool({
            service: con.mailer.service,
            host: con.mailer.host,
            port: con.mailer.port,
            auth: {
                user: con.mailer.user,
                pass: con.mailer.password
            },
            tls: {
                rejectUnauthorize: false
            },
            maxConnections: 5,
            maxMessages: 10
        }));
        transporter.sendMail(mailOptions, function (err, res) {
            if (err) {
                console.log('failed... => ' + err);
            } else {
                console.log('성공 =>' + email);
            }
            transporter.close();
        });
    });
    res.redirect('/public/view3.html');
});

//이메일 암호화 한거 복호화 하여 이메일 찾고 그 이메일의 기본 boolean값을 트루로 바꿔준다. 
app.get('/unemail/:email', function (req, res) {
    var unemail = req.params.email;
    console.log(unemail);
    usertest.authunemail(req,res,unemail,function(checkemail){
       console.log('이메일 인증 완료'); 
    });
     res.send('<script>alert("이메일 인증완료 로그인 해주세요"); location.href ="/public/view3.html"</script>');
   
})