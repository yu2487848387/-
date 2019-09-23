$('#edit').on('click', function () {
    $('#userEdit').css('display', 'block');
    $('#showIntroduce').css('display', 'none')
});

var PERSON = $('#PERSON');

$('#cancel').on('click', function () {
    $('#userEdit').css('display', 'none');
    $('#showIntroduce').css('display', 'block')
});

$('#editSave').on('click', function () {  //提交个人简介ajax
    var Ptext = $("#editIntroduce");
    var showIntroduce = $('#showIntroduce');
    var introduce = {
        content: Ptext.val()
    };
    $.ajax({
        type: "post",
        url: "/introduce",
        data: introduce,
        dataType: "json",
        success: function (data) {
            showIntroduce.text(Ptext.val());
            Ptext.val(Ptext.val());
            $('#userEdit').css('display', 'none');
            $('#showIntroduce').css('display', 'block')
        }
    });
});


$('#Comment').on('click', function (event) {  //获取评论ajax
    event.preventDefault();
    var aList = $('.contain .left .userItem a');
    var u = aList.eq(1).attr('u'); //获取用户的id
    var state = {
        uId: u
    };
    $.ajax({
        type: "post",
        url: "/user/comment",
        data: state,
        dataType: "json",
        success: function (data) {
            aList.each(function (index, value) {
                aList.eq(index).removeClass('active');
            });
            aList.eq(1).addClass('active');
            $('#BlogContent').css('display', 'none');
            $('#CommentContent').css('display', 'block');
            var html = template('user_comment', data);
            $('#CommentContent').html(html);
            if (PERSON.attr('other') === PERSON.attr('my')) {  //判断是否访问自己的主页的评论，显示删除按钮
                $('.commentDel').css('display', 'inline');
            }
        }
    });
});


if (PERSON.attr('other') === PERSON.attr('my')) {//判断进入是自己的个人主页还是别人的
    $('.myEdit').css('display', 'inline'); //显示编辑，删除功能
    $('#edit').css('display', 'block');
}


function myDelete(obj) {  //删除文章
    var result = confirm('确定要删除这篇文章吗？');
    if (result) {
        var aId = $(obj).attr('aId');
        var text = {
            aId: aId
        };
        $.ajax({
            type: "post",
            url: "/article/del",
            data: text,
            dataType: "json",
            success: function (data) {
                location.reload();
            }
        });
    }
}

function myCommentDelete(obj) {  //删除评论
    var result = confirm('确定要删除这条评论吗？');
    if (result) {
        var comment = $(obj);
        var text = {
            cId: comment.attr('cId'),
            aId: comment.attr('aId')
        };
        $.ajax({
            type: "post",
            url: "/comment/del",
            data: text,
            dataType: "json",
            success: function (data) {
                $('#Comment').trigger('click');//自动触发点击事件
            }
        });
    }
}


$('.sendCancel').click(function () { //关闭私信
    $('.send').stop().fadeOut(200);
});

$('.message').click(function () {
    if ($('#PERSON').attr('my') === '0000') {  //用户未登陆点击发私信
        location.href = '/login'
    } else {
        $('.send').stop().fadeIn(200);
    }
});

$('.sendLetter').click(function () {
    var Person = $('#PERSON');
    var content = $('.sendContent');
    if (content === '') {
        alert('私信内容不能为空！')
    } else {
        var text = {
            uId: Person.attr('other'),
            content: content.val()
        };
        $.ajax({
            type: "post",
            url: "/letter",
            data: text,
            dataType: "json",
            success: function (data) {
                alert('发送成功...');
                $('.send').stop().fadeOut(200);
                content.val('');
            }
        });
    }
});
