var User = require('../models/user');
var Letter = require('../models/letter');


exports.letter_post = function (req, res) {
    var user = req.session.user;
    var body = req.body;
    User.findOne({_id: user._id}, function (error, data) {
        if (error) {
            res.status(500).json('server is worry!')
        }
        body.fromUserId = user._id;
        body.toUserId = body.uId;
        body.fromNickname = data.nickname;
        body.fromHeader_img = data.header_img;
        var letter = new Letter(body);
        letter.save(function (error, data1) {
            if (error) {
                res.status(500).json('server is worry!')
            }
            res.status(200).json({
                tips: 'ok'
            })
        })
    });
};
