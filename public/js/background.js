function del(obj) {
    var con = confirm('你确定要删除该用户吗?');
    if (con) {
        var uId = {
            uId: $(obj).attr('uId')
        };
        $.ajax({
            url: '/background/del/user',
            type: 'post',
            data: uId,
            dateType: 'json',
            success: function (data) {
                location.reload();
            }
        })
    }
}

$(".form-control").change(function(){
    var option=$(this);
    var infor={
        uId:option.attr('uId'),
        state:option.val()
    };
    $.ajax({
        url: '/background/update/user',
        type: 'post',
        data: infor,
        dateType: 'json',
        success: function (data) {
            location.reload();
        }
    })
});

$.each($(".form-control"),function (index,value) {
    $(".form-control").eq(index).val($(".form-control").eq(index).attr('state'))
});

function del2(obj) {  //删除文章
    var con2 = confirm('你确定要删除该文章吗?');
    if (con2) {
        var aId = {
            aId: $(obj).attr('aId')
        };
        $.ajax({
            url: '/background/del/article',
            type: 'post',
            data: aId,
            dateType: 'json',
            success: function (data) {
                location.reload();
            }
        })
    }
}

function del3(obj) {  //删除评论
    var con3 = confirm('你确定要删除该评论吗?');
    if (con3) {
        var cId = {
            cId: $(obj).attr('cId')
        };
        $.ajax({
            url: '/background/del/comment',
            type: 'post',
            data: cId,
            dateType: 'json',
            success: function (data) {
                location.reload();
            }
        })
    }
}
