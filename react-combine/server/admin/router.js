const router = require('express').Router();
const logic = require('./logic');
const fs = require('fs')
const createScore = require('../util/calculator');
const excel = require('./createExcel');
const mongoXlsx = require('mongo-xlsx');
const adminApply = require('./adminApply');
const admin = require('../database/models/Admin');

router.route('/admin/directPage').get((req, res) => {
    res.render('adminLogin');
});

router.route('/admin/signin').post((req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    admin.findOne({ "id": email, "password": password })
        .then((findData) => {
            if (!findData) {
                res.send('<script>alert("관리자 계정을 찾지 못했습니다");history.go(-1);</script>');
                res.end();
            } else if (findData.admin) {
                console.log('마이스터 관리자 로그인');
                req.session.key = 'MEISTER';
                res.redirect('/admin');
            } else if (!findData.admin) {
                console.log('일반 관리자 로그인');
                req.session.key = 'ADMIN';
                res.redirect('/admin');
            }
        });
});
router.route('/admin').get((req, res) => {
    let key = req.session.key;
    let applyDataModel = require('../database/models/ApplyData');

    if (key != 'ADMIN' || key != 'MEISTER') {
        res.send('<script>alert("권한이 존재 하지 않습니다");history.go(-1);</script>');
        res.end();
    }

    let viewScores = {
        common: {
            home: {
                to180: 0,
                to170: 0,
                to160: 0,
                to150: 0,
                to140: 0,
                to130: 0,
                to120: 0,
                to110: 0,
                to100: 0,
                under90: 0
            },

            away: {
                to180: 0,
                to170: 0,
                to160: 0,
                to150: 0,
                to140: 0,
                to130: 0,
                to120: 0,
                to110: 0,
                to100: 0,
                under90: 0
            },
        },
        special: {
            home: {
                to120: 0,
                to110: 0,
                to100: 0,
                to90: 0,
                to80: 0,
                to70: 0,
                to60: 0,
                to50: 0,
                to40: 0,
                to30: 0,
                under20: 0
            },
            away: {
                to120: 0,
                to110: 0,
                to100: 0,
                to90: 0,
                to80: 0,
                to70: 0,
                to60: 0,
                to50: 0,
                to40: 0,
                to30: 0,
                under20: 0
            }
        }
    }

    let tmpScores = {
            scoreCommonHome: [],
            scoreCommonAway: [],
            scoreSpecialHome: [],
            scoreSpecialAway: []
        }
        //TODO: regeionType, applyBaseType 변경사항 체킹 후 변수명 변경

    let userCount = {
        home: {
            common: NaN,
            meister: NaN,
            social: NaN,
            sum: NaN
        },
        away: {
            common: NaN,
            meister: NaN,
            social: NaN,
            sum: NaN
        },
        sum: {
            common: NaN,
            meister: NaN,
            social: NaN,
            sum: NaN
        }
    }

    function categorizeScore(array, isSpecial, isHome) {
        if (isSpecial === true) {
            if (isHome === true) {
                array.forEach(function(score) {
                    if (score === 12) viewScores.special.home.to120++;
                    else if (score === 11) viewScores.special.home.to110++;
                    else if (score === 10) viewScores.special.home.to100++;
                    else if (score === 9) viewScores.special.home.to90++;
                    else if (score === 8) viewScores.special.home.to80++;
                    else if (score === 7) viewScores.special.home.to70++;
                    else if (score === 6) viewScores.special.home.to60++;
                    else if (score === 5) viewScores.special.home.to50++;
                    else if (score === 4) viewScores.special.home.to40++;
                    else if (score === 3) viewScores.special.home.to30++;
                    else;
                }, this);
            } else if (isHome === false) {
                array.forEach(function(score) {
                    if (score === 12) viewScores.special.away.to120++;
                    else if (score === 11) viewScores.special.away.to110++;
                    else if (score === 10) viewScores.special.away.to100++;
                    else if (score === 9) viewScores.special.away.to90++;
                    else if (score === 8) viewScores.special.away.to80++;
                    else if (score === 7) viewScores.special.away.to70++;
                    else if (score === 6) viewScores.special.away.to60++;
                    else if (score === 5) viewScores.special.away.to50++;
                    else if (score === 4) viewScores.special.away.to40++;
                    else if (score === 3) viewScores.special.away.to30++;
                    else;
                }, this);
            }

        } else if (isSpecial === false) {
            array.forEach(function(score) {
                if (isHome === true) {
                    array.forEach(function(score) {
                        if (score === 18) viewScores.common.home.to180++;
                        else if (score === 17) viewScores.common.home.to170++;
                        else if (score === 16) viewScores.common.home.to160++;
                        else if (score === 15) viewScores.common.home.to150++;
                        else if (score === 14) viewScores.common.home.to140++;
                        else if (score === 13) viewScores.common.home.to130++;
                        else if (score === 12) viewScores.common.home.to120++;
                        else if (score === 11) viewScores.common.home.to110++;
                        else if (score === 10) viewScores.common.home.to100++;
                    }, this);
                } else if (isHome === false) {
                    array.forEach(function(score) {
                        if (score === 18) viewScores.common.away.to180++;
                        else if (score === 17) viewScores.common.away.to170++;
                        else if (score === 16) viewScores.common.away.to160++;
                        else if (score === 15) viewScores.common.away.to150++;
                        else if (score === 14) viewScores.common.away.to140++;
                        else if (score === 13) viewScores.common.away.to130++;
                        else if (score === 12) viewScores.common.away.to120++;
                        else if (score === 11) viewScores.common.away.to110++;
                        else if (score === 10) viewScores.common.away.to100++;
                    }, this);
                }
            }, this);
        }
    }

    var scoreCommonHome = function() {
        return new Promise(function(resolved, reject) {
            console.log(1);
            var score;
            applyDataModel.find({
                $and: [{ 'classification.regeionType': 'HOME' },
                    { 'classfication.applyBaseType.type': 'COMMON' }
                ]
            }, (err, find) => {
                if (err) reject(err);
                find.forEach(function(element) {
                    score = element.grade.calculatedScore.total;
                    score = (score - (score % 10)) / 10;
                    console.log("forEach");
                    if (score > 9) {
                        tmpScores.scoreCommonHome.push(score);
                    } else {
                        viewScores.common.home.under90++;
                    }
                }, this);
                categorizeScore(tmpScores.scoreCommonHome, false, true);
                resolved(true);
            })
        })
    }

    var scoreCommonAway = function() {
        return new Promise(function(resolved, reject) {
            console.log(2);
            var score;
            applyDataModel.find({
                $and: [{ 'classification.regeionType': 'AWAY' },
                    { 'classfication.applyBaseType.type': 'COMMON' }
                ]
            }, (err, find) => {
                if (err) reject(err);
                find.forEach(function(element) {
                    score = element.grade.calculatedScore.total;
                    score = (score - (score % 10)) / 10;
                    console.log("forEach");
                    if (score > 9) {
                        tmpScores.scoreCommonAway.push(score);
                    } else {
                        viewScores.common.home.under90++;
                    }
                }, this)
                categorizeScore(tmpScores.scoreCommonAway, false, false);
                resolved(true);
            });
        })
    }

    var scoreSpecialHome = function() {
        return new Promise(function(resolved, reject) {
            console.log(3);
            var score;
            applyDataModel.find({
                'classification.regeionType': 'HOME',
                $or: [{ 'classfication.applyBaseType.type': 'MEISTER' },
                    { 'classfication.applyBaseType.type': 'SOCIAL' }
                ]
            }, (err, find) => {
                if (err) reject(err);
                find.forEach(function(element) {
                    score = element.grade.calculatedScore.total;
                    score = (score - (score % 10)) / 10;
                    console.log("forEach");
                    if (score > 2) {
                        tmpScores.scoreSpecialHome.push(score);
                    } else {
                        viewScores.special.home.under20++;
                    }
                }, this);
                categorizeScore(tmpScores.scoreSpecialHome, true, true);
                resolved(true);
            })
        })
    }

    var scoreSpecialAway = function() {
        return new Promise(function(resolved, reject) {
            console.log(4);
            var score;
            applyDataModel.find({
                'classification.regeionType': 'AWAY',
                $or: [{ 'classfication.applyBaseType.type': 'MEISTER' },
                    { 'classfication.applyBaseType.type': 'SOCIAL' }
                ]
            }, (err, find) => {
                if (err) reject(err);
                find.forEach(function(element) {
                    score = element.grade.calculatedScore.total;
                    score = (score - (score % 10)) / 10;
                    console.log("forEach");
                    if (score > 2) {
                        tmpScores.scoreSpecialAway.push(score);
                    } else {
                        viewScores.special.away.under20++;
                    }
                }, this);
                categorizeScore(tmpScores.scoreSpecialAway, true, false);
                resolved(true);
            })
        })
    }

    /*
    지역별 조회 후 if 문으로 분류.
    */

    var countHomeCommon = function() {
        return new Promise(function(resolved, reject) {
            console.log(6);
            var count;
            applyDataModel.count({
                'classification.regeionType': 'HOME',
                'classfication.applyBaseType.type': 'COMMON',
                applyStatus: true
            }).count(function(err, count) {
                userCount.home.common = count;
                console.log(count + "home common");

                resolved(true);
            })
        })
    }

    var countHomeMeister = function() {
        return new Promise(function(resolved, reject) {
            console.log(6);
            var count;
            applyDataModel.count({
                'classification.regeionType': 'HOME',
                'classfication.applyBaseType.type': 'MEISTER',
                applyStatus: true
            }).count(function(err, count) {
                userCount.home.meister = count;
                console.log(count + "home meister");

                resolved(true);
            })
        })
    }

    var countHomeSocial = function() {
        return new Promise(function(resolved, reject) {
            console.log(6);
            var count;
            applyDataModel.count({
                'classification.regeionType': 'HOME',
                'classfication.applyBaseType.type': 'SOCIAL',
                applyStatus: true
            }).count(function(err, count) {
                userCount.home.social = count;
                console.log(count + "home social");

                resolved(true);
            })
        })
    }

    var countAwayCommon = function() {
        return new Promise(function(resolved, reject) {
            console.log(6);
            var count;
            applyDataModel.count({
                'classification.regeionType': 'AWAY',
                'classfication.applyBaseType.type': 'COMMON',
                applyStatus: true
            }).count(function(err, count) {
                userCount.away.common = count;
                console.log(count + "away common");

                resolved(true);
            })
        })
    }

    var countAwayMeister = function() {
        return new Promise(function(resolved, reject) {
            console.log(6);
            var count;
            applyDataModel.count({
                'classification.regeionType': 'AWAY',
                'classfication.applyBaseType.type': 'MEISTER',
                applyStatus: true
            }).count(function(err, count) {
                userCount.away.meister = count;
                console.log(count + "away meister");

                resolved(true);
            })
        })
    }

    var countAwaySocial = function() {
        return new Promise(function(resolved, reject) {
            console.log(6);
            var count;
            applyDataModel.count({
                'classification.regeionType': 'AWAY',
                'classfication.applyBaseType.type': 'SOCIAL',
                applyStatus: true
            }).count(function(err, count) {
                userCount.away.social = count;
                console.log(count + "away social");

                resolved(true);
            })
        })
    }

    // var countSum = function(){
    //     return new Promise(function(resolved, reject){
    //         userCount.sum.common = userCount.home.common +  userCount.away.common;
    //         userCount.sum.meister = userCount.home.meister + userCount.away.meister;
    //         userCount.sum.social = userCount.home.social + userCount.away.social;
    //         userCount.sum.sum = userCount.sum.common + userCount.sum.meister + userCount.sum.social;
    //         userCount.away.sum = userCount.away.common + userCount.away.meister + userCount.away.social;
    //         userCount.home.sum = userCount.home.common + userCount.home.meister + userCount.home.social;
    //         console.log('countSum');
    //         resolved(true);
    //     })
    // }
    // 이상하게 안되서 주석처리함 나중에 ㄱㄱ


    Promise.all([scoreCommonAway(), scoreCommonHome(),
        scoreSpecialAway(), scoreSpecialHome(),
        countAwayCommon(), countAwayMeister(), countAwaySocial(),
        countHomeCommon(), countHomeMeister(), countHomeSocial(),
    ]).then((data) => {

        userCount.sum.common = userCount.home.common + userCount.away.common;
        userCount.sum.meister = userCount.home.meister + userCount.away.meister;
        userCount.sum.social = userCount.home.social + userCount.away.social;
        userCount.sum.sum = userCount.sum.common + userCount.sum.meister + userCount.sum.social;
        userCount.away.sum = userCount.away.common + userCount.away.meister + userCount.away.social;
        userCount.home.sum = userCount.home.common + userCount.home.meister + userCount.home.social;
        console.log("THEN");
        console.log(userCount);

        res.render('admin_main', {
            viewScores: viewScores,
            userCount: userCount
        });

    }).catch((err) => {
        console.log("CATCH");
        console.log(userCount);
        res.render('admin_main', {
            viewScores: viewScores,
            userCount: userCount
        });
    })
});


