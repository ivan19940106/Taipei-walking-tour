//取得目前登入的會員資料 函式
let loginStatus = $(".sign").text();
let member;
function getLoginInfo() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        member = JSON.parse(xhr.responseText);
    }
    xhr.open("get", "./php/loginInfoForFront.php", true);
    xhr.send(null);
};

// 顯示揪團
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
function getEventCards() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            // 新增卡片
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
            alert(xhr.status);
        }

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
            updateFormData.append('event_number', event_number);
            updateFormData.append('eventReportReason', eventReportReason);

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
        LightEventinfo(xhr.responseText);
    }
    xhr.open("post", "./php/getEventForIndex.php", true);
    xhr.send(null);

}

//檢舉心情 函式
function reportMood() {
    loginStatus = $(".sign").text();
    let moodNum = $("#msgMoodNum").val();
    let reason = $('input[name=reportReason]:checked').val();
    if (loginStatus == "登入登入") {
        $("#loginBlock").css("display", "block");
    } else if (reason == null) {
        alert("請選擇檢舉原因");
    } else {
        let reportForm = new FormData();
        reportForm.append('moodNum', moodNum);
        reportForm.append('reason', reason);

        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                alert("謝謝您的檢舉!我們會盡快處理");
                $(".reportLightBox").css("display", "none");
            } else {
                alert(xhr.status + "失敗");
            }
        }

        xhr.open("Post", "./php/insertMoodReport.php", true);
        xhr.send(reportForm);
    }
}

//留言 函式
function leaveMsg() {
    loginStatus = $(".sign").text();
    let msg = $("#leaveMsg").val();
    let moodNum = $("#msgMoodNum").val();
    if (loginStatus == "登入登入") {
        $("#loginBlock").css("display", "block");
    } else if (msg == "") {
        alert("請輸入留言內容");
    } else {
        let msgFrom = member.memName; //抓到目前登入的會員暱稱
        let leaveMsgForm = new FormData();
        leaveMsgForm.append('msgFrom', msgFrom);
        leaveMsgForm.append('leaveMsg', msg);
        leaveMsgForm.append('msgMoodNum', moodNum);

        //即時新增一個留言div
        let messageWrap = document.getElementById("messageWrap");
        let msgHtml = "";
        msgHtml += `
                    <span>${msgFrom}</span> 說: <br>
                    <p>${msg}</p>
                `;
        let msgBox = document.createElement("div");
        msgBox.setAttribute("class", "messageBox");
        msgBox.innerHTML = msgHtml;
        messageWrap.append(msgBox);

        //留言資料送到insertMessage.php執行 寫入資料庫
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                // alert(xhr.responseText);
            } else {
                alert(xhr.status + "失敗");
            }
        }

        xhr.open("Post", "./php/insertMessage.php", true);
        xhr.send(leaveMsgForm);

        $("#leaveMsg").val(""); //留言輸入框重置
    }
}

//動態顯示心情燈箱內資料 函式
function showMoodDatail(moodDatailData) {
    let moodLightBox = document.getElementById('moodLightBox');
    let DatailAll = JSON.parse(moodDatailData);
    // console.log(DatailAll);
    let html = "";
    html += `
        <div class="moodDetailBlock">
            <!-- 檢舉按鈕 -->
            <div id="reportBtn">
                <span class="dot1"></span>
                <span class="dot2"></span>
            </div>
            <!-- 叉叉按鈕 -->
            <div id="closeMoodBtn">
                <span class="line1"></span>
                <span class="line2"></span>
            </div>
            <!-- 左邊區塊 -->
            <div class="moodDetailLeftBox">
                <div class="moodDetailInfoBar">
                    <div class="moodDetailMemberPhoto"><img src="./img/memberPhoto/${DatailAll.moodData.member_photo}"></div>
                    <div class="moodDetailInfoWrap">
                        <span class="moodDetailClass">#${DatailAll.moodData.mood_class}</span>
                        <div class="moodDetailInfoBox">
                            <span class="moodDetailMemId">${DatailAll.moodData.member_name}</span>
                            <span class="moodDetailDate">${DatailAll.moodData.mood_date}</span>
                        </div>
                    </div>
                </div>

                <div class="moodDetailPhotoWrap">
                    <img src="./img/moodPhoto/${DatailAll.moodData.mood_photo}">
                </div>
                
                <div class="moodDetailContent">
                    ${DatailAll.moodData.mood_content}
                </div>
            </div>
            <!-- 右邊區塊 -->
            <div class="moodDetailRightBox">
                <h2>留言板</h2>
                <div class="messageWrap" id="messageWrap">`
    for (m = 0; m < DatailAll.moodMsg.length; m++) {
        html += `
                        <div class="messageBox">
                            <span>${DatailAll.moodMsg[m].message_from}</span> 說: <br>
                            <p>${DatailAll.moodMsg[m].message_content}</p>
                        </div>
                        `
    }
    html += `</div>
                <form id="leaveMsgForm">
                    <input type="text" name="msgContent" id="leaveMsg" placeholder="寫下留言">
                    <input type="hidden" name="msgMoodNum" id="msgMoodNum" value="${DatailAll.moodData.mood_number}">
                    <input type="hidden" name="msgFrom" id="msgFrom" value="">
                </form>
                <button class="btnPink" id="leaveMsgBtn">送出</button>
            </div>
        </div>

        <!-- 檢舉 燈箱 -->
        <div class="reportLightBox">
            <div class="reportBlock">
                <h2>協助我們了解情況?</h2>
                <form id="reportForm">
                    <div>
                        <input type="radio" name="reportReason" id="reason1" value="色情暴力等不當內容"> <label for="reason1">色情暴力等不當內容</label>
                    </div>
                    <div>
                        <input type="radio" name="reportReason" id="reason2" value="歧視謾罵他人"> <label for="reason2">歧視謾罵他人</label>
                    </div>
                    <div>
                        <input type="radio" name="reportReason" id="reason3" value="其他違規違法項目"> <label for="reason3">其他違規違法項目</label>
                    </div>
                    <input type="hidden" name="reportMoodNum" value="${DatailAll.moodData.mood_number}">
                </form>
                <div>
                    <button class="btnPink" id="newReportBtn">確定</button>
                    <button class="btnPink" id="closeReportBtn">取消</button>
                </div>
            </div>
        </div>
    `
    moodLightBox.innerHTML = html;

    //關燈箱
    $("#closeMoodBtn").on("click", function () {
        $(".moodLightBox").css("display", "none");
    })

    //檢舉 燈箱的開、關----------------------------------
    $("#reportBtn").on("click", function () {
        $(".reportLightBox").css("display", "flex");
    })
    $("#closeReportBtn").on("click", function () {
        $(".reportLightBox").css("display", "none");
    })

    //檢舉 確定按鈕的click事件
    $("#newReportBtn").on("click", function () {
        reportMood();
    })

    //留言 送出按鈕的click事件
    $("#leaveMsgBtn").on("click", function () {
        leaveMsg();
    })
}

