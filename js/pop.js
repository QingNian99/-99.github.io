var showPop=(function () {
    //实现弹窗效果
    function showPop(id) {
        $("#"+id).style.display="";
    }

    var close=$$(".pop_close");
    for (var i=0;i<close.length;i++){
        close[i].onclick=function(){
            this.parentElement.parentElement.style.display="none";
        }//差点用了闭包，即close[i]，犯了那个经典错误
    }

    var vx=$(".pop_wx");
    var qq=$(".pop_qq");
    vx.onclick=function () {
        vx.classList.add("selected");
        qq.classList.remove("selected");
    }
    qq.onclick=function () {
        qq.classList.add("selected");
        vx.classList.remove("selected");
    }
    return showPop;
}());
