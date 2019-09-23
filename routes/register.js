var User = require('../models/user');
var Article = require('../models/article');
var md5 = require('blueimp-md5');//引入md5对密码加密


exports.home = function (req, res) {
    var user = req.session.user;
    Article.find({}, null, {sort: {'createTime': -1}}, function (error, data) {
        if (error) {
            return res.status(500).send('server error!')
        }
        res.render('index.html', {
            user: user,
            articles: data
        })
    });
};

exports.register_get = function (req, res) {
    res.render('register.html')
};

exports.register_post = function (req, res) {
    var body = req.body;
    User.findOne({
        $or: [
            {email: body.email},
            {nickname: body.nickname}
        ]
    }, function (err, data) {
        if (err) {
            return res.status(500).send('server error!')
        }
        if (data) {
            res.status(200).json({
                tips_type: 0
            });
        } else {
            body.password = md5(body.password);
            var user = new User(body);
            user.save(function (err, data) {
                if (err) {
                    return res.status(500).send('server error!')
                }
                req.session.user = data;
                res.status(200).json({
                    tips_type: 1
                });
            });
        }
    });
};

exports.login_get = function (req, res) {
    res.render('login.html')
};

exports.login_post = function (req, res) {
    var body = req.body;
    var password = md5(body.password);
    User.findOne({
        email: body.email,
        password: password
    }, function (err, data) {
        if (err) {
            return res.status(500).send('server error!')
        }
        if (data) {
            if (data.state !== 2) { //正常登陆
                req.session.user = data;
                res.status(200).json({tips_type: 1})
            }
            if (data.state === 2) {  //账号被冻结
                res.status(200).json({tips_type: 2})
            }
        } else {  //账号密码错误
            res.status(200).json({tips_type: 0})
        }
    })
};

exports.logout = function (req, res) {
    req.session.user = null;
    res.redirect('/')
};


exports.test = function (req, res) {
    var obj={name:'yu',age:18};
    res.status(200).json(obj);
};


