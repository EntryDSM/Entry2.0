exports.findUser = (id, database) => {
    let arr = new Object();
    return new Promise((resolve, reject) => {
        database.applyDataModel.findUserInfo(id, (err, find) => {
            if (err) {
                reject(err);
            }
            arr.Type = checkType(find);
            arr.Score = checkScore(find);
            arr.Info = checkInfo(find);
            arr.Plan = checkPlan(find);
            arr.Final = checkFinal(find)
            resolve(arr);

        });
    });
};

exports.findBoard = (key, database) => {
    let arr = new Array();
    return new Promise((resolve, reject) => {
        findName(key, database).then((name) => {
            database.QnAContentModel.findByQna(key, (err, find) => {
                if (err) {
                    reject(err);
                }
                if (find) {
                    for (let i = 0; i < find.length; i++) {
                        find[i]._doc.name = name;

                        delete find[i]._doc._id;
                        delete find[i]._doc.author;
                        arr.push(find[i]);
                    }
                    resolve(arr);
                }
            });
        }).catch((err) => {
            reject(err);
        });

    });
};

function checkType(find) {
    if (find[0]._doc.applyBaseType || find[0]._doc.applyDetailType) {
        if (find[0]._doc.graduateType) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function checkInfo(find) {
    let address = find[0]._doc.addressBase + find[0]._doc.addressDetail;

    if (find[0]._doc.parentName && find[0]._doc.birthday && find[0]._doc.sex && address && find[0]._doc.myTel && find[0]._doc.parentTel && find[0]._doc.memberImage) {
        return true;
    } else {
        return false;
    }
}

function checkScore(find) {
    if (find[0]._doc.finalSum) {
        return true;
    } else {
        return false;
    }
}

function checkPlan(find) {
    if (find[0]._doc.studyPlan && find[0]._doc.introduce) {
        return true;
    } else {
        return false;
    }
}

function checkFinal(find) {
    if (find[0]._doc.applyStatus == true) {
        return true;
    } else {
        return false;
    }
}

function findName(key, database) {
    return new Promise((resolve, reject) => {
        database.applyDataModel.findUserInfo(key, (err, find) => {
            if (err) {
                reject(err);
            } else if (find && 0 < find.length) {
                resolve(find[0]._doc.name);
            } else {
                reject('Not Found User');
            }
        });
    });
}