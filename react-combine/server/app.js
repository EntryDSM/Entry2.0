var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.resolve(__dirname,'..','build')));

app.get('/api/Hello',(req,res)=>{
    res.send('Hello world!');
});

app.get('/api/World',(req,res)=>{
    res.send('This is Hello world!!');
});

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'..','build','index.html'));
});

module.exports = app;