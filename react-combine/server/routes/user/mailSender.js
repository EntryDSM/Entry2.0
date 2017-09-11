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
        "pass": process.env.ENTRYDSM_EMAIL_PASSWORD,
    },
    "tls": {
        rejectUnauthorize: false
    },
    "maxConnections": 5,
    "maxMessages": 10
}

exports.sendEmail = (wUser, type) => {
    return new Promise((resolve, reject) => {
        let filePath = thisPath + (type === 'auth' ? '/../../public/mail.html' : '/../../public/findPassword.html');

        let file = fs.readFileSync(filePath, 'utf8');
        let styliner = new Styliner(filePath);

        styliner.processHTML(file)
            .then((htmlFile) => {
                let mailContent = htmlFile.replace('@verifyCode', wUser.verifyCode);
                const sender = '대덕마이스터고등학교 입학전형 시스템 < syeutyu123@gmail.com >';
                console.log(wUser.getDecryptedEmail());
                const mailOptions = {
                    from: '대덕마이스터고등학교 입학전형 시스템 < syeutyu123@gmail.com >',
                    to: wUser.getDecryptedEmail(),
                    subject: type === 'auth' ? '[대덕소프트웨어마이스터고등학교] 입학전형시스템 회원가입 인증코드' : '[대덕소프트웨어마이스터고등학교] 입학전형시스템 비밀번호 재설정 코드',
                    html: mailContent
                };

                const transporter = nodemailer.createTransport(smtpPool(smtpPoolOption));
                console.log(smtpPoolOption);
                transporter.sendMail(mailOptions, (err) => {
                    transporter.close();
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log(`MAIL SENT TO ${wUser.getDecryptedEmail()} SUCCESSFULLY`);
                        resolve();
                    }
                })
            })
            .catch((err) => {
                reject(err);
            })
    })
}