//動態新增心情卡片 函式
function showCards(moodData) {
    let moodCardsWrap = document.getElementById('moodCardsWrap');
    let moodAll = JSON.parse(moodData) //把JSON字串翻譯成JS物件，物件有兩個屬性，屬性的內容是陣列，陣列的一個索引指向一張卡片
    // console.log(moodAll);

    let html = "";
    //根據moodCard的長度數動態新增卡片
    for (i = 0; i < moodAll.moodCard.length; i++) {

        html += `
                <div class="moodCard">
                    <input type="hidden" name="cardMoodNum" class="cardMoodNum" value="${moodAll.moodCard[i].mood_number}">
                    <div class="cardInfoBar">
                        <div class="moodMemberPhoto"><img src="./img/memberPhoto/${moodAll.moodCard[i].member_photo}"></div>
                        <div class="infoTextWrap">
                            <span class="moodClass">#${moodAll.moodCard[i].mood_class}</span>
                            <div class="moodInfoBox">
                                <span class="moodMemId">${moodAll.moodCard[i].member_name}</span>
                                <span class="moodDate">${moodAll.moodCard[i].mood_date}</span>
                            </div>
                        </div>
                    </div>
                    <div class="moodPicWrap">
                        <img src="./img/moodPhoto/${moodAll.moodCard[i].mood_photo}" class="moodPic">
                    </div>
                    <div class="heartBar">
                        <img src="./img/index/moodLikeIconGray.png" class="heartIcon">
                        <span class="heartCountBoard">${moodAll.moodCard[i].mood_heart}</span>
                        <img src="./img/index/moodChatIcon.png"class="chatIcon">
                        <span class="msgCount">${moodAll.moodMsg[i]['moodMsgCount']}</span>
                    </div>
                    <div class="cardText">
                        <p>
                        ${moodAll.moodCard[i].mood_content}
                        </p>
                        <span class="cardMoreBtn">more</span>
                    </div>
                </div>
                `
    }
    moodCardsWrap.innerHTML = html;

    //心情詳細 燈箱的開-------------------------------
    $(".cardMoreBtn").on("click", function () {
        //-------------撈取此張卡片的資料--------------------------
        let thisMoodNum = $(this).parent().parent().children().first().val();
        document.getElementById("moodNumFormInput").value = thisMoodNum;
        let moodNumForm = new FormData(document.getElementById("moodNumForm"));

        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                showMoodDatail(xhr.responseText);
            } else {
                alert(xhr.status + "失敗");
            }
        }

        xhr.open("Post", "./php/getMoodDatail.php", true);
        xhr.send(moodNumForm);
        //----------------------------------------------------
        $(".moodLightBox").css("display", "flex");
    })

    //愛心icon的click事件
    $(".heartIcon").on("click", function (e) {
        e.target.src = "./img/index/moodLikeIcon.png"
        let thisMoodNum = $(this).parent().parent().children().first().val();
        let thisHeartCount = $(this).next().text();
        $(this).next().text(parseInt(thisHeartCount) + 1);
        let heartFormData = new FormData();
        heartFormData.append('moodNum', thisMoodNum);
        heartFormData.append('heartCount', thisHeartCount);


        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                //即時更新網頁上的愛心數

            } else {
                alert(xhr.status + "失敗");
            }
        }

        xhr.open("Post", "./php/addMoodHeart.php", true);
        xhr.send(heartFormData);

        $(this).off("click");
    })

}
//撈取心情卡片 函式
function getMoodCards() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //到php撈所有心情的資料，送到showCards函式中執行
            showCards(xhr.responseText);
            // console.log(JSON.parse(xhr.responseText));
        } else {
            alert(xhr.status + "失敗");
        }
    }
    xhr.open("Get", "./php/indexGetMoodCards.php", true);
    xhr.send(null);
}


window.addEventListener('load', function () {

    //取得登入資料---------------------------------
    getLoginInfo();

    //撈取心情卡片---------------------------------
    getMoodCards();

    //撈取揪團卡片---------------------------------
    getEventCards();


})
