
function insertRow(e) {
    //阻止預設送出事件
    e.preventDefault();
    //先抓被填入的值
    let route_number = $('#routeNum').val(); //抓被點選的路線編號
    let event_name = $('#actTitle').val();
    let event_dateAll = $('#actDate').val().split('-'); //2020-03-29 先切割
    let event_date = event_dateAll[0] + event_dateAll[1] + event_dateAll[2];
    let meeting_place = $('#meetPlace').val();
    let max_attendance = $('#maxPeople :selected').val();
    let event_information = $('#eventInfo').val();
    let event_cover_url = document.getElementById('eventImg').files[0];
    // console.log(event_cover_url);

    let newEventForm = new FormData();
    newEventForm.append('route_number', route_number);
    newEventForm.append('event_cover_url', event_cover_url);
    newEventForm.append('event_name', event_name);
    newEventForm.append('event_date', event_date);
    newEventForm.append('meeting_place', meeting_place);
    newEventForm.append('max_attendance', max_attendance);
    newEventForm.append('event_information', event_information);

    //將表單物件的資料送到insertKeyword.php中執行修改資料內容的SQL指令
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            alert(xhr.responseText);
            location.reload();
        } else {
            alert(xhr.status + "失敗");
        }
    }

    xhr.open("Post", "./php/insertEvent.php", true);
    xhr.send(newEventForm);
    alert("發揪團成功!");
    closeLightBox();
}


//新增揪團 註冊預覽上傳圖片---------------------------
document.getElementById('eventImg').onchange = imgChange;

//新增揪團  預覽上傳圖片處理函式
function imgChange() {
    let file = document.getElementById('eventImg').files[0];
    //============讀取檔案內容(圖片)
    let readFile = new FileReader();  //---物件
    readFile.readAsDataURL(file);
    readFile.addEventListener('load', function () {
        let image = document.getElementById('viewImg');
        // image = document.getElementById('viewCheckImg');
        image.src = this.result;
        //再把第二步驟的圖片帶到第三步驟
        let checkImg = document.getElementById('viewCheckImg');
        checkImg.src = image.src;
    });

}

//把第二步驟抓到的值放到第三步驟
function stepCheck() {
    let checkRoute = $('.routeClickName').text();//抓被點選的路線名稱
    let checkAtractions = $('.attractions').text();//抓被點選的景點
    let event_name = $('#actTitle').val();
    let event_date = $('#actDate').val();
    let meeting_place = $('#meetPlace').val();
    let max_attendance = $('#maxPeople :selected').val();
    let event_information = $('#eventInfo').val();
    // console.log(checkAtractions, event_name, event_date, meeting_place, max_attendance, event_information);
    document.getElementById('checkRoute').innerText = checkRoute;
    document.getElementById('checkAtractions').innerText = checkAtractions;
    document.getElementById('checkTitle').innerText = event_name;
    document.getElementById('checkDate').innerText = event_date;
    document.getElementById('checkPlace').innerText = meeting_place;
    document.getElementById('checkPeople').innerText = max_attendance;
    document.getElementById('checkInfo').innerText = event_information;

}


//步驟一 點擊路線跳出路線名稱+景點
function routeClick() {
    $('.routeChose').click(function () {
        let routeName = $(this).children().last().children('p').text();
        let attractions = $(this).children().last().children('input').val();
        let routeNum = $(this).attr('psn');
        // console.log(routeNum)
        //每次點選都清空
        $('.routeClick').text('');

        //append 點選到的路線和景點+路線編號
        $(`<div> <p class="routeClickName">${routeName}</p></div> <div> <p class="attractions">${attractions}</p></div> <input type="hidden" name="routeNum" id="routeNum" value="${routeNum}">`).appendTo('.routeClick');

    });
}

