var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');

exports.login = (req, res) => {
    var email = req.body.email || req.query.email;
    var password = req.body.password || req.query.password;
    var Docs = req.app.get('database');
    if (Docs.connection) {
        auth(Docs, email, password, (err, docs) => {
            if (err) {
                console.log(err.stack);
                return;
            }
            console.log(docs);
            if (docs === null) {
                res.send('<script>alert("아이디 또는 비밀번호를 다시 확인하세요.");</script>');
            } else if (docs[0]._doc.check == true) {
                // Session 생성 코드 
                req.session.key = docs[0]._doc.salt;
                // res.send('<script>alert("로그인이 성공적으로 처리되었습니다");</script>');
                // 세션정보 ejs에서도 유지되는지 테스트 key변수에 세션 정보담아 처리
                res.render('main', {
                    key: req.session.key
                });

            } else {
                res.send('<script>alert("회원가입 인증을 해주세요");location.href="/public/view3.html"</script>');
            };
        });
    }
}


var auth = (database, email, password, callback) => {
    database.userModel.findByEmail(email, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (results.length > 0) {
            var user = new database.userModel({
                email: email
            });
            var authpassword = user.authenticate(password, results[0]._doc.salt, results[0]._doc.hash_password);

            if (authpassword) {
                callback(null, results);
            } else {
                callback(null, null);
            }
        } else {
            callback(null, null);
        }
    });
};


exports.adduser = (req, res) => {
    var name = req.body.name || req.query.name;
    var email = req.body.email || req.query.email;
    var password = req.body.password || req.query.password;
    var unemail = email;
    var check;
    var Docs = req.app.get('database');

    if (Docs.connection) {
        checkEmail(Docs, email, function (find) {
            if (find === null) {
                addUser(Docs, name, email, password, unemail, check, (err, add) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (add) {
                        res.send('<script>alert("회원가입 성공"); location.href = "/check/' + email + '"</script>');
                    } else {
                        res.send('<script>alert("회원가입 실패");</script>');
                    }
                });

            } else {
                res.send('<script>alert("이미 회원가입한 이메일 입니다!!");</script>');
            }
        });
    }
};

var checkEmail = function (Docs, email, callback) {
    Docs.userModel.findByEmail(email, function (err, check) {
        if (check == false) {
            callback(null);
        } else {
            callback(check);
        }

    })
};

var addUser = (database, name, email, password, unemail, check, callback) => {
    var user = new database.userModel({
        "owner": name,
        "email": email,
        "password": password,
        "unemail": unemail,
        "uncheck": check
    });

    user.save((err) => {
        if (err) {
            callback(err, null);
            return;
        }

        callback(null, user);
    });
};


exports.sendemail = (req, res) => {
    var email = req.params.email;
    var database = req.app.get('database');
    database.userModel.findByEmail(email, (err, enemail) => {
        console.log('enemail' + enemail);
        var con = require('../../confi.json');
        var sender = 'EntryDsm < syeutyu123@gmail.com >';
        var receiver = email;
        var mailTitle = 'Mail test';
        var name = enemail[0]._doc.hash_email;
        console.log('hash_email ' + name);

        var text1 = ' <style>#EmailCover{width:55rem;height:28.5rem;border:1px solid gray;margin:0 auto;margin-top:5rem;border-radius:5px}</style><div id="EmailCover"><img src="DSM Logo.png" id="DSM_Logo"><div id="Explain_Title"> Check your Email to join</div> <div id="Sub_Explain">EntryDSM에 가입하기 위한 이메일을 확인해주세요! <br>원서 접수 기간은 10/23일 부터 10/26일까지이니 이점 주의하시길 바랍니다.</div><form action=""><div id="ClickButton"><div id="ButtonText"><a href="/unemail/';
        var text2 = name + '">Check Now</div><p>클릭누르면 다른 이메일 주소로 갑니다.</div></form></div>';
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
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log('failed... => ' + err);
            } else {
                console.log('성공 =>' + email);
            }
            transporter.close();
        });
    });
    res.redirect('/public/view3.html');
}


