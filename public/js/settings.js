
var tips = document.getElementById('tips');
var btn = document.getElementById('btn');
var span=document.getElementById('tips_text');

if(btn){
    btn.onclick = function () {
        tips.style.display = 'none';
    };
}

setTimeout(function () {
    if(span){
        if( span.innerText!==''){
            tips.style.display='none'
        }
    }
},3000);
