var login = function (req, res) {
    console.log('DB에서 유저 검색');
    var email = req.body.email || req.query.email;
    var password = req.body.password || req.query.password;
    var Docs = req.app.get('database');
    if (Docs.db) {
        auth(Docs, email, password, function (err, docs) {
            if (err) {
                console.log(err.stack);
                return;
            }
            console.log(docs);
            if (docs[0]._doc.check == true) {

                res.send('<script>alert("로그인이 성공적으로 처리되었습니다");</script>');

            } else {
                res.send('<script>alert("회원가입 인증을 해주세요");location.href="/public/view3.html"</script>');
            };
        });
    }
}

var auth = function (database, email, password, callback) {
    console.log('유저 검색중...');
    database.Model.findByEmail(email, function (err, results) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log(email + '로 아이디 찾는중');
        if (results.length > 0) {
            console.log('사용자 찾음');
            var user = new database.Model({
                email: email
            });
            var authpassword = user.authenticate(password, results[0]._doc.salt, results[0]._doc.hash_password);

            if (authpassword) {
                console.log('비밀번호 일치함');
                
                callback(null, results);
            } else {
                console.log('비밀번호 일치 안함');
                callback(null, null);
            }

        } else {
            console.log('아이디를 찾지못함');
            callback(null, null);
        }
    });
};

var adduser = function (req, res) {
    var name = req.body.name || req.query.name;
    var email = req.body.email || req.query.email;
    var password = req.body.password || req.query.password;
    var unemail = email;
    var check;
    var Docs = req.app.get('database');

    if (Docs.db) {
        addUser(Docs, name, email, password, unemail, check, function (err, add) {
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
    }
};
var addUser = function (database, name, email, password, unemail, check, callback) {
    console.log('회원가입');
    var user = new database.Model({
        "owner": name,
        "email": email,
        "password": password,
        "unemail": unemail,
        "uncheck": check
    });

    user.save(function (err) {
        if (err) {
            callback(err, null);
            return;
        }

        console.log('데이터 전송추가');
        callback(null, user);
    });
};


function authunemail(req, res, unemail, callback) {
    var database = req.app.get('database');
    //DB 모델 메소드 정의 후 비교후 값 리턴
    console.log('실행');
    database.Model.findunemail(unemail, function (err, checked) {
        if (err) {
            console.log(err);
        }
        if (checked) {
            console.log(checked[0]._doc.salt);
            database.Model.authEnemail(unemail, checked[0]._doc.email, checked[0]._doc.salt, function (archive) {
                console.log('실행4');
                if (archive) {
                    checked[0]._doc.check = true;
                    console.log('checked '+checked);
                    callback(checked);
                }
            });
        }
    });
};
module.exports.login = login;
module.exports.adduser = adduser;
module.exports.authunemail = authunemail;