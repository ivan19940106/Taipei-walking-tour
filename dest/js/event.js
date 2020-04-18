$(document).ready(function () {



    // $(".lightbox").on("click", function () {
    //     $(".backDrop").animate({ "opacity": ".70" }, 500);
    //     $(".lightbox_holdevent_info").animate({ "opacity": "1.0" }, 500);
    //     $(".backDrop, .lightbox_holdevent_info").css("display", "flex");
    //     $(".step1").addClass('color');

    // });
    // 上下一步
    // ----1------
    // $(".1_nextStep").on("click", function () {
    //     // $(".step1").removeClass('color');
    //     $(".step1").css("background-image", "url(../img/event/event_step3.png)");
    //     $(".holdevent_step1content").css("display", "none");
    //     $(".holdevent_step2content").css("display", "block");
    //     $(".step2").addClass('color');
    // });
    // // ----2------
    // $(".2_backStep").on("click", function () {
    //     $(".step1").addClass('color');
    //     $(".holdevent_step1content").css("display", "block");
    //     $(".holdevent_step2content").css("display", "none");
    //     $(".step2").removeClass('color');
    // });

    // $(".2_nextStep").on("click", function () {
    //     $(".step3").addClass('color');
    //     $(".holdevent_step3content").css("display", "block");
    //     $(".holdevent_step2content").css("display", "none");
    //     $(".step2").removeClass('color');
    // });
    // // ----3------
    // $(".3_backStep").on("click", function () {
    //     $(".step2").addClass('color');
    //     $(".holdevent_step2content").css("display", "block");
    //     $(".holdevent_step3content").css("display", "none");
    //     $(".step3").removeClass('color');
    // });

    // $(".3_nextStep").on("click", function () {

    //     closeBox();
    // });



    // 關閉燈箱
    // function closeBox() {
    //     $(".backDrop,.lightbox_holdevent_info").animate({ "opacity": "0" }, 500);
    //     $(".backDrop,.lightbox_holdevent_info").css("display", "none");

    //     //揪團詳情
    //     $(".backDrop,.lightbox_detailevent_info").animate({ "opacity": "0" }, 500);
    //     $(".backDrop,.lightbox_detailevent_info").css("display", "none");

    //     //檢舉
    //     $(".backDrop,.lightbox_report_info").animate({ "opacity": "0" }, 500);
    //     $(".backDrop,.lightbox_report_info").css("display", "none");

    // }
    // $(".close, .backDrop").on("click", function () {
    //     closeBox();
    // });

    //揪團詳情燈箱
    // $(".lightDetail").on("click", function () {
    //     $(".backDrop").animate({ "opacity": ".70" }, 500);
    //     $(".lightbox_detailevent_info").animate({ "opacity": "1.0" }, 500);
    //     $(".backDrop, .lightbox_detailevent_info").css("display", "block");
    // });
    // //我要報名
    // $(".enroll, .backDrop").on("click", function () {
    //     closeBox();
    // });


    //檢舉揪團燈箱
    // $(".lightReport").on("click", function () {
    //     $(".backDrop").animate({ "opacity": ".70" }, 500);
    //     $(".lightbox_report_info").animate({ "opacity": "1.0" }, 500);
    //     $(".backDrop, .lightbox_report_info").css("display", "block");
    // });
    // // 關閉揪團燈箱
    // $(".enter,.cancel, .backDrop").on("click", function () {
    //     closeBox();
    // });




    //--------------------new event輪播------------------------//

    //調整視窗-抓寬度
    $(window).resize(function () {
        getWidth();
        $('#content').css({
            left: divWidth * index * -1,
            //調整後size圖片位置不會跑掉
        });
    });
    getWidth();

    function getWidth() {

        divWidth = $('#slideBoard').width(); // div的寬度

        imgCount = $('.newSliderBox').length;
        $('#content').width(divWidth * imgCount); // ul的寬度

        $('.newSliderBox').width(divWidth); // li的寬度
    }


    for (let i = 0; i < imgCount; i++) {
        $('#contentButton').append('<li></li>');
    }
    $('#contentButton li:nth-child(1)').addClass('clickMe'); //第一個圈圈先變色

    index = 0;

    //手動輪播
    $('#contentButton li').click(function () {
        //alert($(this).index());
        index = $(this).index();
        $('#content').animate({
            left: divWidth * index * -1,
        });
        $(this).addClass('clickMe');
        $('#contentButton li').not(this).removeClass('clickMe');

    });

    //自動輪播
    function autoPlay() {
        setInterval(function () {
            index++;
            if (index == imgCount) {
                index = 0;
            }
            $('#content').animate({
                left: divWidth * index * -1,
            });

            $(`#contentButton li:nth-child(${index + 1})`).addClass('clickMe');
            $('#contentButton li').not(`#contentButton li:nth-child(${index + 1})`).removeClass('clickMe');
        }, 4000);
    }

    autoPlay();

    //---------------view more 隱藏卡片------------------//

    $(".viewMore").on("click", function () {
        $('.cardBox2').slideDown(1500);

    });

});

