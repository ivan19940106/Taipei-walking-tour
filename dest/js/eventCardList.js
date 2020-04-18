let filterClass = "all";
let filterOrder = "event_number desc";


function $id(id) {
    return document.getElementById(id);
}
function showEventInfo(){
    let thisEventNum = $(this).parent().children('input').val();
    let event_sort = $(this).parent().parent().children().first().children().first().children('input').val();
    // console.log(thisEventNum)
    // console.log(event_sort)
    let newEventInfoForm = new FormData();
    newEventInfoForm.append('thisEventNum', thisEventNum);
    newEventInfoForm.append('event_sort', event_sort);

    let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                LightEventinfo(xhr.responseText);
            } else {
                alert(xhr.status + "失敗");
            }
        }

        xhr.open("Post", "./php/getEventDetailList.php", true);
        xhr.send(newEventInfoForm);
        //----------------------------------------------------
       
}

// 動態新增燈箱-活動詳情
function LightEventinfo(events) {
    let eventinfoLight = $id("eventinfoLight");
    let eventTable = JSON.parse(events);//把JSON字串翻譯成JS
    let html = "";
    // console.log(eventTable);

    // ---------------官方路線---------------
    let eventOfficialTable= [];
    eventTable.forEach((item) => {
        //避免陣列第0筆就上傳,所以預設-1
        const str = item.event_number;
        if (typeof eventOfficialTable[str] === 'undefined') { //放入新陣列
            eventOfficialTable[str] = item;
        }
        else {
            eventOfficialTable[str].attraction_name += `<img src="./img/event/eventArrow.png" class="eventArrow"> ${item.attraction_name}`;
        }
    });
    let eventTableNew = eventOfficialTable.filter(item => item); //清除中間空陣列
    // console.log(eventTableNew);


     // ---------------自訂路線---------------
     let eventMemberTable= [];
     eventTable.forEach((item) => {
        //避免陣列第0筆就上傳,所以預設-1
        const a = item.event_number;
        if (typeof eventMemberTable[a] === 'undefined') { //放入新陣列
            eventMemberTable[a] = item;
        }
        else {
            eventMemberTable[a].custom_attraction_name += `<img src="./img/event/eventArrow.png" class="eventArrow">${item.custom_attraction_name}`;
        }
    });
    let eventMemberNew = eventMemberTable.filter(item => item); //清除中間空陣列
    // console.log(eventMemberNew);

    for (i = 0; i < eventTableNew.length; i++) {
        html += `
        <div id="event${eventTableNew[i].event_number}" class="eventinfo_back" psn="${eventTableNew[i].event_number}">
                <div class="lightbox_detailevent">
                    <div class="lightbox_detailevent_info">
                            <div class="detaileventTop">
                                <div class="lightReport">
                                    <span class="dot1"></span>
                                    <span class="dot2"></span>
                                </div>    
                                <!-- 叉叉按鈕 -->
                                <div id="closeMoodBtn">
                                    <span class="line1"></span>
                                    <span class="line2"></span>
                                </div>
                                <div class="title">
                                    <div class="eventInfotitle">${eventTableNew[i].event_name}</div>
                                </div>
                            </div>
                            <div>
                                <div class="detaileventRoute">
                                    <p>${eventTableNew[i].route_name}</p>
                                    `
                                    if(eventTableNew[i].route_photo == null){
                                        html +=`<p class="detaileventattr">${eventMemberNew[i].custom_attraction_name}</p>
                                        `
                                    }else{
                                        html +=`<p class="detaileventattr">${eventTableNew[i].attraction_name}</p>`
                                    }
                                    html +=`
                                </div>
                                <div class="detaileventContent">
                                    <div class="detaileventPic">
                                        <div class="detaileventPicbox">
                                            <img src="./img/eventPhoto/${eventTableNew[i].event_cover_url}">
                                        </div>
                                    </div>
                                    <div class="detaileventText">
                                        <div class="eventInforow">
                                            <div class="eventrowTitle">活動日期</div>
                                            <div>${eventTableNew[i].event_date}</div>
                                        </div>
                                        <div class="eventInforow">
                                            <div class="eventrowTitle">報名截止日</div>
                                            <div>${eventTableNew[i].enroll_end_date}</div>
                                        </div>
                                        <div class="eventInforow">
                                            <div class="eventrowTitle">集合地點</div>
                                            <div>${eventTableNew[i].meeting_place}</div>
                                        </div>
                                        <div class="eventInforow">
                                            <div class="eventrowTitle">目前報名人數</div>
                                            <div>${eventTableNew[i].now_attendance}位</div>
                                        </div>
                                        <div class="eventInforow">
                                            <div class="eventrowTitle">報名人數上限</div>
                                            <div>${eventTableNew[i].max_attendance}位</div>
                                        </div>
                                        <div class="eventInforow">
                                            <div class="eventrowTitle">活動介紹</div>
                                            <div class="eventrowInfo">${eventTableNew[i].event_information}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="enroll">
                                <a href="#" class="btnRed btnEnroll">
                                    我要報名
                                </a>
                            </div>
                    </div>
                </div>
            </div>
        `;
    }
    eventinfoLight.innerHTML = html;
    $(".eventinfo_back").css("display", "flex");
}
// 動態新增卡片
function eventCard(event) {
    let cardBox = $id("cardBox");
    let eventTable = JSON.parse(event);//把JSON字串翻譯成JS
    let html = "";

    for (i = 0; i < eventTable.length; i++) {
        html += `
        <div class="eventCard wow zoomIn">
            <div class="cardTop">
            `
        if (eventTable[i].member_number == null) {
            html += `
                <div class="starMark">
                    <div><img src="./img/event/event_star.png" alt=""></div>
                    <div class="markWord">官方路線</div>
                    <input type="hidden" name="event_sort" value="official" class="event_sort">
                </div>
                `
        } else {
            html += `<div class="starMark"><input type="hidden" name="event_sort" value="member" class="event_sort"></div>`
        }
        html += `
                <div class="dotWrap">
                </div>
            </div>
            <div class="eventPicWrap">
                <img src="./img/eventPhoto/${eventTable[i].event_cover_url}" class="eventPic">
            </div>
            <div class="cardText">
                <h1>${eventTable[i].event_name}</h1>
                <p>
                    活動日期:${eventTable[i].event_date}<br>
                    報名截止:${eventTable[i].enroll_end_date}<br>
                    集合地點:${eventTable[i].meeting_place}
                </p>
                <span id="more${eventTable[i].event_number}" class="lightDetail">more</span>
                <input type="hidden" name="event_number" value="${eventTable[i].event_number}" class="event_number">
            </div>
        </div> 
        `;
    }
    cardBox.innerHTML = html;
}