router.route('/admin/search').post((req, res) => {
    //조회되는 원서
    //파라미터로 지역 / 상세-> 
    let key = req.session.key;

    if (key === "ADMIN" || key === "MEISTER") {
        logic.search(req.body)
            .then((data) => {
                res.render('admin_search', { data: data });
                res.end();
            })
            .catch((err) => {
                res.send(`<script>alert("${err}");history.go(-1);</script>`);
                res.end();
            });
    } else {
        res.send('<script>alert("권한이 존재 하지 않습니다");history.go(-1);</script>');
        res.end();
    }
})

router.route('/admin/search/detail').get((req, res) => {
    let userId = req.query.userId;
    let key = req.session.key;

    if (key === 'ADMIN' || key === 'MEISTER') {
        Promise.all([logic.findBase(userId), logic.getDetail(userId)])
            .then((find) => {
                let userDetail = Object.assign(find[0], find[1]); // 두개의 json합치기
                res.render('admin_view_details', { data: userDetail });
            }).catch((err) => {
                res.send(`<script>alert("${err}"); history.go(-1);</script>`);

            });

    } else {
        res.send('<script>alert("관리자 권한이 필요합니다"); history.go(-1);</script>');
    }
});

router.route('/admin/search/delete').post((req, res) => {
    //원서 삭제 + 마이스터 관리자
    let key = req.session.key;
    userId = req.body.userId;
    let applyDataModel = require('../database/models/ApplyData');

    if (key === 'ADMIN' || key === 'MEISTER') {
        applyDataModel.remove({
            user: userId
        }, (err) => {
            if (err) {
                res.send('<script>alert("학생 정보 찾지 못함");history.go(-1);</script>');
                res.end();
            } else {
                res.send('<script>alert("학생 정보 삭제 완료");history.go(-1);</script>');
                res.end();
            }
        })
    } else {
        res.send('<script>alert("권한이 존재 하지 않습니다");history.go(-1);</script>');
        res.end();
    }
});