// 動態新增路線
function LightEventRouteinfo(routes) {
    let routeAllBox = $id("routeAllBox");
    let routetable = JSON.parse(routes);//把JSON字串翻譯成JS物件

    // ---------------官方路線---------------
    let routeOfficial = routetable.routeInfo; //取出官方路線
    let officialRouteTable = []; //先建一個新陣列,要把同官方路線的景點串一起
    routeOfficial.forEach((item) => {
        //避免陣列第0筆就上傳,所以預設-1
        const str = item.route_number - 1;
        if (typeof officialRouteTable[str] === 'undefined') { //放入新陣列
            officialRouteTable[str] = item;
        }
        else {
            officialRouteTable[str].attraction_name += `-> ${item.attraction_name}`;
        }
    });
    let officialRouteNew = officialRouteTable.filter(item => item); //清除中間空陣列
    // console.log(officialRouteNew);

    // ---------------自訂路線---------------
    let routeMember = routetable.customInfo; //取出官方路線
    let memberRouteTable = []; //先建一個新陣列,要把同官方路線的景點串一起
    routeMember.forEach((item) => {
        //避免陣列第0筆就上傳,所以預設-1
        const a = item.route_number; // 0
        if (typeof memberRouteTable[a] === 'undefined') { //放入新陣列
            memberRouteTable[a] = item;
        }
        else {
            memberRouteTable[a].custom_attraction_name += `-> ${item.custom_attraction_name}`;
        }

    });
    let memberRouteNew = memberRouteTable.filter(item => item); //清除中間空陣列
    // console.log(memberRouteNew);

    let html = "";

    for (i = 0; i < officialRouteNew.length; i++) {
        html += `
        <div class="routeBox routeChose" psn="${officialRouteNew[i]['route_number']}">
            <div class="routeBoxImg">
                <img src="./img/attractions/${officialRouteNew[i]['attraction_photo1']}">
            </div>
            <div class="routeBoxBottom">
                <p class="routeName">${officialRouteNew[i]['route_name']}</p>
                <input type="hidden" name="route" id="officialRoute${officialRouteNew[i]['route_number']}" value="${officialRouteNew[i]['attraction_name']}">
            </div>
        </div>
        `
    }
    for (j = 0; j < memberRouteNew.length; j++) {
        html += `
        <div class="routeBox routeChose" psn="${memberRouteNew[j]['route_number']}">
            <div class="routeBoxImg memberRoute">
                <img src="./img/event/event_cusRout.jpg">
            </div>
            <div class="routeBoxBottom">
                <p class="routeName">${memberRouteNew[j]['route_name']}</p>
                <input type="hidden" name="route" id="memberRoute${memberRouteNew[j]['route_number']}" value="${memberRouteNew[j]['custom_attraction_name']}">
            </div>
        </div> 
        `
    }
    html += `
    <div class="routeBox addRoutebtn">
        <div class="addroute">
            <a href="./customRoute.html">
                自訂路線
            </a>
        </div>
    </div>
    `
    routeAllBox.innerHTML = html;
    routeClick();
}

// 確認有撈到路線資料
function checkRoute() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //正確到php撈資料
            LightEventRouteinfo(xhr.responseText);

        } else {
            alert(xhr.status);
        }

    };
    xhr.open("Get", "./php/getEventRouteList.php", true);
    xhr.send(null);
}

//點擊上下一步
function step() {
    //上一步
    $(".backStep").click(function () {
        //換div
        $(this).parent().parent().prev().css('display', 'flex');

        $(this).parent().parent().css('display', 'none');

    });
    $(".nextStep").click(function () {
        //換div 
        $(this).parent().parent().next().css('display', 'flex');
        $(this).parent().parent().css('display', 'none');

    });
    //下一步
    $(".twoNextStep").click(function () {
        //換div 
        if (document.getElementById('eventImg').files[0] == undefined) {
            alert("請上傳圖片");
            return
        } else if ($('#actTitle').val() == false) {
            alert("請輸入揪團名稱");
            return
        }
        else if ($('#actDate').val() == false) {
            alert("請選擇活動日期");
            return
        }
        else if ($('#meetPlace').val() == false) {
            alert("請選擇集合地點");
            return
        }
        else if ($('#eventInfo').val() == false) {
            alert("請輸入活動介紹");
            return
        } else {
            $(this).parent().parent().next().css('display', 'flex');
            $(this).parent().parent().css('display', 'none');
        }

    });

}
//開燈箱
function showLightBox() {
    let login = $('.sign').text();

    if (login == "登入登入") { //顯示登入登入--->未登入跳出提醒
        $("#loginBlock").css("display", "block");
    }
    else {  //已登入則打開燈箱
        $('#eventhold_back').css('display', 'flex');
        checkRoute(); //撈官方+自訂路線
        step(); //上下一步btn
    }
}
//關燈箱
function closeLightBox() {
    $('#eventhold_back').css('display', 'none');
}

// 開啟燈箱
$(document).on('click', '.eventInsert', showLightBox);
//關燈箱
$(document).on('click', '#closeMoodBtn', closeLightBox);
//把第二步驟資料放到第三步驟
$(document).on('click', '.twoNextStep', stepCheck);
//送出表單
$(document).on('click', '.send', insertRow);
