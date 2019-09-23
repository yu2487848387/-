var E = window.wangEditor;
var editor = new E('#editor');


editor.customConfig.uploadImgServer = '/blogUpload';
editor.customConfig.debug = true;
editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024;
editor.customConfig.uploadImgMaxLength = 5;
editor.customConfig.uploadFileName = 'myPic';
editor.customConfig.uploadImgHeaders = {
    'authorization': 'Bearer ' + localStorage.token,
    'enctype': 'multipart/form-data'
};
editor.customConfig.uploadImgHooks = {
    success: function (xhr, editor, result) {
        //console.log('图片上传并返回结果,图片插入成功')
    },
    fail: function (xhr, editor, result) {
        //console.log('图片上传并返回结果，但图片插入错误')
    },
    error: function (xhr, editor) {
        //console.log('图片上传出错')
    },
    timeout: function (xhr, editor) {
        //console.log('图片上传超时')
    },
    customInsert: function (insertImg, result, editor) {
        //console.log(' 图片上传并返回结果');
        var url = result.url;
        insertImg(url);
    }
};
editor.create();


$('#form_data').on('submit', function (e) {  //发表文章
    e.preventDefault();
    $.each($('img'), function (index, value) {
        if ($('img').eq(index).attr('src').slice(0, 1) !== '/') { //如果图片前面没有/
            var src = '/' + $('img').eq(index).attr('src');
            $('img').eq(index).attr('src', src);
        }
    });
    var title = $(this).serializeArray();
    var content = editor.txt.html();
    if (editor.txt.text() === '') {       //判断内容是否为空
        $("#tips").text('内容不能为空！');
        $("#tips").slideDown(500, function () {
            setTimeout(function () {
                $("#tips").slideUp(500)
            }, 2000)
        })
    } else {
        var form_data = {
            title: title[0].value,
            content: content,
            flag: $('#tem').attr('flag'),
            aId: $('#tem').attr('aId')
        };
        $.ajax({
            url: '/edit',
            type: 'post',
            data: form_data,
            dateType: 'json',
            success: function (data) {
                if (data.tips === '0') {
                    $("#tips").text('你已被禁止发表文章！');
                    $("#tips").slideDown(500, function () {
                        setTimeout(function () {
                            $("#tips").slideUp(500)
                        }, 2000)
                    })
                } else if (data.tips === '1') {
                    window.location = '/'
                }
            }
        })
    }
});

if ($('#tem').attr('flag') === '1') {  //如果flag=1为编辑文章,设置标题和文本输入框内容
    var htmlTem = $('#tem_content').text();
    editor.txt.html(htmlTem);
    var Title = $('#tem_title').text();
    $('#Title').val(Title)
}

