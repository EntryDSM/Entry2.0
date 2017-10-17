const router = require('express').Router();
const logic = require('./logic');
const fs = require('fs')
const createScore = require('../util/calculator');
const excel = require('./createExcel');
const mongoXlsx = require('mongo-xlsx');
const adminApply = require('./adminApply');
const admin = require('../database/models/Admin');
const onlyAdmin = require('../middlewares/onlyAdmin');

router.route('/admin/login').get((req, res) => {
    res.render('adminLogin');
});

router.route('/admin/signin').post((req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    admin.findOneById(id)
        .then(admin => {
            if (admin === null) {
                res.send('<script>alert("관리자 계정을 찾지 못했습니다");history.go(-1);</script>');
                res.end();
            } else if (admin.verify(password)) {
                req.session.key = admin._id;
                res.redirect('/admin')
            } else {
                res.send('<script>alert("비밀번호를 틀리셨습니다.");history.go(-1);</script>');
                res.end();
            }
        })
        .catch(err => {
            res.send('<script>alert("로그인 과정에서 오류가 발생했습니다! 다시 시도해주세요.");history.go(-1);</script>');
            res.end();
        });
});
router.route('/admin').get(onlyAdmin, (req, res) => {

    let applyDataModel = require('../database/models/ApplyData');

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
            var score;
            applyDataModel.find({
                $and: [{ 'classification.regionType': 'HOME' },
                    { 'classification.applyBaseType.type': 'COMMON' }
                ],
                applyStatus: true
            }, (err, find) => {
                if (err) reject(err);
                find.forEach(function(element) {
                    score = element.grade.calculatedScore.total;
                    score = (score - (score % 10)) / 10;
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
            var score;
            applyDataModel.find({
                $and: [{ 'classification.regionType': 'AWAY' },
                    { 'classification.applyBaseType.type': 'COMMON' }
                ],
                applyStatus: true
            }, (err, find) => {
                if (err) reject(err);
                find.forEach(function(element) {
                    score = element.grade.calculatedScore.total;
                    score = (score - (score % 10)) / 10;
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
            var score;
            applyDataModel.find({
                'classification.regionType': 'HOME',
                $or: [{ 'classfication.applyBaseType.type': 'MEISTER' },
                    { 'classification.applyBaseType.type': 'SOCIAL' }
                ],
                applyStatus: true
            }, (err, find) => {
                if (err) reject(err);
                find.forEach(function(element) {
                    score = element.grade.calculatedScore.total;
                    score = (score - (score % 10)) / 10;
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
            var score;
            applyDataModel.find({
                'classification.regionType': 'AWAY',
                $or: [{ 'classfication.applyBaseType.type': 'MEISTER' },
                    { 'classification.applyBaseType.type': 'SOCIAL' }
                ],
                applyStatus: true
            }, (err, find) => {
                if (err) reject(err);
                find.forEach(function(element) {
                    score = element.grade.calculatedScore.total;
                    score = (score - (score % 10)) / 10;
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
            var count;
            applyDataModel.count({
                'classification.regionType': 'HOME',
                'classification.applyBaseType.type': 'COMMON',
                applyStatus: true
            }).count(function(err, count) {
                userCount.home.common = count;

                resolved(true);
            })
        })
    }

    var countHomeMeister = function() {
        return new Promise(function(resolved, reject) {
            var count;
            applyDataModel.count({
                'classification.regionType': 'HOME',
                'classification.applyBaseType.type': 'MEISTER',
                applyStatus: true
            }).count(function(err, count) {
                userCount.home.meister = count;

                resolved(true);
            })
        })
    }

    var countHomeSocial = function() {
        return new Promise(function(resolved, reject) {
            var count;
            applyDataModel.count({
                'classification.regionType': 'HOME',
                'classification.applyBaseType.type': 'SOCIAL',
                applyStatus: true
            }).count(function(err, count) {
                userCount.home.social = count;

                resolved(true);
            })
        })
    }

    var countAwayCommon = function() {
        return new Promise(function(resolved, reject) {
            var count;
            applyDataModel.count({
                'classification.regionType': 'AWAY',
                'classification.applyBaseType.type': 'COMMON',
                applyStatus: true
            }).count(function(err, count) {
                console.log(count)
                userCount.away.common = count;

                resolved(true);
            })
        })
    }

    var countAwayMeister = function() {
        return new Promise(function(resolved, reject) {
            var count;
            applyDataModel.count({
                'classification.regionType': 'AWAY',
                'classification.applyBaseType.type': 'MEISTER',
                applyStatus: true
            }).count(function(err, count) {
                userCount.away.meister = count;

                resolved(true);
            })
        })
    }

    var countAwaySocial = function() {
        return new Promise(function(resolved, reject) {
            var count;
            applyDataModel.count({
                'classification.regionType': 'AWAY',
                'classification.applyBaseType.type': 'SOCIAL',
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
        console.log(viewScores);
        console.log(tmpScores);

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


router.route('/admin/search').post(onlyAdmin, (req, res) => {
    //조회되는 원서
    //파라미터로 지역 / 상세-> 

    logic.search(req.body)
        .then((data) => {
            res.render('admin_search', { data: data });
            res.end();
        })
        .catch((err) => {
            res.send(`<script>alert("${err}");location.href="/admin/search";</script>`);
            res.end();
        });
}).get((req, res) => {
    res.render('admin_search', { data: '' });
})

router.route('/admin/search/detail').get(onlyAdmin, (req, res) => {
    let userId = req.query.userId;

    Promise.all([logic.findBase(userId), logic.getDetail(userId)])
        .then((find) => {
            let userDetail = Object.assign(find[0], find[1]); // 두개의 json합치기
            res.render('admin_view_details', { data: userDetail });
        }).catch((err) => {
            res.send(`<script>alert("${err}"); history.go(-1);</script>`);

        });
});

router.route('/admin/search/delete').post(onlyAdmin, (req, res) => {
    //원서 삭제 + 마이스터 관리자
    userId = req.body.userId;
    logic.deleteUser(userId)
        .then(() => {
            res.send(`<script>alert("학생 정보 삭제 완료"); location.href="/admin/search";</script>`);
        })
        .catch((err) => {
            res.send(`<script>alert("${err}"); location.href="/admin/search";</script>`);
        });
});

router.route('/admin/search/value').post(onlyAdmin, (req, res) => {
    // let key = req.session.key;
    let id = req.body.userId;
    let applyDataModel = require('../database/models/ApplyData');
    //결제 여부 => 일반관리자
    //접수 여부  + 제출여부 변경 가능 => 마이스터관리자
    if (req.isSuper === false) {
        console.log('일반 관리자 ');
        if (typeof req.body.checkPayment != 'undefined') {
            applyDataModel.findOneAndUpdate({ user: id }, { $set: { "checkPayment": req.body.checkPayment } }, (err, doc) => {
                if (err) {
                    res.send('<script>alert("오류가 발생했습니다");location.href="/admin/search";</script>');
                    res.end();
                    console.log(err + Date.now);
                } else {
                    res.send('<script>alert("결제 변경 완료했습니다.");location.href="/admin/search";</script>');

                }
            })
        } else {
            res.send('<script>alert("권한이 존재 하지 않습니다");location.href="/admin/search";</script>');
            res.end();
        }
    } else {
        console.log('마이스터 관리자 ');
        if (typeof req.body.checkReceipt != 'undefined') {
            applyDataModel.findOneAndUpdate({ user: id }, { $set: { "checkReceipt": req.body.checkReceipt } }, (err, doc) => {
                if (err) {
                    res.send('<script>alert("오류가 발생했습니다");location.href="/admin/search";</script>');
                    res.end();
                    console.log(err + Date.now);
                } else {
                    res.send('<script>alert("결제 변경 완료했습니다.");location.href="/admin/search";</script>');

                }
            })
        } else {
            res.send('<script>alert("권한이 존재 하지 않습니다");location.href="/admin/search";</script>');
            res.end();
        }
    }
})

router.route('/admin/search/status').post((req, res) => {
    let applyStatus = req.body.applyStatus;
    let user = req.body.userId;
    logic.updateApplyStatus(applyStatus, user)
        .then(() => {
            res.send('<script>alert("접수 여부 변경 완료");location.href="/admin/search";</script>');
        })
        .catch((err) => {
            res.send(`<script>alert("${err}");location.href="/admin/search";</script>`);
        })
});

router.route('/admin/create').post(onlyAdmin, (req, res) => { // 수험번호 생성부분
    let userId = req.body.userId;
    console.log(userId);
    logic.createNum(userId)
        .then(() => {
            res.send('<script>alert("수험번호 생성 완료"); location.href="/admin/search";</script>');
            res.end();
        })
        .catch((err) => {
            console.log(err);
            res.send('<script>alert("' + err + '"); location.href="/admin/search";</script>');
            res.end();
        })
});

router.route('/excel').post((req, res) => {
    console.log('Excel 출력');
    let userId = req.body.userId;
    excel.excel(userId, (data, model) => {
        if (data && 0 < model.length) {
            mongoXlsx.mongoData2Xlsx(data, model, (err, data) => {
                if (err) console.log(err);
                res.download(data.fullPath, 'Entry Dsm ' + adminApply.getTimeStamp() + '.xlsx', (err) => {
                    if (err)
                        console.log(err);
                });
            });
        } else {
            res.send('<script>alert("정보 찾지 못함 - Excel"); location.href="/admin/search"; </script>')
        }
    });
});

module.exports = router;