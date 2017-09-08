const WUser = require('../../database/models2/WUser');
const User = require('../../database/models2/User');
const ApplyData = require('../../database/models2/ApplyData');
const mailSender = require('./mailSender');

exports.signup = (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    User.findOneByEmail(email)
        .then((user) => {
            if (user) throw new Error('CONFLICT');
            return WUser.findOneByEmailAndRemove(email) // 같은 이메일을 사용한 인증대기자 삭제
        })
        .then((removed) => {
            return WUser.create(name, email, password); // 인증대기자 생성
        })
        .then((wUser) => {
            console.log('asdsa');
            return mailSender.sendEmail(wUser, 'auth'); // 이메일 발신
        })
        .then(() => {
            res.status(201).end(); // 위 절차 모두 성공시 200 반환
        })
        .catch((err) => {
            console.log(err);
            // 위 과정 중 오류 발생시 500, ERROR MESSAGE 반환
            if (err.message === 'CONFLICT') return res.status(409).end();
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
    const verifyCode = req.params.verifyCode;

    WUser.findOne({
            "verifyCode": verifyCode
        })
        .then((wUser) => {
            if (!wUser) throw new Error('NOT FOUND'); // 그런 사람 없다.
            else {
                WUser.findOneAndRemove({
                    "verifyCode": wUser.verifyCode
                }).exec();
                return User.create(wUser.name, wUser.email, wUser.password);
            }
        })
        .then((user) => {
            // 초기 ApplyData Document 생성
            console.log(user);
            return ApplyData.createEmpty(user._id);
        })
        .then((applyData) => {
            console.log(applyData);
            // 사용자, 빈 문서 생성 성공 :: 201
            return res.status(201).end();
        })
        .catch((err) => {
            // 만료된 링크 :: 410
            if (err.message === 'NOT FOUND') res.status(410).end();
            else res.status(500).end();
        })
}

exports.signin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOneByEmail(email)
        .then((user) => {
            if (!user) res.status(401).end();
            if (user.verify(password)) {
                req.session.key = user._id;
                res.status(200).end();
            } else res.status(401).end();
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}

/*
find email by name
*/
exports.findEmail = (req, res) => {
    const name = req.params.name;
    const emails = [];
    User.find({
            name
        })
        .then((users) => {
            users.forEach(function (user) {
                let username = user.getDecryptedEmail().split('@')[0];
                let service = user.getDecryptedEmail().split('@')[1];
                emails.push(username.split("").fill('*', 2).join("") + "@" + service);
            });
            return;
        })
        .then(() => {
            res.status(200).json(emails);
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        });
}

/*
이름과 이메일을 입력받아 랜덤 UUID 생성 후 이메일 발송
*/
exports.sendFindPasswordEmail = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    User.findOneByEmail(email)
        .then((user) => {
            if (!user) throw new Error('400');
            if (user.name === name) return user.generateVerifyCode();
            else throw new Error('400');
        })
        .then((user) => {
            return mailSender.sendEmail(user, 'find');
        })
        .then(() => {
            res.status(200).end();
        })
        .catch((err) => {
            console.log(err);
            if (err.message === '400') res.status(400).end();
            else res.status(500).end();
        })
}

exports.passwordChangeAuthentication = (req, res) => {
    const verifyCode = req.params.verifyCode;

    User.findOne({
            verifyCode
        })
        .then((user) => {
            if (!user) res.sendStatus(400);
            else {
                res.status(200).json({
                    "name": user.name,
                    "email": user.email
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}

exports.changePassword = (req, res) => {
    const verifyCode = req.params.verifyCode;
    const name = req.body.name;
    const email = req.body.email;

    User.findOne({
            verifyCode,
            name,
            email
        })
        .then((user) => {
            if (!user) throw new Error('400');
            else return user.changePassword(password);
        })
        .then((user) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            if (err.message === '400') res.sendStatus(400);
            else {
                console.log(err.message);
                res.sendStatus(500);
            }
        })
}