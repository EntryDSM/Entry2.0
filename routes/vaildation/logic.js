
exports.vaildationCheck = (req, res) => {
    if(!req.session.key){
        res.writeHead(401, {'Content-Type' : 'text/html;charset=utf8'});
        res.write("<script>alert('권한이 없습니다. 로그인해주세요');</script>");
        res.write("<script>location.href='/public/login.html';</script>");
        res.end();
        return;
    }

    

}