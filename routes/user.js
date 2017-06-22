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

            if (docs) {
                var data = docs[0].data; //DB의 데이터를 받아온다는걸 data라고 함.

                if (data === null) {
                    return res.send('<script type="text/javascript">alert("문서 없음");</script>');
                } else {
                    var context = {
                        text: Docs.text
                    }; //text에서 Docs.text가 DB에 저장된 텍스트인 데 맞는지 모르겠음
                    return res.render('loginview', context, function (err, html) {
                        res.end(html);
                    });
                }

            }
        });
    } else {
        console.log('DB에 연결못함');
    }
};

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
                //여기 수정 부분
                console.log('비밀번호 일치함');
                console.log(results[0]._doc.check);
                if(results[0]._doc.check){
                callback(null, results);
                }
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
    var Docs = req.app.get('database');

    if (Docs.db) {
        addUser(Docs, name, email, password, function (err, add) {
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
var addUser = function (database, name, email, password, callback) {
    console.log('회원가입');
    var user = new database.Model({
        "owner": name,
        "email": email,
        "password": password
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

  function unemail (req, res, email,callback) {
    console.log(email);
    var Docs = req.app.get('database');
    var check = false;
    var unemail = email;
    Docs.Model.findByEmail(unemail, function (err, results) {
        console.log('findbyemaul');
        console.log(unemail);

        if (results.length > 0) {

            console.log('실행');
            var salt = results[0]._doc.salt;
            console.log(salt);

                unemailcheck(Docs,unemail,email,salt,check, function (err, checkemail) {
                console.log('unemailcheck함수실행');
                console.log('adfasd '+checkemail);
                if (err) {
                    console.log(err);
                    return;
                }
                if (checkemail) {
                    console.log('이메일 암호화 완료');
                    callback(null, checkemail);
                } else {
                    console.log('checkemail실패');
                    callback(null, null);
                }
            });
        }
    });
}

 function unemailcheck (database, unemail, email,salt,check,callback) {
    console.log('호출');
    var user = new database.Model({
        "unemail": unemail,
        "email":email,
        "salt":salt,
        "check":check
    });
    user.save();

    console.log('호출 뒤의 user '+user.email);
    callback(null,user.email);
}

 function authunemail(req,res,unemail,callback){
    var database = req.app.get('database');
    //DB 모델 메소드 정의 후 비교후 값 리턴
    console.log('실행');
     database.Model.findunemail(unemail,function(err,checked){
         if(err){
             console.log(err);
         }
        if(checked){
            console.log(checked[0]._doc.salt);
            database.Model.authEnemail(unemail,checked[0]._doc.email,checked[0]._doc.salt,function(archive){
                console.log('실행4');
                if(archive){
                    checked[0]._doc.check = true;
                    console.log(checked);
                    callback(checked);
                }
            });
        }
     });
 };
module.exports.login = login;
module.exports.adduser = adduser;
module.exports.unemail = unemail;
module.exports.authunemail = authunemail;