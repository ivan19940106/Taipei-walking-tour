$(document).ready(function(){
    var search = '台北';
    var source = `http://maps.google.com?output=embed&q=${search}`;
    $('#google-map').attr('src', source);
    //game
    //route tab
    $('.option').click(function(e){
        $('.option .label').addClass('hide-label');
        $(this).find('.label').toggleClass('hide-label');
        if($(this).find('.route-name').text() == '日式舊屋行'){
            $('.map').replaceWith('<img src="./img/mapgame/map.jpg" alt="" class="map">');
        } else if($(this).find('.route-name').text() == '文青品味旅'){
            $('.map').replaceWith('<img src="./img/mapgame/map1.jpg" alt="" class="map">');
        } else if($(this).find('.route-name').text() == '職人散步去'){
            $('.map').replaceWith('<img src="./img/mapgame/map2.jpg" alt="" class="map">');
        }
    });
    //Start button
    $('.btnRed').click(function(e){
        e.preventDefault();
        $(document).keypress(function(e) {
            return false;
        });
        $(this).hide();
        $(document).keypress(function(e) {
            return true;
        });
        //控制方向
        $(window).on('keydown',function(e){
            e.preventDefault();
            if(e.keyCode == 37){
                $('.walking').css('transform','scaleX(-1)');
                var left = parseInt($('.map').css('left'));
                $('.map').css('left',left+10);
            } else if(e.keyCode == 39){
                $('.walking').css('transform','scaleX(1)');
                var left = parseInt($('.map').css('left'));
                $('.map').css('left',left-10);
            } else if(e.keyCode == 38){
                var top = parseInt($('.map').css('top'));
                $('.map').css('top',top+10);
            } else if(e.keyCode == 40){
                var top = parseInt($('.map').css('top'));
                $('.map').css('top',top-10);
            }
        });
    });
});