let nodemailer = require('nodemailer');
let smtpPool = require('nodemailer-smtp-pool');
let fs = require('fs');
let Styliner = require('styliner');
let rootPath = require('../../config').getRootPath();
let server_domain = require('../../config').getServerDomain();
let logic = require('./function');
let con = require('../../confi.json');


exports.login = (req, res) => {
    let email = req.body.email || req.query.email;
    let password = req.body.password || req.query.password;
    let Docs = req.app.get('database');
    console.log('로그인 ');
    try {
        if (Docs.connection) {
            auth(Docs, email, password, (err, docs) => {
                if (err) {
                    console.log(err.stack);
                    return;
                }
                console.log(docs);
                if (docs === null) {
                    console.log('관리자 로그인 접속');
                    Docs.adminModel.findadmin(email, password, (err, find) => {
                        if (err) {
                            console.log(err);
                            res.status(500);
                            res.end();
                        }
                        console.log(find);
                        if (0 < find.length) {
                            req.session.key = con.sessionKey;
                            res.end();
                            // html 코드 나오면 합병
                            // res.render('adminMain', {
                            //     admin: 'admin'
                            // });
                        } else {
                            res.status(400);
                            res.end();
                        }
                    });
                } else if (docs[0]._doc.check == true) {
                    console.log('로그인 완료');
                    req.session.key = docs[0]._doc.salt;
                    res.writeHead(200);
                    res.write("<script>location.href='/public/view2.html';</script>");
                    res.end();

                } else {
                    res.writeHead(400);
                    res.write("<script>location.href='/public/view3.html';</script>");
                    //res.end('회원가입 인증 필요');
                    res.end();
                };
            });
        }
    } catch (err) {
        console.log(err)
        res.writeHead(400);
        res.end();
    }
}

//정보를 찾고 비밀번호가 DB의 정보와 동일한지 판단 하는 auth메소드
var auth = (database, email, password, callback) => {
    database.userModel.findByEmail(email, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        //리턴하는 값이 1개 이상이면 실행
        if (results.length > 0) {
            //해당되는 모델 생성
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
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var unemail = email; //이메일 암호화를 담아줄 변수
    var check; //Boolean 값으로 이메일 인증을 했는지 안했는지 체크해주는 변수
    var Docs = req.app.get('database');

    if (Docs.connection) {
        checkEmail(Docs, email, function(find) {
            //해당되는 정보가 Null일경우 회원가입
            if (find === null) {
                // 입력된 정보 DB에저장
                addUser(Docs, name, email, password, unemail, check, (err, add) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (add) {
                        sendemail(req, res, email);
                    } else {

                    }
                });

            } else if (find[0].check == undefined) {
                sendemail(req, res, email);
            } else {
                res.writeHead(400);
                res.write("<script>location.href='/public/view1.html';</script>");
                //res.end('이미 회원가입한 이메일 입니다');
                res.end();
            }
        });

    }

};


var addUser = (database, name, email, password, unemail, check, callback) => {
    //모델 생성후 저장
    try {
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
            } else {
                database.userModel.usercount(function(err, docs) {
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        // var count = docs.length;

                        // var date = new Date();

                        // var submit_number = parseInt(date.getFullYear()) * 1000 + count;

                        // var applydata = new database.applyDataModel({
                        //     "user": user.salt,
                        //     "submit_number": submit_number,
                        //     "name": name,
                        //     "insertdate": date,
                        //     "updatedate": date
                        // });

                        // applydata.save((err) => {
                        //     if (err) {
                        //         callback(err, null);
                        //         return;
                        //     }else{
                        //         callback(null, true);
                        //     }
                        // });
                        callback(null, true);
                    }
                });
            };
        });
    } catch (err) {
        console.log(err);
    }
}


//입력받은 이메일중 값이 존재하는지 체크
var checkEmail = function(Docs, email, callback) {
    Docs.userModel.findByEmail(email, function(err, check) {
        if (check.length < 1) {
            callback(null);
        } else {
            callback(check);
        }

    })
};

