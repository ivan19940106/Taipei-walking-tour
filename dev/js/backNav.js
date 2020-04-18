//後台 手機板選單收合
window.addEventListener("load",function(){
    $("#sideNavBtn").click(function(){
        $(".sideNav").toggleClass("-sideNavOn");
        $(".arrow").toggleClass("-turnArrow");
    })
})