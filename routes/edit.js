var User = require('../models/user');
var Article = require('../models/article');
var multer = require('multer');


var headerConfig = multer.diskStorage({
    destination: 'user/blog_imgs',
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
});
var upload = multer({storage: headerConfig});

exports.edit_get = function (req, res) { //发表文章get
    var user = req.session.user;
    if (user) {
        res.render('edit.html', {
            flag: 0,
            aId: ''
        })
    } else {
        res.redirect('/login')
    }
};

exports.edit_post = function (req, res) {  //用户编辑完文章后通过ajax提交请求
    var user = req.session.user;
    var body = req.body;
    body.authorId = user._id;
    body.authorName = user.nickname;
    body.authorID = user._id;
    var imgUrlFun = function (str) { //提取第一张图片
        var data = '';
        str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
            data = capture;
        });
        return data
    };
    var filterHTMLTag = function (str) {  //提取摘要
        str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
        str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
        str = str.replace(/&nbsp;/ig, '');
        str = str.replace(/ /ig, '');//去掉
        body.wordNumber = str.length;
        return str.substring(0, 70);
    };
    body.abstract = filterHTMLTag(body.content);
    body.firstImg = imgUrlFun(body.content);

    if (body.flag === '0') { //正常发表文章
        if (user.state === 3) { //被禁止发表文章
            res.status(200).json({
                tips: '0'
            })
        } else {    //正常发表成功
            var article = new Article(body);
            article.save(function (error, data) {
                if (error) {
                    return res.status(500).send('server error!')
                }
                res.status(200).json({
                    tips: '1'
                })
            });
        }
    }
    if (body.flag === '1') { //编辑更新文章
        Article.findByIdAndUpdate({
            _id: body.aId
        }, body, function (error, data1) {
            if (error) {
                return res.status(500).send('server error!')
            }
            res.status(200).json({
                tips: '1'
            })
        })
    }

};

exports.edit_update_get = function (req, res) {  //更新文章get
    var aId = req.params.aId;
    Article.findOne({_id: aId}, function (error, data) {
        if (error) {
            res.status(500).json('server is worry')
        }
        res.render('edit.html', {
            article: data,
            flag: 1,
            aId: aId
        });
    });
};

exports.edit_single = upload.single('myPic');  //用户文章里面上传图片处理
exports.edit_upload = function (req, res) {
    res.status(200).json({
        url: req.file.path
    })
};
