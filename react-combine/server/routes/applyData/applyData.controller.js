const ApplyData = require('../../database/models/ApplyData');

exports.getUserInfo = (req, res) => {
    const user = req.session.key;

    ApplyData.findOne({
            user
        }, {
            "info": true
        }).populate({
            "path": "user",
            "select": ['email', 'name']
        })
        .then((applyData) => {
            console.log(applyData);
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
            "classification": true
        })
        .then((applyData) => {
            console.log(applyData);
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
            "_id": false
        })
        .then((applyData) => {
            console.log(applyData);
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
            "introduce": true
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