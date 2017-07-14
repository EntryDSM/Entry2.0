//성공시 200/201 실패시 400
//삭제 DELETE
//추가 POST
//수정 PUT
//조회-검색 GET

var express = require("express");
var User = require("../../database/models/userModel"); //user 모델 
var Content = require("../../database/models/QnAContentModel"); //게시글 모델
var router = express.Router();

<<<<<<< HEAD
function searchData(findData, response) {
    var responseData = [];
    findData.sort({ date: -1 }).exec(function (err, rawContents) {
        if (err) throw err;
        if (rawContents.length > 0) {
            var index = 0;
            rawContents.forEach(function (item) {
                index++;
                responseData.push({
                    index: index,
                    title: item.title,
                    content: item.contents,
                    author: item.author
                });
            });
            response.status(200).send(responseData);
        }
        else {
            response.status(200).send("None");
        }
    });
} // <== 데이터 반환 함수 구성 (콜백용)

//질문 조회 + 검색
router.get('/question', function (request, response) {
    var findData;
    var responseData = [];
    var keyword = request.query.keyword;
    var author = request.query.author;

    console.log(keyword + ',' + author);

    //찾으려는 데이터 범위
    if (!author && !keyword) {
        findData = Content.find({});
        searchData(findData, response);
        console.log("전체조회")
        return;
    }
    else {
        if (!keyword) {
            findData = Content.find({ author: { $regex: new RegExp(author, "i") } });
            console.log(findData.title);
            searchData(findData, response);

            return;
        }
        if (!author) {
            findData = Content.find({ content: { $regex: new RegExp(keyword, "i") } });
            searchData(findData, response);

            return;
        }
        else {
            response.sendStatus(400);
        }
    }
=======
//function ()

//질문 조회 + 검색
router.get('/question', function (request, response) {
    var searchData;
    var responseData = {};

    //찾으려는 데이터 범위
    if (!author && !keyword) {
        searchData = Content.find({});
    } else {
        var keyword = request.params.keyword.ToLowerCase();
        var author = request.params.author.ToLowerCase();
        if (!keyword) {
            searchData = Content.find({
                author: {
                    $regex: new RegExp(author, "i")
                }
            });
            return searchData;
        }
        if (!author) {
            searchData = Content.find({
                content: {
                    $regex: new RegExp(keyword, "i")
                }
            })
            return searchData
        }
        if (author && keyword) {
            searchData = Content.find({
                content: {
                    $regex: new RegExp(keyword, "i")
                },
                author: {
                    $regex: new RegExp(author, "i")
                }
            })
        }
    }

    //조회 결과를 JSON배열로 반환한다
    searchData.sort({
        date: -1
    }).exec(function (err, rawContents) {
        if (err) throw err;
        if (rawContents.length > 0) {
            var index = 1;
            rawContents.forEach(function (item) {
                index++;
                responseData.push({
                    index: index,
                    title: item.title,
                    author: item.author,
                    date: item.date
                });
                response.status(200).send(responseData);
            });
        }
    });
>>>>>>> origin/backend
});

//질문 등록
router.post('/question', function (request, response) {
    var currentUser = request.user; //현재 유저
    var tempIndex = 0; // <==TODO!! 인덱스 할당이 문제

    //세션이 아니라면 로그인 페이지로 리다이렉트
<<<<<<< HEAD
    // if (!currentUser) {
    //     response.status(400).redirect('/public/login.html'); 
    //     return;
    // }
=======
    if (!currentUser) {
        response.redirect('/public/login.html'); // 
    }
>>>>>>> origin/backend

    //타이틀과 내용이 없다면 400 반환
    if (!request.body.title || !request.body.content) {
        response.status(400).send("Entries must have a title and a body");
        return;
    }

    //DB에 콘텐츠 업로드
    var newContent = new Content({
<<<<<<< HEAD
        index: tempIndex,
=======
        index: Content.length + 1,
>>>>>>> origin/backend
        title: request.body.title,
        contents: request.body.content,
        date: new Date(),
        author: "test"
    });

    console.log("새로운 질문이 등록되었습니다. : \n" + newContent);
    newContent.save(() => { response.sendStatus(200) });

    Content.find({}).sort({ date: -1 }).exec(function (err, rawContents) {
        if (err) throw err;
        if (rawContents.length > 0) {
            var index = 0;
            rawContents.forEach(function (item) {
                index++;
                Content.update({ _id: item._id }, { $set: { index: index } }, (err, raw) => {
                    console.log(item.id);
                });
            });
            return;
        }
    });
});

//질문 수정
router.put('/question', function (request, response) {
    var currentUser = request.user //현재 유저

    // 로그인돤 상태가 아니라면 로그인 화면으로 리다이렉트
    //if (!currentUser) {
    //   response.status(400).redirect('./public/login.html');
    //   return;
    //}

    //찾으려는 글이 있는지
<<<<<<< HEAD
    if (Content.find({ index: request.body.index })) {
        var findOne = Content.find({ index: request.body.index });
        if (findOne) {
            console.log(findOne.title);
        }
        //찾은 글의 작성자가 현재 사용자와 같은지
        // if (findOne.author != currentUser) {
        //     response.sendStatus(401);
        // }

        //체크 통과하면 콘텐츠 업데이트 update({"index" : 1},{$set : {title: "put"}});
        Content.update(
            { index: request.body.index },
            {
                $set: {
                    title: request.body.title,
                    contents: request.body.content
                }
            }, (err) => {
                response.sendStatus(200);
            }
        )
    }
    else {
=======
    if (Content.find({
            index: request.body.index
        })) {
        var findOne = Content.find({
            index: request.body.index
        });
        //찾은 글의 작성자가 현재 사용자와 같은지
        if (findOne.author != currentUser) {
            response.sendStatus(401);
        }

        //체크 통과하면 콘텐츠 업데이트
        Content.update({
            title: request.body.title,
            contents: request.body.content
        })

        response.sendStatus(200);
    } else {
>>>>>>> origin/backend
        response.sendStatus(400);
    }
})

//질문 삭제
router.delete('/question', function (request, response) {
    var currentUser = request.user
    var index = 1;
    // 로그인돤 상태가 아니라면 로그인 화면으로 리다이렉트
    //if (!currentUser) {
    //    response.send(400).redirect('./public/login.html');
    //    return;
    //}

    //찾으려는 글이 있는지
<<<<<<< HEAD
    if (Content.find({ index: request.body.index })) {
        var findOne = Content.find({ index: request.body.index });
        console.log(request.body.index);
=======
    if (Content.find({
            index: request.body.index
        })) {
        var findOne = Content.find({
            index: request.body.index
        });
>>>>>>> origin/backend
        //찾은 글의 작성자가 현재 사용자와 같은지
        // if (findOne.author != currentUser) {
        //     response.sendStatus(400);
        //     return;
        // }
        //체크 통과하면 삭제
<<<<<<< HEAD
        Content.remove({ index: request.body.index }, (err) => {
            response.sendStatus(200);
        });

        //삭제하면 DB인덱스 재할당
    }
    else {
=======
        Content.remove({
            index: request.body.index
        });

        //삭제하면 DB인덱스 재할당
        var index = 1;
        Content.find({}).sort({
            date: 1
        }).exec(function (err, rawContents) {
            rawContents.forEach(function (item) {
                item.update({
                    index: index
                });
            })
        });
        response.sendStatus(200);
    } else {
>>>>>>> origin/backend
        response.sendStatus(400);
    }
    Content.find({}).sort({ date: -1 }).exec(function (err, rawContents) {
        if (err) throw err;
        if (rawContents.length > 0) {
            var index = 0;
            rawContents.forEach(function (item) {
                index++;
                Content.update({ _id: item._id }, { $set: { index: index } }, (err, raw) => {
                    console.log(item.id);
                });
            });
            return;
        }
    });

})

router.get('/myqna', function (req, res) {
    if (!req.session.key) {
        res.writeHead(401, {
            'Content-Type': 'text/html;charset=utf8'
        });
        res.write("<script>alert('권한이 없습니다. 로그인해주세요');</script>");
        res.write("<script>location.href='/public/login.html';</script>");
        res.end();
        return;
    } else {
        let database = req.app.get('database');

        // database connection is exist
        if (database.connection) {
            let response = [];
            // validation
            database.QnAContentModel.find({
                author: req.session.key
            }, function (err, docs) {
                let object;
                if (docs.length === 0) {

                    res.json(response);
                    res.end();
                    return;
                }
                for (var i = 0; i < docs.length; i++) {
                    object = {
                        "index": docs[i].index,
                        "title": docs[i].title,
                        "date": docs[i].date
                    }
                    response.push(object);
                    if (i === docs.length - 1) {

                        res.json(response);
                        res.end();
                        return;
                    }
                }

            });
        }

        // database connection is not exist
        else {
            res.writeHead(500);
            res.end();
        }
    }
});

module.exports = router;