// 確定是否有撈到卡片資料
function check() {
    // console.log(filterClass,filterOrder)
    let data_info = `eventOrder=${filterOrder}&eventClass=${filterClass}`;

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //正確到php撈資料,送到eventCard function
            eventCard(xhr.responseText);
            // console.log(JSON.parse(xhr.responseText));
        } else {
            alert(xhr.status + "失敗");
        }
    }
    xhr.open("Get", "./php/getEventCards.php?" + data_info, true);
    xhr.send(data_info);
    // console.log(data_info)
}
function closeEventInfo() {
    let eventinfo_back = document.querySelectorAll(".eventinfo_back");
    for (let j = 0; j < eventinfo_back.length; j++) {
        eventinfo_back[j].style.display = "none";

    }
}

//註冊活動詳情燈箱開啟click事件
$(document).on('click', '.lightDetail', showEventInfo);
//註冊活動詳情燈箱關閉click事件
$(document).on('click', '#closeMoodBtn', closeEventInfo);

window.addEventListener("load", check());

window.addEventListener('load', function () {
    //註冊三種揪團分類按鈕的click事件
    $(".filter").on("click", function () {
        filterClass = $(this).children().first().val();
        check();
        // console.log(filterClass)
    });

    //註冊排序方式select的onchange事件
    $("#orderSelect").on("change", function (e) {
        filterOrder = e.target.value;
        // console.log(filterOrder)
        check();
    });
})




