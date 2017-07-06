var tes

app.get ('/test',function(req,res){
    tes = Math.floor((Math.random() * 10) + 1);
    console.log(tes);
})

app.get('/test/:te',function(req,res){
    var te = req.params.te;
    console.log(te);
    if(tes==te){
        console.log('같음');
    }
})
이런식으로 변수를 전역변수로 선언하고 메일 보내는 함수에서 전역변수에 값을 부여하고 비교를 해주면 값이 같게 나온다