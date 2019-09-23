var express = require('express');
var bodyParse = require('body-parser');
var router = require('./router');
var session=require('express-session');
var app = express();

app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

app.use('/public/', express.static('./public/'));
app.use('/user/', express.static('./user/'));
app.use('/views/', express.static('./views/'));
app.use('/node_modules/', express.static('./node_modules/'));
app.engine('html', require('express-art-template'));

app.use(session({ //配置使用session
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

app.use(router);

app.listen(3000, function () {
    console.log("success...")
});
