


/*获取一个dom对象的当前属性值*/
function getStyle(obj,name) { //obj为dom对象，name为要获取的属性名
    if(window.getComputedStyle){  //正常浏览器的方式
        return getComputedStyle(obj, null)[name];
    }
    else{ //兼容IE8
        return obj.currentStyle[name];
    }
}


/*执行一个动画效果
* obj:（对象）要执行动画的dom对象
* attr：（字符串）要执行动画的样式，比如left，top，width，height...
* target:（整数）执行动画的目标位置
*speed：（整数）执行动画的速度
* callback：(回调函数)(可选)动画执行完成后要执行的函数
**/
function move(obj, attr, target, speed, callback) {
    var current = parseInt(getStyle(obj, attr)); //获取当前要执行动画样式的属性值
    if (current > target) {       //判断当前位置和动画目标位置的关系，从而改变speed正负来确定移动的方向
        speed = -speed;
    }
    clearInterval(obj.timer);     //清除本对象的上一次定时器，将timer设置为obj的一个属性，防止多个对象的定时器混乱
    obj.timer = setInterval(function () {
        var oddValue = parseInt(getStyle(obj, attr));  //获取旧值
        var newValue = oddValue + speed;               //计算移动的新值
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {  //边界判断
            newValue = target;
        }
        obj.style[attr] = newValue + 'px';      //将新值赋值给对象的属性
        if (newValue === target) {   //到达设定的目标
            clearInterval(obj.timer);   //清除定时器
            callback && callback();     //动画完成后启用回调函数，并设置为可选
        }
    }, 30)
}

/*与className增删改相关的操作 */
function addClass(obj, pro) {  //添加一个class
    if (!hasClass(obj, pro)) {  //先判断是否已经含有了要添加的class，如果没有则添加，防止重复添加
        obj.className += ' ' + pro;
    }
}

function hasClass(obj, pro) {  //检测一个对象中是否含有某个class值
    //正则表达式 /\bxxx\b/ 表示xxx是一个完整的词 ，不包含于其它字符串中
    var reg = new RegExp('\\b' + pro + '\\b');
    return reg.test(obj.className)
}

function removeClass(obj, pro) { //删除一个class值
    var reg = new RegExp('\\b' + pro + '\\b');
    obj.className = obj.className.replace(reg, '')  //直接用空字符串替代
}

function toggleClass(obj, pro) {  //切换class，如果有就删除，没有就添加
    if (hasClass(obj, pro)) {
        removeClass(obj, pro)
    } else {
        addClass(obj, pro)
    }
}
