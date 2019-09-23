var User = require('../models/user');
var Article = require('../models/article');
var Comment = require('../models/comment');
var CommentLike = require('../models/commentLike');

exports.details_get = function (req, res) {
    var user = req.session.user;
    Article.findOne({  //查找文章
        _id: req.query.article
    }, function (error, data1) {
        if (error) {
            res.status(500).json('server worry!')
        }
        User.findOne({  //查找文章的作者
            _id: data1.authorId
        }, function (error, data2) {
            if (error) {
                res.status(500).json('server worry!')
            }
            res.render('details.html', {
                Article: data1,
                //authorImg: data2.header_img,
                author: data2,
                user: user,
            })
        });
    });
};

exports.details_comments = function (req, res) {  //获取评论列表
    var user = req.session.user;
    Comment.find({
        articleId: req.query.articleId
    }, null, {sort: {'createTime': -1}}, function (error, data1) {
        if (error) {
            res.status(500).json('server is worry!')
        }
        if (user) {
            CommentLike.find({
                userId: user._id
            }, function (error, data2) {
                if (error) {
                    res.status(500).json('server is worry!')
                }
                for (var i = 0; i < data1.length; i++) {
                    for (var j = 0; j < data2.length; j++) {
                        if (data1[i].id === data2[j].commentId) {
                            data1[i].flag = '1';
                        }
                    }
                }
                res.status(200).json({
                    comment: data1
                })
            });
        } else {
            res.status(200).json({
                comment: data1
            })
        }
    });
};

exports.details_post = function (req, res) {  //提交评论后处理
    var user = req.session.user;
    var body = req.body;
    body.userId = user._id;
    body.userName = user.nickname;
    body.userHeaderImg = user.header_img;
    body.articleID = body.articleId;
    if (user.state === 4) {
        res.status(200).json({
            tips: '0'
        });
    } else {
        var comment = new Comment(body);
        comment.save(function (error, data1) {
            if (error) {
                res.status(500).json('server is worry!')
            }
            Article.findByIdAndUpdate({_id: body.articleId}, {$inc: {commentNumber: 1}}, function (error, data2) {
                if (error) {
                    res.status(500).json('server is worry!')
                }
                res.status(200).json({
                    tips: data1
                });
            });
        });
    }
};

exports.comment_like = function (req, res) { //点赞
    var body = req.body;
    var user = req.session.user;
    if (!user) {
        res.status(200).json({
            flag: 0 //未登陆就点赞
        });
    } else {
        body.userId = user._id;
        if (body.LikesFlag === '-1') {
            var commentlike = new CommentLike(body);
            commentlike.save(function (error, data) {
                if (error) {
                    res.status(500).json('server is worry!')
                }
                Comment.findByIdAndUpdate({
                    _id: body.commentId
                }, {$inc: {likes: 1}}, function (error, data2) {
                    if (error) {
                        res.status(500).json('server is worry!')
                    }
                    res.status(200).json({
                        flag: 1,
                        tips: 'hello'
                    })
                });
            });
        } else if (body.LikesFlag === '1') {
            CommentLike.deleteOne({
                commentId: body.commentId,
                userId: user._id
            }, function (error, data) {
                if (error) {
                    res.status(500).json('server is worry!')
                }
                Comment.findByIdAndUpdate({
                    _id: body.commentId
                }, {$inc: {likes: -1}}, function (error, data2) {
                    if (error) {
                        res.status(500).json('server is worry!')
                    }
                    body.LikesNum = parseInt(body.LikesNum) - 1;
                    res.status(200).json({
                        flag: -1,
                        tips: 'hello'
                    })
                });
            })
        }
    }
};


