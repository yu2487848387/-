$(function () {       //设置缓慢回到顶部
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $(".first_side").css('display', 'inline-block')
        } else {
            $(".first_side").fadeOut();
        }
    });
    $(".first_side").click(function () {
        if ($(window).scrollTop() > 0) {
            $("html,body").stop().animate({scrollTop: 0}, 600);
        }
    });
});

$('#comment').on('click', function () {
    $('#comment_bottom').css('display', 'block')
});
$('#cancel').on('click', function () {
    $('#comment_bottom').css('display', 'none')
});

var comments; //评论列表


$('#submit').on('click', function (e) { //提交评论ajax
    var textarea = $('#comment');
    var comment_text = textarea.val();
    textarea.val(''); //提交后清空输入框
    var commentForm = {
        content: comment_text,
        articleId: $('#articleId').text(),
        commentTo: $('#articleId').attr('uId')
    };
    $.ajax({
        url: '/details',
        type: 'post',
        data: commentForm,
        dateType: 'json',
        success: function (data) {
            if (data.tips === '0') {
                alert('你被禁止评论！')
            } else {
                comments.comment.unshift(data.tips); //更新评论，重新渲染
                var html2 = template('user_comment', comments);
                $('#comment_list').html(html2);
            }
        }
    })
});


var articleText = {
    articleId: $('#articleId').text()
};
$.ajax({  //初始化获取评论列表
    type: "get",
    url: "/comment",
    data: articleText,
    dataType: "json",
    success: function (data) {
        comments = data;
        var html = template('user_comment', data);
        $('#comment_list').html(html);
    }
});


function commentLike(obj) {
    var commentId = $(obj).attr("commentId");
    var spanLike = $(obj).children('.likesNum');
    var spanIconTrue = $(obj).children('#redTrue');
    var spanIconFalse = $(obj).children('#redFalse');
    var commentText = {
        commentId: commentId,
        LikesFlag: spanLike.attr('likesFlag')
    };
    $.ajax({
        type: "post",
        url: "/commentLike",
        data: commentText,
        dataType: "json",
        success: function (data) {
            if (data.flag === 0) {
                window.location = '/login'
            } else if (data.flag === 1) {
                spanLike.text(parseInt(spanLike.text()) + 1);
                spanLike.attr('likesFlag', '1');
                spanIconTrue.toggleClass('red');
                spanIconFalse.toggleClass('red')
            } else if (data.flag === -1) {
                spanLike.text(parseInt(spanLike.text()) - 1);
                spanLike.attr('likesFlag', '-1');
                spanIconTrue.toggleClass('red');
                spanIconFalse.toggleClass('red')
            }
            $.ajax({  //每次点赞更新评论列表，防止新评论出现点赞消失bug
                type: "get",
                url: "/comment",
                data: articleText,
                dataType: "json",
                success: function (data) {
                    comments = data;
                }
            });
        }
    });
}

