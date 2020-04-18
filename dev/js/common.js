// // 引入 login
import ('./loginForFront.js');

// 引入 filter
import ('./filter.js');

// 引入 chatBot
import ('./chatBot.js');

// goTop
$(function () {
    $("#btnGoTop").click(function (e) {
        e.preventDefault();
        $("html,body").animate({ scrollTop: 0 }, 900);
        //$("html,body").animate({scrollTop:0},900,"easeOutBounce");
        return false;
    });
});
// hamburger icon 的切換
    $(function(){
        $("div.hamburger").on("click", function(){
          $(this).toggleClass("is-active");
        });
      
      });
// 導覽列的開關   // 點擊按鈕，選單縮放
$(function(){
  $(".hamburger").on("click", function(){
    $(".hamburgerHeader").toggleClass("showHeader");
  });
  
});


