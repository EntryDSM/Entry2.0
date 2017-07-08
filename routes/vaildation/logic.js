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
        let infoPromise = new Promise(
            function (resolve, reject) {
                try{
                db.userInfoModel.validation(req.session.key, result => {
                    let resultObject = {
                        "res": res,
                        "result": result,
                        "response": response,
                        "page": result.page
                    }
                    if (result != null) {
                        resolve(resultObject);
                    } else {
                        reject(res);
                    }
                });
            }catch(err){
                    console.log("ERROR OCCURRED");
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

        // let introducePromise = new Promise(
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

        Promise.all([infoPromise]).then(validationResolve, validationReject);

    }
}

// resolve, reject가 공통적인 역할을 하니까 function 하나로 빼자.
function validationResolve(resultObject) {

    console.log('=================resolved=================');
    for (var i = 0; i < 1; i++) {
        let res = resultObject[i].res;
        let result = resultObject[i].result;
        let response = resultObject[i].response;
        let page = resultObject[i].page;
        if (result.messages.length > 0) {
            response.pageValidation[page] = false;
            for (var j = 0; j < result.messages.length; j++) {
                response.messages.push(result.messages[j]);
            }
        } else response.pageValidation[page] = true;

        if (page === 'first') {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(response));
        }
    }
}

function validationReject(res) {
    res.writeHead(400);
    res.end();
}