exports.unemail = (req, res) => {
    var database = req.app.get('database');
    var unemail = req.params.email;
    console.log(unemail);
    authunemail(req, res, unemail, (checkemail) => {
        console.log('checkemail ' + checkemail)
        if (checkemail) {
            database.userModel.update({}, {
                "$set": {
                    "check": true
                }
            }, {
                multi: true
            }, () => {
                console.log(checkemail);
                res.send('<script>alert("이메일 인증완료 로그인 해주세요"); location.href ="/public/view3.html"</script>');
            });

        }
    });

};


var authunemail = (req, res, unemail, callback) => {
    var database = req.app.get('database');
    //DB 모델 메소드 정의 후 비교후 값 리턴
    database.userModel.findunemail(unemail, (err, checked) => {
        if (err) {
            console.log(err);
        }
        if (checked != null) {
            console.log(checked[0]._doc.salt);
            database.userModel.authEnemail(unemail, checked[0]._doc.email, checked[0]._doc.salt, (archive) => {
                if (archive) {
                    checked[0]._doc.check = true;
                    callback(checked);
                }
            });
        } else {
            console.log('이메일 인증이 틀렸을떄의 오류 검출 코드');
        }
    });
};

exports.findEmail = function (req, res) {
    let database = req.app.get('database');
    let name = req.query.name;
    var arr = [];
    database.userModel.findByUser(name, (err, find) => {
        if (err) {
            console.log(err);
        }
        if (find) {
            for (var i = 0; i < find.length; i++) {
                var result = find[i]._doc.email.split("@");
                var len = result[0];
                var pemail = len.split("");
                for (var j = 0; j < len.length; j++) {
                    if (j > 2) {
                        pemail[j] = "*";
                    }
                }
                var chec = pemail.join("");
                arr[i] = chec.concat('@' + result[1]);
            }
        }
        res.send(arr);
    });
}

exports.sendfindemail = (req,res) => {
    var email = req.body.email;
    console.log(email);
    var database = req.app.get('database');
    database.userModel.findByEmail(email, (err, enemail) => {
        var con = require('../../confi.json');
        var sender = 'EntryDsm < syeutyu123@gmail.com >';
        var receiver = email;
        var mailTitle = 'Change Password Email';
        var salt = enemail[0]._doc.salt;

        var text1 = ' <style>#EmailCover{width:55rem;height:28.5rem;border:1px solid gray;margin:0 auto;margin-top:5rem;border-radius:5px}</style><div id="EmailCover"><img src="../DSM Logo.png" id="DSM_Logo"><div id="Explain_Title"> Check your Email to join</div> <div id="Sub_Explain">비밀번호 변경을 위해 아래의 링크를 클릭하세요</div><form action=""><div id="ClickButton"><div id="ButtonText"><a href="/checkpw/';
        var text2 = salt+ '">Check Now</div><p>클릭누르면 다른 이메일 주소로 갑니다.</div></form></div>';
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
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log('failed... => ' + err);
            } else {
                console.log('성공 =>' + email);
            }
            transporter.close();
        });
    });
    res.redirect('/public/view3.html');
}

//email이 맞다면 findbyemail.html을 띄워주기 잠깐 비밀번호를 바로 비교해줘도 되지않을까? 한번생각해보고 정하자
exports.checkmail = (req,res) =>{
    var database = req.app.get('database');
    var salt = req.params.salt;
    database.userModel.findSalt(salt,(err,inSalt)=>{
        if(inSalt){
            console.log('렌더링 시작');
            res.render('view4', {
                    id: inSalt[0]._doc.email
                });
        }
    })
}

exports.changepassword = (req, res) => {
    var database = req.app.get('database');
    var userid = req.body.userid;
    var password = req.body.password;
    var newpassword = req.body.newpassword;
    if(password === newpassword){
        res.send('<script>alert("비밀번호가 맞지않습니다.")</script>')
    }
    database.userModel.findByEmail(userid, (err,findid)=>{
        if(findid){
            database.userModel.update({}, {
                "$set": {
                    "check": true
                }
            }, {
                multi: true
            }, () => {
                console.log(checkemail);
                res.send('<script>alert("이메일 인증완료 로그인 해주세요"); location.href ="/public/view3.html"</script>');
            });
        }
    })

}