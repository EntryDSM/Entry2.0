const ApplyData = require('../../database/models/ApplyData');
const UUID = require('uuid/v4');
const fs = require('fs');

exports.getUserInfo = (req, res) => {
    const user = req.session.key;

    ApplyData.findOne({
            user
        }, {
            "info": true,
            "user": true
        }).populate({
            "path": "user",
            "select": ['email', 'name']
        })
        .then((applyData) => {
            console.log(applyData);
            applyData.user.email = applyData.user.getDecryptedEmail();
            applyData.info.user = applyData.user;
            res.status(200).json(applyData.info);
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}

exports.reviseUserInfo = (req, res) => {
    const user = req.session.key;
    const info = req.body.info;

    ApplyData.findOne({
            user
        })
        .then((applyData) => {
            return applyData.reviseInfo(info);
        })
        .then((applyData) => {
            console.log(applyData);
            res.sendStatus(200);
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}

exports.getUserClassification = (req, res) => {
    const user = req.session.key;

    ApplyData.findOne({
            user
        }, {
            "classification": true,
            "user": true
        }).populate({
            "path": "user",
            "select": ['email', 'name']
        })
        .then((applyData) => {
            console.log(applyData);
            applyData.user.email = applyData.user.getDecryptedEmail();
            applyData.classification.user = applyData.user;
            res.status(200).json(applyData.classification);
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}

exports.reviseUserClassification = (req, res) => {
    const user = req.session.key;
    const classification = req.body.classification;

    ApplyData.findOne({
            user
        })
        .then((applyData) => {
            return applyData.reviseClassification(classification);
        })
        .then((applyData) => {
            console.log(applyData);
            res.sendStatus(200);
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}

exports.getUserGrade = (req, res) => {
    const user = req.session.key;

    ApplyData.findOne({
            user
        }, {
            "grade": true,
            "_id": false,
            "user": true
        }).populate({
            "path": "user",
            "select": ['email', 'name']
        })
        .then((applyData) => {
            console.log(applyData);
            applyData.user.email = applyData.user.getDecryptedEmail();
            res.status(200).json(applyData);
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}

exports.reviseUserGrade = (req, res) => {
    const user = req.session.key;
    const grade = req.body.grade;

    ApplyData.findOne({
            user
        })
        .then((applyData) => {
            return applyData.reviseGrade(grade);
        })
        .then((applyData) => {
            console.log(applyData);
            res.sendStatus(200);
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}

exports.getUserIntroduce = (req, res) => {
    const user = req.session.key;

    ApplyData.findOne({
            user
        }, {
            "introduce": true,
            "user": true
        }).populate({
            "path": "user",
            "select": ['email', 'name']
        })
        .then((applyData) => {
            console.log(applyData);
            res.status(200).json(applyData.introduce);
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}

exports.reviseUserIntroduce = (req, res) => {
    const user = req.session.key;
    const introduce = req.body.introduce;

    ApplyData.findOne({
            user
        })
        .then((applyData) => {
            return applyData.reviseIntroduce(introduce);
        })
        .then((applyData) => {
            console.log(applyData);
            res.sendStatus(200);
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}

exports.validation = (req, res) => {
    const user = req.session.key;

    ApplyData.findOne({
            user
        })
        .then((applyData) => {
            return applyData.validation();
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                "message": err.message
            });
        })
}

exports.preview = (req, res) => {
    const user = req.session.key;

    ApplyData.findOne({
            user
        }).populate('user')
        .then((previewData) => {
            res.status(200).json(previewData);
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}

exports.getProfile = (req, res) => {
    const user = req.session.key;
    ApplyData.findOne({
            user
        }, {
            "profile": true
        })
        .then((applyData) => {
            if (applyData.profile === null) res.status(404).end();
            else {
                const file = fs.readFileSync(__dirname + `/../../uploads/${applyData.profile}`);
                res.writeHead(200, {
                    "Content-Type": `image/${applyData.profile.split("\.").pop()}`
                });
                res.write(file);
                res.end();
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).end();
        })
}

exports.reviseProfile = (req, res) => {
    const user = req.session.key;
    const file = req.files.profile;
    const src = UUID().slice(0, 12) + `.${file.mimetype.split("/")[1]}`;
    console.log(src);
    if (typeof file === "undefined" || file === null) return res.status(400).end();

    let _applyData;

    ApplyData.findOne({
            user
        })
        .then((applyData) => {
            if (!applyData) throw new Error('NOT FOUND');
            _applyData = applyData;
            fs.unlinkSync(__dirname + `/../../uploads/${applyData.profile}`);
            return file.mv(__dirname + `/../../uploads/${src}`);
        })
        .then(() => {
            return _applyData.reviseProfile(src);
        })
        .then(() => {
            res.status(200).end();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).end();
        })
}