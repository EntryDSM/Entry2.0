//성공시 200/201 실패시 400
//삭제 DELETE
//추가 POST
//수정 PUT
//조회-검색 GET

var express = require("express");
var User = require("../../database/models/userModel"); //user 모델 
var Content = require("../../database/models/QnAContentModel"); //게시글 모델
var router = express.Router();

//function ()

//질문 조회 + 검색
router.get('/question', function(request, response) {
    var searchData;
    var responseData = {};
    
    //찾으려는 데이터 범위
    if (!author && !keyword) {
        searchData = Content.find({});
    }
    else {
        var keyword = request.params.keyword.ToLowerCase();
        var author = request.params.author.ToLowerCase();
        if (!keyword) {
            searchData = Content.find({author: {$regex: new RegExp(author, "i")}});
            return searchData;
        }
        if (!author) {
            searchData = Content.find({content: {$regex: new RegExp(keyword, "i")}})
            return searchData
        }
        if (author && keyword) {
            searchData = Content.find({content: {$regex: new RegExp(keyword, "i")},
            author: {$regex: new RegExp(author, "i")}})
        }
    }
    
    //조회 결과를 JSON배열로 반환한다
    searchData.sort({date:-1}).exec(function(err, rawContents) {
        if (err) throw err;
        if (rawContents.length > 0) {
            var index = 1;
            rawContents.forEach(function(item) {
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
});

//질문 등록
router.post('/question', function(request, response) {
    var currentUser = request.user; //현재 유저

    //세션이 아니라면 로그인 페이지로 리다이렉트
    if (!currentUser) {
        response.redirect('/public/login.html'); // 
    }
    
    //타이틀과 내용이 없다면 400 반환
    if (!request.body.title || !request.body.content) {
        response.status(400).send("Entries must have a title and a body");
        return;
    }

    //DB에 콘텐츠 업로드
    var newContent = new Content({
        index: Content.length+1,
        title: request.body.title,
        contents: request.body.content,
        date: new Date(),
        author: currentUser
    });

    newContent.save("next");
    response.sendStatus(201);
    response.redirect("/question");
});

//질문 수정
router.put('/question', function(request, response) {
    var currentUser = request.user //현재 유저

    // 로그인돤 상태가 아니라면 로그인 화면으로 리다이렉트
    if (!currentUser) {
        response.sendStatus(400);
        response.redirect('./public/login.html');
    }

    //찾으려는 글이 있는지
    if (Content.find({index: request.body.index})) {
        var findOne = Content.find({index: request.body.index});
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
    }
    else{
        response.sendStatus(400);
    }
})

//질문 삭제
router.delete('/question', function(request, response) {
    var currentUser = request.user
    // 로그인돤 상태가 아니라면 로그인 화면으로 리다이렉트
    if (!currentUser) {
        response.send(400).redirect('./public/login.html');
    }

    //찾으려는 글이 있는지
    if (Content.find({index: request.body.index})) {
        var findOne = Content.find({index: request.body.index});
        //찾은 글의 작성자가 현재 사용자와 같은지
        if (findOne.author != currentUser) {
            response.sendStatus(400);
        }
        //체크 통과하면 삭제
        Content.remove({index: request.body.index});

        //삭제하면 DB인덱스 재할당
        var index = 1;
        Content.find({}).sort({date:1}).exec(function(err, rawContents) {
            rawContents.forEach(function(item) {
                item.update({index: index});
            })
        });
        response.sendStatus(200);
    }
    else{
        response.sendStatus(400);
    }
})

module.exports = router;