var showPage=(function (){
    var pageIndex=0;//当前页面索引
    var nextIndex=null;//下一页面索引
    var pages=$$(".page_container .page");//获取所有page元素

    /*
    *静止状态函数
    * */
    function setStatic() {
        nextIndex=null;
        for (var i=0;i<pages.length;i++){
            var page=pages[i];
            if (i===pageIndex)
                page.style.zIndex=1;
            else
                page.style.zIndex=10;
            page.style.top=(i-pageIndex)*height()+"px";
        }
    }

    setStatic();

    /*
    * 移动中
    * */
    function moving(dis) {
        for (var i=0;i<pages.length;i++){
            var page=pages[i];
            if (i!==pageIndex)
                page.style.top=(i-pageIndex)*height()+dis+"px";
        }
        //手指往下滑动，且不是第一页
        if (dis > 0 && pageIndex > 0)
            nextIndex=pageIndex-1;
        //手指往上滑动，且不是最后一页
        else if (dis < 0 && pageIndex < pages.length-1)
            nextIndex=pageIndex+1;
        //如果为第一页或最后一页则不动
        else
            nextIndex=null;
    }

    /*
    * 移动完成
    * */
    function finishMove() {
        //如果不动，则保持静止，复位
        if (nextIndex===null){
            setStatic();
            return;
        }
        var nextPage=pages[nextIndex];//获取下一页面信息
        nextPage.style.transition=".5s"; //设置500ms的过渡
        nextPage.style.top=0;
        setTimeout(function () {
            pageIndex=nextIndex;
            nextPage.style.transition="";
            setStatic();
        },500)
    }

    /*
    * 设置手指点击事件
    * */
    var pageContainer=$(".page_container");
    pageContainer.ontouchstart=function (e) {
        var y=e.touches[0].clientY;
        pageContainer.ontouchmove=function (e) {
            var dis=e.touches[0].clientY-y;
            moving(dis);
        };
        pageContainer.ontouchend=function () {
            finishMove();
            pageContainer.ontouchmove=null;
        };
    };

    // 自动切换到某个板块
    // index: 页面索引
    function showPage(index) {
        var nextPage = pages[index]; //下一个页面元素
        if (index < pageIndex) {
            // 下一个页面在当前页面上面
            nextPage.style.top = -height() + "px";
        } else if (index > pageIndex) {
            // 下一个页面在当前页面下面
            nextPage.style.top = height() + "px";
        } else {
            // 下一个页面就是当前页面
            if (pageIndex === 0) {
                // 目前是第一个页面
                pageIndex++;
            } else {
                pageIndex--;
            }
            setStatic(); // 重新设置位置
        }
        // 强行让浏览器渲染
        nextPage.clientHeight; // 读取dom的尺寸和位置，会导致浏览器强行渲染
        nextIndex = index; // 设置下一个页面索引
        finishMove();
    }
    return showPage;
}());
