var Letter = require('../models/letter');
var Comment = require('../models/comment');

exports.messages_get = function (req, res) {  //评论获取
    var user = req.session.user;
    if (user) {
        Comment.find({commentTo: user._id}, null, {sort: {'createTime': -1}}, function (error, data) {
            if (error) {
                res.status(500).json('server is worry!')
            }
            res.render('messages.html', {
                user: user,
                comments: data
            })
        });
    } else {
        res.redirect('/login')
    }
};

exports.messages_letter = function (req, res) {  //获取留言
    var user = req.session.user;
    if (user) {
        Letter.find({
            toUserId: user._id
        }, function (error, data) {
            if (error) {
                res.status(500).json('server is worry!')
            }
            res.render('messages.html', {
                user: user,
                letters: data
            })
        });
    } else {
        res.redirect('/login');
    }
};