router.route('/admin/search/value').post((req, res) => {
    let key = req.session.key;
    let id = req.body.userId;
    let applyDataModel = require('../database/models/ApplyData');
    //결제 여부 => 일반관리자
    //접수 여부 => 마이스터관리자
    if (key === "ADMIN") {
        console.log('일반 관리자 ');
        if (typeof req.body.checkPayment != 'undefined') {
            applyDataModel.findOneAndUpdate({ user: id }, { $set: { "payment": req.body.checkPayment } }, (err, doc) => {
                if (err) {
                    res.send('<script>alert("오류가 발생했습니다");history.go(-1);</script>');
                    res.end();
                    console.log(err + Date.now);
                } else {
                    res.send('<script>alert("결제 변경 완료했습니다.");history.go(-2);</script>');

                }
            })
        } else {
            res.send('<script>alert("권한이 존재 하지 않습니다");history.go(-1);</script>');
            res.end();
        }
    } else if (key === "MEISTER") {
        console.log('마이스터 관리자 ');
        if (typeof req.body.checkReceipt != 'undefined') {
            applyDataModel.findOneAndUpdate({ user: id }, { $set: { applyStatus: req.body.checkReceipt } }, (err, doc) => {
                if (err) {
                    res.send('<script>alert("오류가 발생했습니다");history.go(-1);</script>');
                    res.end();
                    console.log(err + Date.now);
                } else {
                    res.send('<script>alert("결제 변경 완료했습니다.");history.go(-2);</script>');

                }
            })
        } else {
            res.send('<script>alert("권한이 존재 하지 않습니다");history.go(-1);</script>');
            res.end();
        }
    } else {
        res.send('<script>alert("권한이 존재 하지 않습니다");history.go(-1);</script>');
        res.end();
    }
})

