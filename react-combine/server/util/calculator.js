let g_score
exports.calculate = function (grade, graduateType, applyType) {
    return new Promise((resolve, reject) => {
        let result = {
            "score": JSON,
            "volunteer": Number,
            "attendance": Number,
            "total": Number
        };
        let score = [];
        const attend = grade.attend;
        const volunteer = grade.volunteer;
        const subjects = [null, 'E', 'D', 'C', 'B', 'A'];
        g_score = grade.score.semesters;
        g_score.forEach(function (element) {
            let item = []
            element.forEach(function (grade) {
                item.push(grade.pass === true ? (grade.grade !== null ? subjects.indexOf(grade.grade) : null) : null);
            }, this);
            score.push(item);
        }, this);
        if (graduateType != 'BLACK') {
            for (var i = 0; i < score.length; i++) {
                if (checkNullArray(score[i], i)) {

                    if (i % 2 == 0) {

                        if (i < score.length - 1) {
                            score[i] = score[i + 1];
                        }
                    } else {
                        if (i === 5 && graduateType === 'DONE') continue;

                        score[i] = score[i - 1];
                    }
                }
            }
            result.score = calculateNormal(score, graduateType, applyType);
        } else {
            result.score = calculateBlack(score, applyType);
        }
        result.volunteer = calculateVolunteer(volunteer, graduateType, applyType);
        result.attendance = calculateAttendent(attend, graduateType, applyType);
        if (graduateType === 'BLACK') result.total = Number(result.score) + Number(result.attendance) + Number(result.volunteer);
        else result.total = Number(result.score.first) + Number(result.score.second) + Number(result.score.third) + Number(result.attendance) + Number(result.volunteer);
        resolve(result);
    })
}

function calculateNormal(data, graduateType, applyType) {
    var result = [];
    var i;

    for (i = 0; i < data.length; i++) {
        var average = 0,
            count = 0;
        for (var j = 0; j < data[i].length; j++) {
            if (data[i][j] != null && g_score[i][j].pass) {
                average += data[i][j];
                count++;
            } else if (i % 2 == 0) {
                if (i < data.length - 1) {
                    if (data[i + 1][j] == null) {
                        continue;
                    } else {
                        average += data[i + 1][j];
                        count++;
                    }
                }
            } else {
                if (data[i - 1][j] == null) {
                    continue;
                } else {
                    average += data[i - 1][j];
                    count++;
                }
            }
        }
        result[i] = count != 0 ? average / count : null;
    }
    if (graduateType == 'WILL') {
        result[5] = result[4];
    }

    var flag = 0;
    for (i = 0; i < result.length; i += 2) {
        if (i < result.length - 1) {
            if (result[i] == null && result[i + 1] == null) {
                flag += (i / 2) + 1;
            }
        }
    }

    var first, second, third;
    var fsMultiply, tMultiply;
    if (applyType == 'COMMON') {
        fsMultiply = 4.5;
        tMultiply = 6;
    } else {
        fsMultiply = 2.7;
        tMultiply = 3.6;
    }

    first = (result[0] + result[1]) * fsMultiply;
    second = (result[2] + result[3]) * fsMultiply;
    third = (result[4] + result[5]) * tMultiply;
    if (flag == 1) {
        if (graduateType == 'WILL') {
            first = (result[2] + result[3] + result[4]) * (2 / 3) * fsMultiply;
        } else {
            first = (result[2] + result[3] + result[4] + result[5]) * 0.5 * fsMultiply;
        }
    } else if (flag == 2) {
        if (graduateType == 'WILL') {
            second = (result[0] + result[1] + result[4]) * (2 / 3) * fsMultiply;
        } else {
            second = (result[0] + result[1] + result[4] + result[5]) * 0.5 * fsMultiply;
        }
    } else if (flag == 3) {
        first = (result[4] + result[5]) * fsMultiply;
        second = (result[4] + result[5]) * fsMultiply;
    }
    var resultScore = {
        first: first,
        second: second,
        third: third,
        total: 0
    };
    
    resultScore.first = Number(Number(resultScore.first).toFixed(3));
    resultScore.second = Number(Number(resultScore.second).toFixed(3));
    resultScore.third = Number(Number(resultScore.third).toFixed(3));
    resultScore.total = Number(resultScore.first) + Number(resultScore.second) + Number(resultScore.third);
    return resultScore;
}

function calculateBlack(data, applyType) {
    var average = 0,
        total;
    for (var i = 0; i < data.length; i++) {
        if (data[i] != null) {
            average += data[i];
        }
    }
    average /= data.length;

    var multiply;
    if (applyType == 'COMMON') {
        multiply = 150;
    } else {
        multiply = 90;
    }

    total = (average - 50) / 50 * multiply;

    return Number(total).toFixed(3);
}

function calculateAttendent(data, graduateType) {
    if (graduateType == 'BLACK') {
        return 15;
    }
    var toSub = (data.absence + (data.lateness + data.earlyLeave + data.subjectEscape) / 3) % 1;
    if (toSub >= 15) {
        return 0;
    }
    return Number(Number(15 - toSub).toFixed(3));
}

function calculateVolunteer(data, applyType, graduateType) {
    var score, minus, div;
    if (graduateType == 'BLACK') { // black(GED)
        score = calculateBlack(data, applyType);
        minus = 30;
        div = 120;
    } else {
        if (data >= 50) {
            return 15;
        } else if (data <= 14) {
            return 3;
        }
        score = data;
        minus = 14;
        div = 36;
    }

    var result;

    result = 3 + (score - minus) / div * 12;

    return Number(Number(result).toFixed(3));
}

function checkNullArray(data, index) {
    for (var i = 0; i < data.length; i++) {
        if (data[i] != null && g_score[index][i].pass) {
            return false;
        }
    }
    return true;
}