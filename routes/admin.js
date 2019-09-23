var Adminer = require('../models/admin');
var User = require('../models/user');
var Article = require('../models/article');
var Comment = require('../models/comment');
var Letter = require('../models/letter');
exports.admin_login_get = function (req, res) {  //管理员登陆页获取
    res.render('admin.html')
};

exports.admin_login_post = function (req, res) {  //管理员登陆提交
    var body = req.body;
    Adminer.findOne({
        adminName: body.username,
        adminPassword: body.password
    }, function (error, data) {
        if (error) {
            res.status(500).json('server is worry')
        }
        if (data) {
            req.session.admin = data;
            res.redirect('/background')
        } else {
            res.render('admin.html', {
                tips: '用户名或者密码错误'
            })
        }
    });
};

exports.background_get = function (req, res) {  //后台初始页
    var admin = req.session.admin;
    if (!admin) {
        res.redirect('/admin')
    } else {
        User.find({}, function (error, data) {
            if (error) {
                res.status(500).json('server is worry!')
            }
            res.render('background.html', {
                admin: admin,
                users: data
            })
        });
    }
};

exports.background_logout = function (req, res) { //管理员退出登陆
    req.session.admin = null;
    res.redirect('/admin')
};

exports.background_del_user = function (req, res) {  //删除用户
    var body = req.body;
    User.deleteOne({_id: body.uId}, function (error, data1) {
        if (error) {
            res.status(500).json('server is worry!')
        }
        Article.deleteMany({authorId: body.uId}, function (error, data2) {
            if (error) {
                res.status(500).json('server is worry!')
            }
            Comment.deleteMany({userId: body.uId}, function (error, data3) {
                if (error) {
                    res.status(500).json('server is worry!')
                }
                Letter.deleteMany({fromUserId: body.uId}, function (error, data4) {
                    if (error) {
                        res.status(500).json('server is worry!')
                    }
                    res.status(200).json('ok')
                })
            })
        })
    });
};

exports.background_update_user = function (req, res) { //更新用户状态
    var body = req.body;
    User.findByIdAndUpdate({
        _id: body.uId
    }, {state: parseInt(body.state)}, function () {
        res.status(200).json('ok')
    });
};

exports.background_article_get = function (req, res) {  //文章列表初始化
    var admin = req.session.admin;
    Article.find({}, function (error, data) {
        if (error) {
            res.status(200).json('server is worry!')
        }
        res.render('background.html', {
            admin: admin,
            article: data
        })
    });
};

exports.background_article_post = function (req, res) { //删除文章
    var body = req.body;
    Article.deleteOne({_id: body.aId}, function (error, data) {
        if (error) {
            res.status(200).json('server is worry!')
        }
        Comment.deleteMany({articleId: body.aId}, function (error, data2) {
            if (error) {
                res.status(200).json('server is worry!')
            }
            res.status(200).json('ok')
        })
    });
};

exports.background_comment_get = function (req, res) {  //评论列表初始化
    var admin = req.session.admin;
    Comment.find({}, function (error, data) {
        if (error) {
            res.status(200).json('server is worry!')
        }
        res.render('background.html', {
            admin: admin,
            comment: data
        })
    });
};

exports.background_comment_post = function (req, res) { //删除评论
    var body = req.body;
    Comment.deleteOne({_id: body.cId}, function (error, data) {
        if (error) {
            res.status(200).json('server is worry!')
        }
        res.status(200).json('ok');
    });
};