//--------------------燈箱出來------------------------//
function $id(id) {
    return document.getElementById(id);
}

// window.addEventListener("load", function () {
//     let holdevent = document.querySelectorAll(".eventEnroll")
//     let lightBoxs = document.querySelectorAll(".backDrop");
//     let closes = document.querySelectorAll(".close");

//     let eventDetails = document.querySelectorAll(".lightDetail");

//     let eventReports = document.querySelectorAll(".dotWrap");
//     let eventReportclose = document.querySelectorAll(".cancel");
//     // 發起揪團

    // for (let i = 0; i < holdevent.length; i++) {

    //     holdevent[i].addEventListener("click", function () {
    //         lightBoxs[i].style.display = "flex";

    //     });
    //     closes[i].addEventListener("click", function () {
    //         lightBoxs[i].style.display = "none";
    //     });
    // }



    //揪團詳情

    // for (let i = 0; i < eventDetails.length; i++) {

    //     eventDetails[i].addEventListener("click", function () {
    //         lightBoxs[1].style.display = "flex";

    //     });
    //     closes[1].addEventListener("click", function () {
    //         lightBoxs[1].style.display = "none";
    //     });
    // }

    //揪團檢舉
    // for (let i = 0; i < eventReports.length; i++) {

    //     eventReports[i].addEventListener("click", function () {
    //         lightBoxs[2].style.display = "flex";

    //     });
    //     eventReportclose[0].addEventListener("click", function () {
    //         lightBoxs[2].style.display = "none";
    //     });
    // }

// });

//-----------------燈箱步驟一選路線slider-----------------//

window.addEventListener("load", function () {
    let curIndex = 0; //先將最左第一張圖標為0號 (依序標記)
    let routeAllBox = document.querySelector(".routeAllBox"); 
    let routeBox = document.querySelectorAll(".routeBox"); 
    //-------------btnRight.onclick
    $id("btnRight").onclick = function () {
        curIndex++;
        routeAllBox.style.left = -50 * curIndex + "%"; //要加單位
        $id("btnLeft").disabled = false // 變可以按
        if (curIndex == (routeBox.length-4)) {
            $id("btnRight").disabled = true; //最左邊圖變5號圖時 btnRight要變不能按 
        }
    }
    //-------------btnLeft.onclick
    $id("btnLeft").onclick = function () {
        curIndex--;
        routeAllBox.style.left = -25 * curIndex + "%"; //要加單位
        $id("btnRight").disabled = false // 變可以按
        if (curIndex == "0") {
            $id("btnLeft").disabled = true; //最左邊圖變0號圖時 btnLeft要變不能按  
        }
    }
    let routeChose = document.querySelectorAll(".routeChose");

});
//-----------------燈箱步驟一選路線下面show出路線名稱+景點-----------------//
$(document).ready(function () {
    // $('.routeChose').click(function () {
    //     let name = $(this).text();
    //     $('.routeClick').text('');
    //     $(`<p>選擇路線:${name}</p>`).appendTo('.routeClick');
    //     //還沒有抓景點...
    // })


    //調整視窗-抓寬度
    // $(window).resize(function () {
    //     getRouteWidth();
    //     $('.sliderWrap').css({
    //         left: routeBoxWidth * curIndex * -1,
    //         //調整後size圖片位置不會跑掉
    //     });
    // });
    // getRouteWidth();

    // function getRouteWidth() {

    //     routeBoxWidth = $('.routeBox').width(); // div的寬度
    //     imgRouteCount = $('.routeBox').length;
    //     $('.sliderWrap').width(routeBoxWidth * imgRouteCount); // ul的寬度

    //     // $('.newSliderBox').width(divWidth); // li的寬度
    // }


    // for (let i = 0; i < imgCount; i++) {
    //     $('#contentButton').append('<li></li>');
    // }
    // $('#contentButton li:nth-child(1)').addClass('clickMe'); //第一個圈圈先變色

    curIndex = 0;
    $('.btnLeft').click(function () {
        curIndex++;
        $('.sliderWrap').animate({

            left: routeBoxWidth * curIndex * 1,

        });
    });

    $('.btnRight').click(function () {
        $('.sliderWrap').animate({
            left: routeBoxWidth * curIndex * -1,
        });

    });
    // $id("btnLeft").onclick = function () {
    //         curIndex--;
    //         routeAllBox.style.left = -25 * curIndex + "%"; //要加單位
    //         $id("btnRight").disabled = false // 變可以按
    //         if (curIndex == "0") {
    //             $id("btnLeft").disabled = true; //最左邊圖變0號圖時 btnLeft要變不能按  
    //         }
    //     }

    //手動輪播
    // $('#contentButton li').click(function () {
    //     //alert($(this).index());
    //     index = $(this).index();
    //     $('#content').animate({
    //         left: divWidth * index * -1,
    //     });
    //     $(this).addClass('clickMe');
    //     $('#contentButton li').not(this).removeClass('clickMe');

    // });
});