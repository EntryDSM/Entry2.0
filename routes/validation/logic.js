let db = {};

exports.validation = (req, res) => {
    if (!req.session.key) {
        res.writeHead(401, {
            'Content-Type': 'text/html;charset=utf8'
        });
        res.write("<script>alert('권한이 없습니다. 로그인해주세요');</script>");
        res.write("<script>location.href='/public/login.html';</script>");
        res.end();
        return;
    }
    db = req.app.get('database');
    let response = {
        pageValidation: {
            first: false,
            second: false,
            third: false
        },
        messages: []
    };

    if (db.connection) {
        let infoPromise = new Promise(function (resolve, reject) {

            try {
                db.userInfoModel.validation(req.session.key, result => {

                    // validation과정에서 오류 발생
                    if (result == null) {
                        reject(res);
                        return;
                    } else {
                        // validation을 성공적으로 마침
                        let resultObject = {
                            "res": res,
                            "result": result,
                            "response": response,
                            "page": result.page
                        }

                        resolve(resultObject);
                    }
                });
            } catch (err) {
                // Syntax오류 등 각종 오류 Catch


                reject(res);
            }
        });
        // let scorePromise = new Promise(
        //     function(resolve, reject){
        //         db.userInfoModel.validation(req.session.key, result => {
        //             console.log(result);
        //             console.log(result.messages != null);

        //             if(result != null) {
        //                 resolve({
        //                 "res" : res,
        //                 "result" : result,
        //                 "response" : response,
        //                 "page" : result.page });
        //             }
        //             else {
        //                 reject(result.page);
        //             }
        //         });
        //     });

        let introducePromise = new Promise(function (resolve, reject) {

            try {
                db.userIntroduceModel.validation(req.session.key, result => {

                    // validation과정에서 오류 발생
                    if (result == null) {
                        reject(res);
                        return;
                    } else {
                        // validation을 성공적으로 마침
                        let resultObject = {
                            "res": res,
                            "result": result,
                            "response": response,
                            "page": result.page
                        }

                        resolve(resultObject);
                    }
                });
            } catch (err) {
                // Syntax오류 등 각종 오류 Catch


                reject(res);
            }
        });

        Promise.all([infoPromise, introducePromise]).then(validationResolve, validationReject);

    }
}

// resolve, reject가 공통적인 역할을 하니까 function 하나로 빼자.
function validationResolve(resultObject) {

    console.log('=================resolved=================');
    let res;
    let result;
    let response;
    console.log(resultObject);
    for (var i = 0; i < 2; i++) {
        res = resultObject[i].res;
        result = resultObject[i].result;
        response = resultObject[i].response;
        let page = resultObject[i].page;
        if (result.messages.length > 0) {
            response.pageValidation[page] = false;
            for (var j = 0; j < result.messages.length; j++) {
                response.messages.push(result.messages[j]);
            }
        } else response.pageValidation[page] = true;

    }

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(response));

}

function validationReject(res) {
    console.log('=================rejected=================');
    res.writeHead(400);
    res.end();
}
