//---------------
//----首頁專用----  往下Scroll才出現Nav bar
//---------------

var header_active = function () {
    var scroll_top = $(window).scrollTop();
    $("p.-pos").html(scroll_top);
    if (scroll_top >= 1) {
        $(".fullHeader").addClass("showHeader");
    } else {
        $(".fullHeader").removeClass("showHeader");
    }
};

$(function () {
    $(window).scroll(function () {
        header_active();
    });
});