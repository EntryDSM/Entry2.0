var fs = require('fs');

fs.readFile('./public/login.html','utf8',(err, data)=>{
    let replaced = data.replace('blank','test');
    console.log(replaced);
})