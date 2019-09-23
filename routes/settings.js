var User = require('../models/user');

var multer = require('multer');


var headerConfig = multer.diskStorage({
    destination: 'user/headers',
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
});

var upload = multer({storage: headerConfig});

exports.settings_get = function (req, res) {
    var user = req.session.user;
    if (user) {  //如果登陆了才能设置
        User.findOne({
            _id: user._id
        }, function (error, data) {
            if (error) {
                res.status(500).json('server is worry!')
            }
            user.person_introduce = data.person_introduce;
            res.render('settings.html', {
                user: user,
            })
        });
    }else {
        res.redirect('/')
    }

};


exports.settngs_upload = upload.single('filename');
exports.settings_post = function (req, res) {
    var body = req.body;
    var user = req.session.user;
    user.sex = Number(body.sex);
    user.age = Number(body.age);
    user.qq = body.qq;
    user.person_introduce = body.produce;
    if (req.file) {
        user.header_img = req.file.path;
    }
    User.findOne({
        nickname: body.nickname,
        email: {$ne: user.email}
    }, function (err, data) {
        if (err) {
            return res.status(500).send('server error!')
        }
        if (data) {
            res.render('settings.html', {
                user: user,
                tips: '昵称已存在，请重新输入！'
            })
        } else {
            user.nickname = body.nickname;
            User.findByIdAndUpdate({
                _id: user._id
            }, user, function (error) {
                if (error) {
                    console.log('更新失败')
                } else {
                    res.render('settings.html', {
                        user: user,
                        tips: '修改成功'
                    })
                }
            });

        }
    });
};


