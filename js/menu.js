(function () {
    var menuSwitch= $(".menu_switch");
    var nav= $(".menu_nav");
    function toggleNav() {
        menuSwitch.classList.toggle("menu_switch--expand");
        nav.classList.toggle("menu_nav--expand");
    }
    menuSwitch.onclick=toggleNav;
    nav.addEventListener("click",toggleNav);
}())