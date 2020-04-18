function $id(id) {
    return document.getElementById(id);
}
function showEventInfo() {
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
            $(".eventinfo_back").css("display", "flex");
        } else {
            alert(xhr.status + "失敗");
        }
    }

    xhr.open("Post", "./php/getEventDetailList.php", true);
    xhr.send(newEventInfoForm);
    //----------------------------------------------------

}
function closeEventInfo() {
    let eventinfo_back = document.querySelectorAll(".eventinfo_back");
    for (let j = 0; j < eventinfo_back.length; j++) {
        eventinfo_back[j].style.display = "none";

    }
}
// 動態新增燈箱-活動詳情
function LightEventinfo(events) {
    let eventinfoLight = $id("eventinfoLight");
    let eventTable = JSON.parse(events);//把JSON字串翻譯成JS
    let html = "";
    // console.log(eventTable);

    // ---------------官方路線---------------
    let eventOfficialTable = [];
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
    let eventMemberTable = [];
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
        if (eventTableNew[i].route_photo == null) {
            html += `<p class="detaileventattr">${eventMemberNew[i].custom_attraction_name}</p>
                                        `
        } else {
            html += `<p class="detaileventattr">${eventTableNew[i].attraction_name}</p>`
        }
        html += `
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
}
window.addEventListener("load", function () {

    // 當點選filter時，顯示對應的揪團資訊
    $(document).on('click', '.filter', function () {
        let eventConcat = $(this).text();
        let concatForm = new FormData();
        concatForm.append('eventConcat', eventConcat);

        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                let cardBox = $id("cardBox");
                let eventTable = JSON.parse(xhr.responseText);//把JSON字串翻譯成JS
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
            } else {
                alert(xhr.status + "失敗");
            }
            LightEventinfo(xhr.responseText);
        }
        xhr.open("Post", "./php/getEventForConcat.php", true);
        xhr.send(concatForm);

    })

    //註冊活動詳情燈箱開啟click事件
    $(document).on('click', '.lightDetail', showEventInfo);
    //註冊活動詳情燈箱關閉click事件
    $(document).on('click', '#closeMoodBtn', closeEventInfo);
    // 檢舉揪團
    //註冊開檢舉燈箱...的click事件
    $(document).on('click', '.lightReport', function showEventReport() {
        let eventreport_back = $('#eventreport_back');
        eventreport_back.css('display', 'flex');
    });
    //註冊關閉檢舉燈箱的click事件
    $(document).on('click', '.reportCancel', function closeEventReport() {
        let eventreport_back = $('#eventreport_back');
        eventreport_back.css('display', 'none');

    });
    //註冊送出檢舉的click事件
    $(document).on('click', '.reportEnter', function insertRow(e) {
        //阻止預設送出事件
        e.preventDefault();

        //先抓取被選到的 揪團編號
        let event_number = $('.eventinfo_back').attr('psn');
        // children = $('#eventinfoLight').children().length; //6
        // for (i = 0; i < children; i++) {
        //     theCSS = $(`.eventinfo_back:nth-child(${i + 1})`).css('display');
        //     console.log(theCSS)
        //     if (theCSS == 'flex') {
        //         event_number = $(`.eventinfo_back:nth-child(${i + 1})`).attr('psn')
        //     }

        // }
        //再抓檢舉原因
        let eventReportReason = $('input[name=reason]:checked').val();
        //先判斷是否有登入會員
        let login = $('.sign').text();
        // console.log(login); 
        if (login == "登入登入") {  //顯示登入登入--->未登入跳出提醒
            alert("請先登入喔~!");
            return;
        }
        //先判斷是否有選檢舉原因
        if (eventReportReason == null) { //沒選檢舉原因
            alert("原因一定要選喔~~~~");
            return;
        }

        //用那個表單建立一個JS表單物件
        var updateFormData = new FormData();
        updateFormData.append('event_number',event_number);
        updateFormData.append('eventReportReason',eventReportReason);

        //將表單物件的資料送到insertKeyword.php中執行修改資料內容的SQL指令
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                alert("檢舉成功!");
                location.reload();
                //alert(xhr.responseText);
            } else {
                alert(xhr.status + "失敗");
            }
        }

        xhr.open("Post", "./php/insertEventReport.php", true);
        xhr.send(updateFormData);
        let eventreport_back = $('#eventreport_back');
        eventreport_back.css('display', 'none');

    });
    //註冊我要報名click事件
    $(document).on('click', '.btnEnroll', function insertEnroll(e) {
        //阻止預設送出事件
        e.preventDefault();
        //先抓取被選到的 揪團編號+會員編號
        let enroll_event_number = $(this).parent().parent().parent().parent().attr('psn'); //揪團編號
        // let member_number = member_number.memNum; //會員編號

        //先判斷是否有登入會員
        let login = $('.sign').text();
        // console.log(login); 
        if (login == "登入登入") {  //顯示登入登入--->未登入跳出提醒
            alert("請先登入喔~!");
            return;
        }

        // 用那個表單建立一個JS表單物件
        var updateFormData = new FormData();
        updateFormData.append('enroll_event_number', enroll_event_number);

        // 將表單物件的資料送到insertKeyword.php中執行修改資料內容的SQL指令
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                if (xhr.responseText.indexOf("加入成功") != -1) {
                    alert('加入成功');
                    location.reload();
                } else {
                    alert('您可能有加入過囉，請至會員中心查詢');
                }
            } else {
                alert(xhr.status + "失敗");
            }
        }

        xhr.open("Post", "./php/enrollEvent.php", true);
        xhr.send(updateFormData);
        let eventreport_back = $('.eventinfo_back');
        eventreport_back.css('display', 'none');

    });
});