//true 변경으로 DB업데이트후  이메일 인증완료 확인 메소드
exports.unemail = (req, res) => {
    var database = req.app.get('database');
    var unemail = req.params.email;
    console.log(unemail);

    try {
        authunemail(req, res, unemail, (checkemail) => {

            if (checkemail) {
                // hash_email을 통해 유저 조회
                database.userModel.findOne({
                    "hash_email": unemail
                }, function(err, doc) {
                    // 유저의 암호화값, 이름을 통해 새 빈 문서 생성&저장
                    new database.applyDataModel(database.applyDataModel.createEmptyDocument(doc.salt, doc.owner)).save();
                });


                // check => true로 변환
                database.userModel.update({}, {
                    "$set": {
                        "check": true
                    }
                }, {
                    multi: true
                }, () => {

                    console.log('메일 회원가입 인증 성공');
                    res.writeHead(200);
                    res.write("<script>location.href='/public/view3.html';</script>");
                    res.end();
                });

            } else {
                console.log('이메일 인증 중 실패');
                res.status(400);
                res.end();
            }
        });
    } catch (err) {
        console.log(err);
        res.writeHead(400);
        res.end();
    }

};

// check값 true로 변환후 콜백
var authunemail = (req, res, unemail, callback) => {
    var database = req.app.get('database');
    //DB 모델 메소드 정의 후 비교후 값 리턴
    database.userModel.findunemail(unemail, (err, checked) => {
        try {
            if (checked != null) {
                database.userModel.authEnemail(unemail, checked[0]._doc.email, checked[0]._doc.salt, (archive) => {
                    if (archive) {
                        checked[0]._doc.check = true;
                        callback(checked);

                    } else {
                        console.log('이메일 암호화 결과 틀림');
                        callback(false);
                    }
                });

            } else {
                callback(false);
                console.log('이메일 인증이 틀렸을떄의 오류 검출 코드');
            }

        } catch (err) {
            console.log(err);
            res.writeHead(500);
            res.end();
        }

    });

};