router.route('/admin/create').post((req, res) => { // 수험번호 생성부분
    if (req.session.key == 'ADMIN' || req.session.key == 'MEISTER') {
        let userId = req.body.userId;
        console.log(userId);
        logic.createNum(userId)
            .then(() => {
                res.send('<script>alert("수험번호 생성 완료"); history.go(-1);</script>');
                res.end();
            })
            .catch((err) => {
                console.log(err);
                res.send('<script>alert("' + err + '"); history.go(-1);</script>');
                res.end();
            })
    } else {
        res.send('<script>alert("관리자 권한이 필요합니다"); history.go(-1);</script>');
        res.end();
    }
});

router.route('/excel').post((req, res) => {
    console.log('Excel 출력');
    if (req.session.key == 'ADMIN' || req.session.key == 'MEISTER') {
        let userId = req.body.userId;
        excel.excel(userId, (data, model) => {
            if (data && 0 < model.length) {
                mongoXlsx.mongoData2Xlsx(data, model, (err, data) => {
                    res.download(data.fullPath, 'Entry Dsm User Excel.xlsx', (err) => {
                        if (err)
                            console.log(err);
                    });
                });
            } else {
                res.send('<script>alert("정보 찾지 못함 - Excel"); history.go(-1); </script>')
            }
        });
    } else {
        res.send('<script>alert("관리자 권한이 필요합니다"); history.go(-1);</script>');
    }
});

module.exports = router;