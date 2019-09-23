
/*banner图*/
var imgs = ['../public/img/year1.jpg', '../public/img/year2.jpg', '../public/img/year3.jpg', '../public/img/year4.jpg'];
var imgList = document.getElementById('banner_img'); //图片
var img_points = document.querySelectorAll('.banner .imgPoint a'); //底边point
var both_side = document.querySelectorAll('.banner .imgBoth');//两边切换
var img_index = 0;
var timer;
var kk = 0;

//定时器
function banner() {
    clearInterval(timer);
    timer = setInterval(function () {
        clearPoint();
        //console.log(img_index);
        kk = img_index;
        imgList.src = imgs[img_index];
        img_points[img_index].className = 'point_current';
        img_index++;
        if (img_index > 3) {
            img_index = 0
        }
    }, 3000);
}

//遍历清除所有point的背景
function clearPoint() {
    for (var p = 0; p < img_points.length; p++) {
        if (img_points[p].className === 'point_current') {
            img_points[p].className = ''
        }
    }
}

//点击point
for (let i = 0; i < img_points.length; i++) {
    img_points[i].onmousedown = function () {
        clearInterval(timer);
        imgList.src = imgs[i];
        img_index = i;
        clearPoint();
        img_points[i].className = 'point_current'
    };
    img_points[i].onmouseup = function () {
        banner();
    }
}

//两边切换
for (let j = 0; j < both_side.length; j++) {
    both_side[j].onmousedown = function () {
        clearInterval(timer);
        if (j === 0) {
            if (kk === 0) {
                img_index = 3;
                kk = 3;
            } else {
                img_index = kk - 1;
                kk = kk - 1;
            }
        } else {
            if (kk === 3) {
                img_index = 0;
                kk = 0;
            } else {
                img_index = kk + 1;
                kk = kk + 1;
            }
        }
        imgList.src = imgs[img_index];
        clearPoint();
        img_points[img_index].className = 'point_current';
    };
    both_side[j].onmouseup = function () {
        banner()
    };
}
imgList.onmouseover = function () {
    clearInterval(timer)
};
imgList.onmouseout = function () {
    banner()
};
//初始化
banner();
img_points[0].className = 'point_current';

/*banner图*/
