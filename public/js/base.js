var li_message = document.getElementById('li_messages');
var menu = document.getElementById('drop_menu');
var li_message2 = document.getElementById('li_messages2');
var menu2 = document.getElementById('drop_menu2');

if (li_message && menu) {
    li_message.onmouseover = function () {
        menu.className = 'show_menu'
    };
    li_message.onmouseout = function () {
        menu.className = 'hidden_menu'
    };
}

if (li_message2 && menu2) {
    li_message2.onmouseover = function () {
        menu2.className = 'show_menu';
    };
    li_message2.onmouseout = function () {
        menu2.className = 'hidden_menu';
    };
}
