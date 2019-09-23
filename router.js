var express = require('express');
var router = express.Router();

var register=require('./routes/register'); //引入注册相关路由
var settings=require('./routes/settings'); //引入设置路由
var edit=require('./routes/edit'); //引入写文章路由
var details=require('./routes/details');//引入文章详情路由
var user=require('./routes/user'); //引入用户个人中心路由
var messages=require('./routes/messages'); //引入消息路由
var letter=require('./routes/letter');//引入私信路由
var admin=require('./routes/admin');//引入后台路由

router.get('/test',register.test);

router.get('/',register.home);    //首页

router.get('/register',register.register_get);  //注册

router.post('/register',register.register_post);

router.get('/login',register.login_get);  //登陆

router.post('/login',register.login_post);

router.get('/logout',register.logout);  //退出账号

router.get('/settings',settings.settings_get);  //设置

router.post('/settings',settings.settngs_upload,settings.settings_post);

router.get('/edit',edit.edit_get);  //写文章

router.post('/edit',edit.edit_post);//用户编辑完文章后的post请求

router.get('/update/:aId',edit.edit_update_get);//用户更新文章get

router.post('/blogUpload',edit.edit_single,edit.edit_upload);  //用户文章里面图片上传路由

router.get('/details',details.details_get);  //文章详情

router.get('/comment',details.details_comments);  //获取评论列表

router.post('/details',details.details_post);  //提交评论

router.post('/commentLike',details.comment_like); //提交评论赞

router.get('/user/:id',user.user_get);  //用户个人中心

router.post('/introduce',user.user_introduce_post); //简介提交

router.post('/user/comment',user.user_comment_post); //个人主页获取评论

router.post('/article/del',user.user_article_del); //删除文章

router.post('/comment/del',user.user_comment_del); //删除评论

router.get('/messages',messages.messages_get);  //初始消息页

router.get('/messages/letters',messages.messages_letter);//获取私信

router.post('/letter',letter.letter_post); //发送私信Ajax

router.get('/admin',admin.admin_login_get);  //管理员登陆路由

router.post('/admin',admin.admin_login_post); //管理员登陆提交

router.get('/background',admin.background_get); //后台初始页

router.get('/admin/logout',admin.background_logout); //管理员退出登陆

router.post('/background/del/user',admin.background_del_user); //删除用户

router.post('/background/update/user',admin.background_update_user);//更新用户state

router.get('/background/article',admin.background_article_get); //获取文章列表

router.post('/background/del/article',admin.background_article_post);//管理员删除文章

router.get('/background/comment',admin.background_comment_get); //获取评论列表

router.post('/background/del/comment',admin.background_comment_post);//管理员删除评论

module.exports = router;
