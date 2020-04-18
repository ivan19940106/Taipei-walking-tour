$(document).ready(function(){
    if (window.innerWidth >= 576 && localStorage.getItem("hasCodeRunBefore") === null) {
        // show manual-modal
        $('header.fullHeader').addClass('header-backward');
        window.scrollTo(0, 556);
        $('.manual-modal').css({
            top: '556px'
        });
        $('body').addClass('scroll-lock');
        
        localStorage.setItem("hasCodeRunBefore", true);
    } 
    else {
        $('.fullHeader').removeClass('header-backward');
        $('.manual-modal').addClass('hide-manual-modal');
        $('body').removeClass('scroll-lock');
    }
    
    // remove manual-modal
    $('.manual-modal').click(function(){
        $('.fullHeader').removeClass('header-backward');
        $('.manual-modal').addClass('hide-manual-modal');
        $('body').removeClass('scroll-lock');
    });

    var checkpoint = ['日式舊屋行'];
    //route tab
    $('.option').click(function(e){
        $('.option .label').addClass('hide-label');
        $(this).find('.label').toggleClass('hide-label');
        if($(this).find('.route-name').text() == '日式舊屋行'){
            $('.spot1').attr('src', './img/mapgame/spot/route1/青田七六.jpg');
            $('.spot2').attr('src', './img/mapgame/spot/route1/長慶廟.jpg');
            $('.spot3').attr('src', './img/mapgame/spot/route1/紀州庵.jpg');
            $('.spot4').attr('src', './img/mapgame/spot/route1/野草居食屋.jpg');
            $('.spot5').attr('src', './img/mapgame/spot/route1/梁實秋故居.jpg');
            for(var i=0;i<=4;i++){
                $('.check-box').eq(i).find('img').removeClass('show-check');
            }
            //reset progress-bar
            $('.progress').css({
                width: `${0}%`
            });
            $('.indicator').text(`闖關進度：${0}%`);
            for(var j=0;j<=4;j++){
                $('.index').eq(j).css({
                    'background-color': '#fff'
                });
            }
            $('.spot').eq(0).text('青田七六');
            $('.spot').eq(1).text('長慶廟');
            $('.spot').eq(2).text('紀州庵');
            $('.spot').eq(3).text('野草居食屋');
            $('.spot').eq(4).text('梁實秋故居');
            checkpoint = [];
            checkpoint.push('日式舊屋行');
        } else if($(this).find('.route-name').text() == '文青品味旅'){
            $('.spot1').attr('src', './img/mapgame/spot/route2/宅jai風格生活.jpg');
            $('.spot2').attr('src', './img/mapgame/spot/route2/有肉Succulent_Gift1.jpg');
            $('.spot3').attr('src', './img/mapgame/spot/route2/讀字書店.jpg');
            $('.spot4').attr('src', './img/mapgame/spot/route2/SturnLandingTurkishCoffee2.jpg');
            $('.spot5').attr('src', './img/mapgame/spot/route2/SwellCo.Cafe.jpg');
            for(var i=0;i<=4;i++){
                $('.check-box').eq(i).find('img').removeClass('show-check');
            }
            //reset progress-bar
            $('.progress').css({
                width: `${0}%`
            });
            $('.indicator').text(`闖關進度：${0}%`);
            for(var j=0;j<=4;j++){
                $('.index').eq(j).css({
                    'background-color': '#fff'
                });
            }
            $('.spot').eq(0).text('宅jai風格生活');
            $('.spot').eq(1).text('有肉專賣');
            $('.spot').eq(2).text('讀字書店');
            $('.spot').eq(3).text('登陸土星');
            $('.spot').eq(4).text('Swell Co.');
            checkpoint = [];
            checkpoint.push('文青品味旅');
        } else if($(this).find('.route-name').text() == '職人散步去'){
            $('.spot1').attr('src', './img/mapgame/spot/route3/小廢墟.jpg');
            $('.spot2').attr('src', './img/mapgame/spot/route3/化南新村.png');
            $('.spot3').attr('src', './img/mapgame/spot/route3/文山公民會館.JPG');
            $('.spot4').attr('src', './img/mapgame/spot/route3/岸汐職人聚落.jpg');
            $('.spot5').attr('src', './img/mapgame/spot/route3/TAIGA針葉林2.jpg');
            for(var i=0;i<=4;i++){
                $('.check-box').eq(i).find('img').removeClass('show-check');
            }
            //reset progress-bar
            $('.progress').css({
                width: `${0}%`
            });
            $('.indicator').text(`闖關進度：${0}%`);
            for(var j=0;j<=4;j++){
                $('.index').eq(j).css({
                    'background-color': '#fff'
                });
            }
            $('.spot').eq(0).text('小廢墟');
            $('.spot').eq(1).text('化南新村');
            $('.spot').eq(2).text('文山公民會館');
            $('.spot').eq(3).text('岸汐職人聚落');
            $('.spot').eq(4).text('TAIGA 針葉林');
            checkpoint = [];
            checkpoint.push('職人散步去');
        }
    });

    //載入時預設的模式，手機時載入估狗地圖，桌機時載入小遊戲。
    if(window.innerWidth <= 576){
        $('.button').toggleClass('on');
        $('.gameMode').toggleClass('off');
        $('.mapMode').toggleClass('off');
        $('.game-container').toggleClass('hide-container');
        $('.map-container').toggleClass('hide-container');
        $('.mobile-control-wrapper').removeClass('hide-mobile-control-wrapper');
        $('.progress-container-mobile').removeClass('hide-progress-container-mobile');
        if(!($('.map-container').hasClass('hide-container'))){
            //產生地圖和導航功能
            googleMapCreater();
            $('.progress-container-mobile').addClass('hide-progress-container-mobile');
        }
    }

    //小遊戲、地圖切換開關。手機版第一次切換至小遊戲時顯示說明
    $('.switch').click(function(){
        $('.button').toggleClass('on');
        $('.gameMode').toggleClass('off');
        $('.mapMode').toggleClass('off');
        $('.game-container').toggleClass('hide-container');
        $('.map-container').toggleClass('hide-container');
        $('.progress-container-mobile').removeClass('hide-progress-container-mobile');
        if(window.innerWidth >= 576){
            $('.progress-container-mobile').addClass('hide-progress-container-mobile');
        }
        //顯示手機方向鍵、進度條
        if (window.innerWidth <= 576 && localStorage.getItem("hasSwitchedToGameBefore") === null) {
            // show manual-modal
            $('header.fullHeader').addClass('header-backward');
            window.scrollTo(0, 800);
            $('.manual-modal').removeClass('hide-manual-modal');
            $('.manual-modal').css({
                top: '800px'
            });
            $('body').addClass('scroll-lock');
            
            localStorage.setItem("hasSwitchedToGameBefore", true);
        } 
        else {
            $('.fullHeader').removeClass('header-backward');
            $('.manual-modal').addClass('hide-manual-modal');
            $('body').removeClass('scroll-lock');
        }
    });

    //full-screen-btn
    $('.full-screen-btn').click(function(){
        $(this).toggleClass('hide-full-screen-btn');
        $('.game-container').css({
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: '0',
            left: '0',
            'z-index': '111'
        });
        $('.fuda-container').css({
            position: 'fixed',
            top: '30px',
            left: '100px',
            'z-index': '111'
        });
        $('body').toggleClass('scroll-lock');
        $('.normal-screen-btn').toggleClass('hide-full-screen-btn');
    });
    $('.normal-screen-btn').click(function(){
        $(this).toggleClass('hide-full-screen-btn');
        $('.game-container').css({
            width: '63%',
            height: '550px',
            position: 'relative',
            'z-index': '0'
        });
        $('.fuda-container').css({
            position: 'absolute',
            top: '390px',
            left: '140px',
            'z-index': '1'
        });
        $('body').toggleClass('scroll-lock');
        $('.full-screen-btn').toggleClass('hide-full-screen-btn');
    });

    //Start button
    $('.btnRed').click(function(e){
        e.preventDefault();
        //按了開始按鈕之後才能按方向鍵移動人物
        $(document).keypress(function(e) {
            return false;
        });
        $(this).hide();
        $(document).keypress(function(e) {
            return true;
        });
        //控制人物方向
        $(window).on('keydown',function(e){
            e.preventDefault();
            //控制不能走出地圖邊界
            var coordX = getTransValues('game-map-container', 'x');
            var coordY = getTransValues('game-map-container', 'y');
            if(e.keyCode == 37 && coordX >= -4126){
                $('.walking').css('transform','scaleX(-1)');
                $('.game-map-container').css('transform', `translate(${coordX+10}px, ${coordY}px)`);
            } else if(e.keyCode == 39 && coordX <= -968){
                $('.walking').css('transform','scaleX(1)');
                $('.game-map-container').css('transform', `translate(${coordX-10}px, ${coordY}px)`);
            } else if(e.keyCode == 38 && coordY <= -704){
                $('.game-map-container').css('transform', `translate(${coordX}px, ${coordY+10}px)`);
            } else if(e.keyCode == 40 && coordY >= -2588){
                $('.game-map-container').css('transform', `translate(${coordX}px, ${coordY-10}px)`);
            }
            spotsTrigger();
        });

        goSanpo();
        //go!
        function goSanpo(){
            $('.left').click(function(){
                var coordX = getTransValues('game-map-container', 'x');
                var coordY = getTransValues('game-map-container', 'y');
                if(coordX >= -4126){
                    $('.walking').css('transform','scaleX(-1)');
                    $('.game-map-container').css('transform', `translate(${coordX+30}px, ${coordY}px)`);
                }
                spotsTrigger();
            });
            $('.right-dir').click(function(){
                var coordX = getTransValues('game-map-container', 'x');
                var coordY = getTransValues('game-map-container', 'y');
                if(coordX <= -968){
                    $('.walking').css('transform','scaleX(1)');
                    $('.game-map-container').css('transform', `translate(${coordX-30}px, ${coordY}px)`);
                }
                spotsTrigger();
            });
            $('.up').click(function(){
                var coordX = getTransValues('game-map-container', 'x');
                var coordY = getTransValues('game-map-container', 'y');
                if(coordY <= -704){
                    $('.game-map-container').css('transform', `translate(${coordX}px, ${coordY+30}px)`);
                }
                spotsTrigger();
            });
            $('.down').click(function(){
                var coordX = getTransValues('game-map-container', 'x');
                var coordY = getTransValues('game-map-container', 'y');
                if(coordY >= -2588){
                    $('.game-map-container').css('transform', `translate(${coordX}px, ${coordY-30}px)`);
                }
                spotsTrigger();
            });
        }

        function spotsTrigger(){
            var status = 'outside';
            var coordX = getTransValues('game-map-container', 'x');
            var coordY = getTransValues('game-map-container', 'y');
            //spot1 trigger
            if(coordX >= -2400 && coordY >= -1512 && coordX <= -2210 && coordY <= -1342){
                $('.spot1').css({
                    filter: 'brightness(2.8)'
                });
                if(status == 'outside'){
                    setTimeout(function(){
                        if(coordX >= -2400 && coordY >= -1512 && coordX <= -2210 && coordY <= -1342){
                            checkpoint[1] = '';
                            if(checkpoint[0] == '日式舊屋行'){
                                checkpoint[1] = '青田七六';
                            } else if(checkpoint[0] == '文青品味旅'){
                                checkpoint[1] = '宅jai風格生活';
                            } else if(checkpoint[0] == '職人散步去'){
                                checkpoint[1] = '小廢墟';
                            }
                            getQuizContent(checkpoint);
                            $('.game-modal').removeClass('hide-game-modal');
                        }
                        status = 'inside';
                    }, 3000);
                }
                
            } else {
                status = 'outside';
                $('.spot1').css({
                    filter: 'brightness(1)'
                });
            }
            //spot2 trigger
            if(coordX >= -1810 && coordY >= -1242 && coordX <= -1560 && coordY <= -1142){
                $('.spot2').css({
                    filter: 'brightness(2.8)'
                });
                if(status == 'outside'){
                    setTimeout(function(){
                        if(coordX >= -1810 && coordY >= -1242 && coordX <= -1560 && coordY <= -1142){
                            checkpoint[1] = '';
                            if(checkpoint[0] == '日式舊屋行'){
                                checkpoint[1] = '長慶廟';
                            } else if(checkpoint[0] == '文青品味旅'){
                                checkpoint[1] = '有肉專賣';
                            } else if(checkpoint[0] == '職人散步去'){
                                checkpoint[1] = '化南新村';
                            }
                            getQuizContent(checkpoint);
                            $('.game-modal').removeClass('hide-game-modal');
                        }
                        status = 'inside';
                    }, 3000);
                }
                
            } else {
                status = 'outside';
                $('.spot2').css({
                    filter: 'brightness(1)'
                });
            }
            //spot3 trigger
            if(coordX >= -3010 && coordY >= -1242 && coordX <= -2760 && coordY <= -1092){
                $('.spot3').css({
                    filter: 'brightness(2.8)'
                });
                if(status == 'outside'){
                    setTimeout(function(){
                        if(coordX >= -3010 && coordY >= -1242 && coordX <= -2760 && coordY <= -1092){
                            checkpoint[1] = '';
                            if(checkpoint[0] == '日式舊屋行'){
                                checkpoint[1] = '紀州庵';
                            } else if(checkpoint[0] == '文青品味旅'){
                                checkpoint[1] = '讀字書店';
                            } else if(checkpoint[0] == '職人散步去'){
                                checkpoint[1] = '文山公民會館';
                            }
                            getQuizContent(checkpoint);
                            $('.game-modal').removeClass('hide-game-modal');
                        }
                        status = 'inside';
                    }, 3000);
                }
                
            } else {
                status = 'outside';
                $('.spot3').css({
                    filter: 'brightness(1)'
                });
            }
            //spot4 trigger
            if(coordX >= -2910 && coordY >= -1892 && coordX <= -2810 && coordY <= -1792){
                $('.spot4').css({
                    filter: 'brightness(2.8)'
                });
                if(status == 'outside'){
                    setTimeout(function(){
                        if(coordX >= -2910 && coordY >= -1892 && coordX <= -2810 && coordY <= -1792){
                            checkpoint[1] = '';
                            if(checkpoint[0] == '日式舊屋行'){
                                checkpoint[1] = '野草居食屋';
                            } else if(checkpoint[0] == '文青品味旅'){
                                checkpoint[1] = '登陸土星';
                            } else if(checkpoint[0] == '職人散步去'){
                                checkpoint[1] = '岸汐職人聚落';
                            }
                            getQuizContent(checkpoint);
                            $('.game-modal').removeClass('hide-game-modal');
                        }
                        status = 'inside';
                    }, 3000);
                }
                
            } else {
                status = 'outside';
                $('.spot4').css({
                    filter: 'brightness(1)'
                });
            }
            //spot5 trigger
            if(coordX >= -1660 && coordY >= -1892 && coordX <= -1560 && coordY <= -1792){
                $('.spot5').css({
                    filter: 'brightness(2.8)'
                });
                if(status == 'outside'){
                    setTimeout(function(){
                        if(coordX >= -1660 && coordY >= -1892 && coordX <= -1560 && coordY <= -1792){
                            checkpoint[1] = '';
                            if(checkpoint[0] == '日式舊屋行'){
                                checkpoint[1] = '梁實秋故居';
                            } else if(checkpoint[0] == '文青品味旅'){
                                checkpoint[1] = 'Swell Co.';
                            } else if(checkpoint[0] == '職人散步去'){
                                checkpoint[1] = 'TAIGA 針葉林';
                            }
                            getQuizContent(checkpoint);
                            $('.game-modal').removeClass('hide-game-modal');
                        }
                        status = 'inside';
                    }, 3000);
                }
                
            } else {
                status = 'outside';
                $('.spot5').css({
                    filter: 'brightness(1)'
                });
            }
        }

        //get quiz content
        function getQuizContent(checkpoint){
            $('.test').text('');
            $('.opt1').text('');
            $('.opt2').text('');
            $('.opt3').text('');
            $('.opt1, .opt2, .opt3').removeClass('click-disabled');
            $('.opt1, .opt2, .opt3').removeClass('right');
            $('.opt1, .opt2, .opt3').removeClass('wrong');
            //AJAX
            var xhr = new XMLHttpRequest();
            xhr.open('GET', './php/getQuizzes.php', true);
            xhr.send(null);
            xhr.onload = function(){
                if(xhr.status == 200){
                    var tests = JSON.parse(xhr.responseText);
                    var test = '';
                    var opt1 = '';
                    var opt2 = '';
                    var opt3 = '';
                    var answer = '';
                    for(var i=0;i<tests.length;i++){
                        if(tests[i]['attraction_name'] == checkpoint[1]){
                            test = tests[i]['quiz_content'];
                            opt1 = tests[i]['option1_content'];
                            opt2 = tests[i]['option2_content'];
                            opt3 = tests[i]['option3_content'];
                            answer = tests[i]['answer_item'];
                        }
                    }
                    $('.test').text(test);
                    $('.opt1').text(opt1);
                    $('.opt2').text(opt2);
                    $('.opt3').text(opt3);
                    for(var j=1;j<=3;j++){
                        if($(`.opt${j}`).text() == answer){
                            $(`.opt${j}`).addClass('ans');
                        }
                    }
                } else {
                    alert('抱歉，有東西出錯了，Server未回傳關卡題目。請聯繫客服人員！！');
                }
            }
        }

        //close game modal
        $('.close-modal').click(function(){
            $('.game-modal').addClass('hide-game-modal');
        });

        //spots' quiz
        $('.opt1, .opt2, .opt3').click(function(){
            if($(this).hasClass('ans')){
                $('.test').text('恭喜答對！！！');
                $(this).addClass('right');
                for(var i=0;i<=4;i++){
                    if($('.spot').eq(i).text().toString() == checkpoint[1].toString()){
                        $('.check-box').eq(i).find('img').addClass('show-check');
                    }
                }
            } else {
                $('.test').text('你答錯了！！！！正確答案如下藍底選項所示！！');
                $(this).addClass('wrong');
                $('.ans').addClass('right');
            }
            //close game modal
            $('.close-modal').click(function(){
                $('.game-modal').addClass('hide-game-modal');
            });
            $('.continue').removeClass('hide-continue-btn');
            $('.continue').click(function(){
                $('.game-modal').addClass('hide-game-modal');
                $('.continue').addClass('hide-continue-btn');
            });
            //移除解答class，並且不能重選
            $('.opt1, .opt2, .opt3').removeClass('ans');
            $('.opt1, .opt2, .opt3').addClass('click-disabled');
            updateProgress();
        });

        //progress bar update
        function updateProgress(){
            //check checks
            var checks = 0;
            for(var i=0;i<5;i++){
                if($('.check-box').eq(i).find('img').hasClass('show-check')){
                    checks = checks +1;
                }
            }
            //paint progress-bar
            $('.progress').css({
                width: `${(checks-1)*22}%`
            });
            $('.indicator').text(`闖關進度：${checks*20}%`);
            for(var j=0;j<=checks;j++){
                //以防變成$('.index').eq(-1)，讓最後一個index變紅色
                if(checks==0){
                    break;
                }
                $('.index').eq(j-1).css({
                    'background-color': '#c45c5c'
                });
            }
            //get point
            if(checks == 5){
                $('.test').text('恭喜您完成本路線所有關卡！！！');
                $('.continue').text('好的。');
                if($('.sign').text() == '登出登出'){
                    //AJAX
                    var member;
                    updatePoints();
                } else {
                    $('.opt1').text('');
                    $('.opt2').text('');
                    $('.opt3').text('');
                }
                $('.opt1, .opt2, .opt3').removeClass('right');
                $('.game-modal').removeClass('hide-game-modal');
                $('.continue').click(function(){
                    $('.game-modal').addClass('hide-game-modal');
                });
            }
        }
    });
    
    function updatePoints(){
        var xhr = new XMLHttpRequest();
        xhr.open("get", "./php/loginInfoForFront.php", true);
        xhr.send(null);
        xhr.onload = function(){
            member = JSON.parse(xhr.responseText);
            var pointForm = new FormData();
            var memNum = member.memNum;
            var memPoint = parseInt(member.memPoint)+300;
            pointForm.append('memNum', memNum);
            pointForm.append('memPoint', memPoint);
            var xhr2 = new XMLHttpRequest();
            xhr2.open('POST', './php/getPoints.php', true);
            xhr2.send(pointForm);
            xhr2.onload = function(){
                if(xhr2.status == 200){
                    $('.opt1').text(`您原本有${member.memPoint}點。`);
                    $('.opt2').text(`您現在有${parseInt(member.memPoint)+300}點。`);
                    $('.opt3').text('真是太棒了！');
                } else {
                    // console.log('失敗了！ＱＱ');
                }
            }
        }
    };

    //官方景點經緯度
    //route1
    r1s1 = {lat: 25.0280558, lng: 121.5303483};
    r1s2 = {lat: 25.0238285, lng: 121.52569};
    r1s3 = {lat: 25.0250419, lng: 121.519615};
    r1s4 = {lat: 25.0248451, lng: 121.5194386};
    r1s5 = {lat: 25.0213759, lng: 121.5183262};
    //route2
    r2s1 = {lat: 25.0295304, lng: 121.539476};
    r2s2 = {lat: 25.0343324, lng: 121.5442234};
    r2s3 = {lat: 25.0265961, lng: 121.5226881};
    r2s4 = {lat: 25.0310503, lng: 121.5446709};
    r2s5 = {lat: 25.0355961, lng: 121.5459665};
    //route3
    r3s1 = {lat: 24.9907327, lng: 121.568855};
    r3s2 = {lat: 24.9910739, lng: 121.5724933};
    r3s3 = {lat: 24.9900048, lng: 121.5675335};
    r3s4 = {lat: 24.9891648, lng: 121.5658933};
    r3s5 = {lat: 24.9889868, lng: 121.5662633};

    //Google map mode
    $('.switch').on('click', function(){
        if(!($('.map-container').hasClass('hide-container'))){
            spot1 = r1s1;
            spot2 = r1s2;
            spot3 = r1s3;
            spot4 = r1s4;
            spot5 = r1s5;
            //route tab
            $('.option').click(function(e){
                $('.option .label').addClass('hide-label');
                $(this).find('.label').toggleClass('hide-label');
                if($(this).find('.route-name').text() == '日式舊屋行'){
                    spot1 = r1s1;
                    spot2 = r1s2;
                    spot3 = r1s3;
                    spot4 = r1s4;
                    spot5 = r1s5;
                } else if($(this).find('.route-name').text() == '文青品味旅'){
                    spot1 = r2s1;
                    spot2 = r2s2;
                    spot3 = r2s3;
                    spot4 = r2s4;
                    spot5 = r2s5;
                } else if($(this).find('.route-name').text() == '職人散步去'){
                    spot1 = r3s1;
                    spot2 = r3s2;
                    spot3 = r3s3;
                    spot4 = r3s4;
                    spot5 = r3s5;
                }
                //產生地圖和導航功能
                googleMapCreater();
            });
            //產生地圖和導航功能
            googleMapCreater();
        }
    });

    //get translateX&Y's value of an element
    function getTransValues(elementClassName, coord){
        var matrix = $(`.${elementClassName}`).css('transform').replace(/[^0-9\-.,]/g, '').split(',');
        var x = matrix[12] || matrix[4];
        var y = matrix[13] || matrix[5];
        if(coord == 'x'){
            return parseInt(x);
        } else if(coord == 'y'){
            return parseInt(y);
        }
    };

    //google map function
    function googleMapCreater(){
        //Get current position with google api
        var start;
        var geolocation = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCxHAzDuEADlkr21Aqm0ng4BqfQ3LfmD6c';
        function renewStartPlace() {
            xhr = new XMLHttpRequest();
            xhr.open('POST', geolocation);
            xhr.onload = function () {
                var response = JSON.parse(this.responseText);
                //set start point
                start = response.location;
                //將地標和路線指示清空
                markers = [];
                infowindows = [];
                directions(start, spot5, [
                {location: spot1, stopover: true},
                {location: spot2, stopover: true},
                {location: spot3, stopover: true},
                {location: spot4, stopover: true}
                ]);
            }
            xhr.send();
            // console.log(start);
        }
        //畫出地圖
        var mapOptions = {
                zoom: 12,
                center: start,
                }
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        renewStartPlace();

        //設定現在位置為地圖的中心
        function setMapCenter(){
            map.setCenter(start);
            // console.log('set!');
        }

        //一直更新現在位置的導航
        setInterval(renewStartPlace, 20000);
        setInterval(setMapCenter, 20000);

        //規劃路線
        var markers = [];
        var infowindows = [];
        function directions(origin, dest, waypts){
            let directionService = new google.maps.DirectionsService(),
                directionDisplay = new google.maps.DirectionsRenderer(),
                request = {
                    origin: origin,
                    destination: dest,
                    waypoints: waypts,
                    optimizeWaypoints: true,
                    travelMode: 'WALKING'
                }
            directionDisplay.setMap(map);
            directionService.route(request, (result, status) => {
                if(status == 'OK'){
                    // 回傳路線上每個步驟的細節
                    var steps = result.routes[0].legs[0].steps;
                    steps.forEach((e, i) => {
                        // 加入地圖標記
                        markers[i] = new google.maps.Marker({
                        position: { lat: e.start_location.lat(), lng: e.start_location.lng() },
                        map: map,
                        label: { text: i + '', color: "#fff" }
                        });
                        // 加入資訊視窗
                        infowindows[i] = new google.maps.InfoWindow({
                        content: e.instructions
                        });
                        // 加入地圖標記點擊事件
                        markers[i].addListener('click', function () {
                        if(infowindows[i].anchor){
                            infowindows[i].close();
                        }else{
                            infowindows[i].open(map, markers[i]);
                        }
                        });
                    });
                    directionDisplay.setDirections(result);
                }
            });
        }
    }
});