$(document).ready(function (){ 

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


});