//회원가입시 입력받은 이메일로 메일전송
let sendemail = (req, res, email) => {
    let baseDir = rootPath + '/public/mail.html';
    var database = req.app.get('database');
    database.userModel.findByEmail(email, (err, enemail) => {

        try {
            var num = enemail[0]._doc.hash_email;
            console.log('send Email : ' + enemail[0]._doc.hash_email)

            fs.readFile(baseDir, 'utf8', function(err, data) {

                var styliner = new Styliner(baseDir); //html에서 css적용을 위한 모듈

                styliner.processHTML(data).then((htmlfile) => { //css 적용후 htmlfile코드 반환


                    var htmldata = htmlfile.replace('@name', num); //a태그로 특수한 키를 줘야하기에 name값을 num으로 변환
                    htmldata = htmldata.replace('@host', server_domain);

                    if (err) {
                        res.writeHead(400);
                    }

                    if (enemail) {
                        console.log(email + ' Send Email');

                        var sender = 'EntryDsm < syeutyu123@gmail.com >';
                        var receiver = email;
                        var mailTitle = 'Entry DSM Find PassWord';

                        var mailOptions = {
                            from: sender,
                            to: receiver,
                            subject: mailTitle,
                            html: htmldata
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
                        //res.redirect('/public/view3.html');
                        res.writeHead(200);
                        res.write("<script>location.href='/public/view3.html';</script>");
                        res.end();
                    }
                });
            });
        } catch (err) {
            console.log(err);
            res.writeHead(500);
            res.end();
        }
    });
}

//이메일을 찾기위해 이름을 입력받고 해당되는 이메일 출력
exports.findEmail = function(req, res) {
    console.log('이메일 찾기');
    let database = req.app.get('database');
    let name = req.query.name;
    var arr = [];

    database.userModel.findByUser(name, (err, find) => {
        try {
            if (err) {
                console.log(err);
            }

            if (find) {

                for (var i = 0; i < find.length; i++) {

                    var result = find[i]._doc.email.split("@"); //@기준으로 배열분리
                    var len = result[0]; //아이디값저장
                    var pemail = len.split(""); //한 문자로 변환

                    for (var j = 0; j < len.length; j++) {
                        if (j > 2) {
                            pemail[j] = "*";
                        }
                    }

                    var chec = pemail.join(""); //문자열 변환
                    arr[i] = chec.concat('@' + result[1]); //이메일형식으로 변환
                }
            } else {
                //res.send('<script>alert("입력하신 이름에 해당하는 아이디는 존재하지 않습니다.");</script>')
                res.writeHead(400);
                res.end();
            }
            console.log(arr + '아이디 찾음');
            res.send(arr);

        } catch (err) {
            console.log(err)
            res.writeHead(500);
            res.end();
        }

    });
}

//비밀번호 변경을위한 메일 보내는 메소드
exports.sendfindemail = (req, res) => {

    let email = req.body.email;

    let baseDir = rootPath + '/public/passwordMail.html';
    let database = req.app.get('database');

    database.userModel.findByEmail(email, (err, enemail) => {

        try {
            var num = enemail[0]._doc.salt;
            fs.readFile(baseDir, 'utf8', function(err, data) {

                var styliner = new Styliner(baseDir);


                styliner.processHTML(data).then((htmlfile) => {
                    htmlfile = htmlfile.replace('@val', num);
                    console.log('비밀번호 찾기용 메일 전송');


                    if (enemail) {

                        var sender = 'EntryDsm < syeutyu123@gmail.com >';
                        var receiver = email;
                        var mailTitle = 'Change Password';

                        var mailOptions = {
                            from: sender,
                            to: receiver,
                            subject: mailTitle,
                            html: htmlfile
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
                        //res.send('<script>alert("입력하신 이메일로 메일이 전송되었습니다."); location.href ="/public/view3.html"</script>');
                        console.log(num + ' 으로 값 보냄 ');
                        res.writeHead(200);
                        res.end();
                    }
                });
            });
        } catch (err) {
            console.log(err);
            res.writeHead(500);
            res.end();
        }
    });
}

//비밀번호 번경을 위해 어떤 사용자인지 검증하고 변경 페이지로 리다이렉트 
exports.checkmail = (req, res) => {
    let salt = req.params.email;
    var database = req.app.get('database');
    console.log(salt + '값으로 비번변경 키로 사용이됨');

    try {
        database.userModel.findSalt(salt, (err, inSalt) => {
            if (inSalt) {

                req.session.key = inSalt[0]._doc.hash_email;

                res.writeHead(200);

                res.write("<script>location.href='/public/passcheck.html';</script>");
                res.end();
            } else {
                //res.send('<script>alert("해당 링크는 존재하지 않습니다.");</script>')
                res.writeHead(500);
                res.end();
            }
        })
    } catch (err) {
        console.log(err)
        res.writeHead(500);
        res.end();
    }
}


// 비밀번호 변경을위해 입력받은데이터로 모델 생성후 비밀번호 업데이트
exports.changepassword = (req, res) => {
    var database = req.app.get('database');
    var password = req.body.password;
    let userId = req.session.key;
    console.log(req.session);
    console.log(userId + ' 세션키가 비밀번호 변경까지 유지중입니다.');

    database.userModel.findSalt(userId, (err, findId) => {
        try {
            if (findId) {
                console.log(findId[0]._doc.salt)
                var user = new database.userModel({
                    "password": password,
                    "salt": findId[0]._doc.salt
                });

                var pwChange = user.hash_password;

                database.userModel.update({}, {
                    "$set": {
                        "hash_password": pwChange
                    }
                }, {
                    multi: true
                }, () => {
                    console.log('비밀번호 변경완료');
                    //res.send('<script>alert("비밀번호 변경완료"); location.href ="/public/view3.html"</script>');
                    res.writeHead(200);
                    res.write("<script>location.href='/public/view3.html';</script>");
                    res.end();
                });
            } else {
                // res.send('<script>alert("입력하신 이메일이 존재하지 않습니다.");</script>')
                console.log('이메일이 존재하지않음')
                res.writeHead(400);
                res.end();
            }
        } catch (err) {
            console.log(err)
            res.writeHead(500);
            res.end();
        }
    })

}

exports.myPage = (req, res) => {
    let database = req.app.get('database');
    if (req.session.key) {
        Promise.all([logic.findUser(req.session.key, database), logic.findBoard(req.session.key, database)])
            .then((find) => {
                res.status(200).send({ Data: find });
                res.end();
            }).catch((err) => {
                res.status(500).send({ 'err': err });
                res.end();
            });


    } else {
        res.status(401).send({ err: 'Not Found Session Key' });
        res.end();
    }
};