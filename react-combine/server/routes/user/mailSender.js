let fs = require('fs');
let Styliner = require('styliner');
let thisPath = __dirname;
let nodemailer = require('nodemailer');
let smtpPool = require('nodemailer-smtp-pool');
const serverDomain = process.env.ENTRYDSM_DOMAIN + ":" + process.env.ENTRYDSM_PORT;


let smtpPoolOption = {
    "service": process.env.ENTRYDSM_EMAIL_SERVICE,
    "host": process.env.ENTRYDSM_EMAIL_HOST,
    "port": process.env.ENTRYDSM_EMAIL_PORT,
    "auth": {
        "user": process.env.ENTRYDSM_EMAIL_USER,
        "password": process.env.ENTRYDSM_EMAIL_PASSWORD,
    },
    "tls": {
        rejectUnauthorize: false
    },
    "maxConnections": 5,
    "maxMessages": 10
}

exports.sendEmail = (wUser, type) => {
    return new Promise((resolve, reject) => {
        let filePath = thisPath + (type === 'auth' ? '../..//public/mail.html' : '/public/findPassword.html');

        let email = fs.readFileSync(filePath, 'utf8');
        let styliner = new Styliner(filePath);

        styliner.processHTML(data)
            .then((htmlFile) => {
                let mailContent = htmlFile.replace('@name', wUser.email).replace('@host', serverDomain);
                const sender = '대덕마이스터고등학교 입학전형 시스템 < syeutyu123@gmail.com >';

                const mailOptions = {
                    from: '대덕마이스터고등학교 입학전형 시스템 < syeutyu123@gmail.com >',
                    to: wUser.getDecryptedEmail(),
                    subject: type === 'auth' ? '[대덕소프트웨어마이스터고등학교] 입학전형시스템 회원가입 인증메일' : '[대덕소프트웨어마이스터고등학교] 입학전형시스템 비밀번호 재설정 메일',
                    html: mailContent
                };

                const transporter = nodemailer.createTransport(smtpPool(smtpPoolOption));

                transporter.sendMail(mailOptions, (err) => {
                    transporter.close();
                    if (err) {
                        console.log(err);
                        reject();
                    } else {
                        console.log(`SENT MAIL SUCCESSFULLY TO ${wUser.getDecryptedEmail()}`);
                        resolve();
                    }
                })
            })
            .catch((err) => {
                reject();
            })
    })
}