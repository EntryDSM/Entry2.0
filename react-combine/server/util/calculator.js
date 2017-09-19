let g_score
exports.calculate = function (grade, graduateType, applyType) {
    console.log(grade);
    console.log(graduateType);
    console.log(applyType);
    return new Promise((resolve, reject) => {
        let result = {
            "score": JSON,
            "volunteer": Number,
            "attendance": Number
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
                    console.log(i);
                    if (i % 2 == 0) {

                        if (i < score.length - 1) {
                            score[i] = score[i + 1];
                        }
                    } else {
                        if (i === 5 && graduateType === 'DONE') continue;

                        score[i - 1] = score[i];
                    }
                }
            }

            result.score = calculateNormal(score, graduateType, applyType);
        } else {
            result.score = calculateBlack(score, applyType);
        }
        result.volunteer = calculateVolunteer(volunteer, graduateType, applyType);
        result.attendance = calculateAttendent(attend, graduateType, applyType);
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
            console.log(g_score[i][j].pass);
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

    resultScore.first = Number(resultScore.first).toFixed(4);
    resultScore.second = Number(resultScore.second).toFixed(4);
    resultScore.third = Number(resultScore.third).toFixed(4);
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
    total = total.toFixed(4);
    console.log("======" + total);
    return Number(total).toFixed(4);
}

function calculateAttendent(data, graduateType) {
    if (graduateType == 'BLACK') {
        return 15;
    }
    var toSub = (data.absence + (data.lateness + data.earlyLeave + data.subjectEscape) / 3) % 1;
    if (toSub >= 15) {
        return 0;
    }
    return Number(15 - toSub).toFixed(4);
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
    result = Number(result).toFixed(4);

    return result;
}

function checkNullArray(data, index) {
    console.log("NULL CHECKING");
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        console.log(g_score[i])
        if (data[i] != null && g_score[index][i].pass) {
            return false;
        }
    }
    return true;
}


/*
let _grade;
let _graduateType;
let _applyType;
let _volunteer;
let _scores;
let _attend;
const gradeToNumber = [null, 'E', 'D', 'C', 'B', 'A'];

module.exports = (grade, graduateType, applyType) => {
    _grade = grade;
    _graduateType = graduateType;
    _applyType = applyType;
    _volunteer = grade.volunteer ? 0 : grade.volunteer;
    _attend = grade.attend;
    _scores = graduateType === 'BLACK' ? grade.score.scores.concat(grade.score.choose.score) : grade.score.semester;

    return () => {
        let result = {
            "score": graduateType === 'BLACK' ? black() : not_black(),
            "volunteer": volunteer(),
            "attendance": attendance()
        }
    }
}

function not_black() {
    const graduateType = _graduateType;
    let semesters = [];
    let pass_semesters = [];
    let pass = [];

    let result = {
        "first": Number,
        "second": Number,
        "third": Number
    }

    // 점수 배열 생성 :: semesters
    _scores.forEach(function (semester) {
        let item_pass = [];
        let item_score = [];
        let item_pass_semesters = false;
        semester.forEach(function (subject) {
            if (subject.pass) item_pass_semesters = true;
            item_pass.push(subject.pass);
            item_score.push(subject.pass ? gradeToNumber.indexOf(subject.grade) : null);
        }, this);

        pass_semesters.push(item_pass_semesters);
        pass.push(item_pass);
        semesters.push(item_score);

    }, this);

    // 한 학기에 이수한 경우 => 1개 학기 성적을 2개 학기 성적으로 생각한다.
    for (let i = 0; i < semesters.length; i++) {
        if (isNotPassedSemester(semesters[i])) {
            if (i % 2 === 0) {
                if (graduateType === 'WILL' && i === 4) continue;
                else semesters[i] = semesters[i + 1];
            } else {
                semesters[i] = semesters[i - 1];
            }
        }
    }

    let firstGrade = [semesters[0], semesters[1]];
    let secondGrade = [semesters[2], semesters[3]];
    let thirdGrade = graduateType === 'DONE' ? [semesters[4], semesters[5]] : [semesters[4]];

    console.log("==============");
    console.log("FIRST GRADE");
    console.log(firstGrade);
    console.log("==============");
    console.log("SECOND GRADE");
    console.log(secondGrade);
    console.log("==============");
    console.log("THIRD GRADE");
    console.log(thirdGrade);

    if (isPassedGrade(firstGrade)) {

    } else if (isPassedGrade(secondGrade)) {

    } else if (isPassedGrade(thirdGrade)) {

    } else {
        result.first = result.second = result.third = 0;
    }

}

function calculate(scores, grade) {
    if (isPassedGrade(scores) === false) return 0;
    else {
        for (let i = 0; i < scores.length; i++) {

        }
    }
}

function black() {
    const score = _scores;
    const applyType = _applyType;
    const multiply = applyType === 'COMMON' ? 150 : 90;
    let total = 0;
    let avg;
    let result;

    for (let i = 0; i < scores.length; i++) {
        if (scores[i] != null) {
            total += scores[i];
        }
    }
    avg = total / scores.length;

    total = (avg - 50) / 50 * multiply;

    console.log("======BLACK RESULT======\n" + Number(total).toFixed(4));
    return Number(total).toFixed(4);
}

function volunteer() {
    const graduateType = _graduateType;
    const volunteer = _volunteer;
    let score, minus, div;
    let result;

    if (graduateType == 'BLACK') { // black(GED)
        score = black();
        minus = 30;
        div = 120;
    } else {
        if (volunteer >= 50) {
            return 15;
        } else if (volunteer <= 14) {
            return 3;
        }
        score = volunteer;
        minus = 14;
        div = 36;
    }


    result = 3 + (score - minus) / div * 12;


    return Number(result).toFixed(4);
}

function attendance() {
    const graduateType = _graduateType;
    const attend = _attend;
    if (graduateType == 'BLACK') {
        return 15;
    }
    const toSub = (attend.absence + (attend.lateness + attend.earlyLeave + attend.subjectEscape) / 3) % 1;

    if (toSub >= 15) {
        return 0;
    }
    return 15 - toSub;
}

function isNotPassedSemester(scores) {
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] !== null) return false;
    }
    return true;
}

function isPassedGrade(semesters) {
    for (let i = 0; i < semesters.length; i++) {
        if (isNotPassedSemester(semesters[i])) return false;
    }
    return true;
}
*/