const WUser = require('../../database/models2/WUser');
const User = require('../../database/models2/User');
const mailSender = require('./mailSender');

exports.signup = (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    WUser.findOneAndRemove({ // 같은 이메일을 사용한 인증대기자 삭제
            "email": email
        })
        .then((removed) => {
            return WUser.create(name, email, password); // 인증대기자 생성
        })
        .then((wUser) => {
            return mailSender.sendEmail(wUser, 'auth'); // 이메일 발신
        })
        .then(() => {
            res.status(200).end(); // 위 절차 모두 성공시 200 반환
        })
        .catch((err) => {
            // 위 과정 중 오류 발생시 500, ERROR MESSAGE 반환
            res.status(500).json({
                "message": err.message
            });
        });
}

/*

이메일 인증
---------
hashed_email : 암호화된 이메일 값 (url의 /:email)

*/
exports.emailAuthentication = (req, res) => {
    const hashed_email = req.paramse.email;

    WUser.findOne({
            "email": hashed_email
        })
        .then((wUser) => {
            if (!wUser) throw new Error('NOT FOUND'); // 그런 사람 없다.
            else return User.create(wUser.name, wUser.email, wUser.password);
        })
        .then((user) => {
            return
        })
}