var User = require('../models/user');
var Article = require('../models/article');
var Comment = require('../models/comment');
var CommentLike = require('../models/commentLike');
exports.user_get = function (req, res) {
    var param = req.params; //获取路由参数
    var user = req.session.user;
    User.findOne({
        _id: param.id
    }, function (error, data) {
        if (error) {
            res.status(500).json('server is worry!')
        }
        Article.find({
            authorId: param.id
        }, null, {sort: {'createTime': -1}}, function (error, data2) {
            if (error) {
                res.status(500).json('server is worry!')
            }
            res.render('user.html', {
                user: user,
                u: data,
                articles: data2
            })
        });
    });
};

exports.user_introduce_post = function (req, res) {//post提交个人简介
    var user = req.session.user;
    var body = req.body;
    User.findByIdAndUpdate({
        _id: user._id
    }, {person_introduce: body.content}, function (error, date) {
        if (error) {
            res.status(500).json('server is worry');
        }
        res.status(200).json({
            tips: '1'
        })
    });
};

exports.user_comment_post = function (req, res) {  //个人主页评论的ajax获取
    var body = req.body;
    Comment.find({userId: body.uId}).populate('articleID').exec(function (error, data) {
        if (error) {
            res.status(500).json('server is worry!')
        }
        res.status(200).json({
            comment: data,
        });
    });
};

exports.user_article_del = function (req, res) { //删除文章
    var body = req.body;
    Article.deleteOne({
        _id: body.aId
    }, function (error, data) { //删除文章
        if (error) {
            res.status(500).json('server is worry')
        }
        Comment.deleteMany({ //删除文章的所有评论
            articleId: body.aId
        }, function (error, data2) {
            if (error) {
                res.status(500).json('server is worry')
            }
            res.status(200).json({
                tips: 1
            })
        });
    })
};

exports.user_comment_del = function (req, res) {
    var body = req.body;
    Comment.deleteOne({ //删除评论
        _id: body.cId
    }, function (error, data) {
        if (error) {
            res.status(500).json('server is worry!')
        }
        CommentLike.deleteMany({  //删除评论对应的点赞
            commentId: body.cId
        }, function (error, data2) {
            if (error) {
                res.status(500).json('server is worry!')
            }
            Article.findByIdAndUpdate({ //更新文章对应的评论数
                _id: body.aId
            }, {$inc: {commentNumber: -1}}, function (error, data3) {
                if (error) {
                    res.status(500).json('server is worry!')
                }
                res.status(200).json('ok');
            });
        });
    });
};
