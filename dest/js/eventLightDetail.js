function $id(id) {
    return document.getElementById(id);
}

// 開燈箱-活動詳情
// function showEventInfo() {
//     let eventinfo_back = document.querySelectorAll(".eventinfo_back");
//     let lightDetail = document.querySelectorAll(".lightDetail");

//     console.log(eventinfo_back);
//     console.log(lightDetail)
//     for (let j = 0; j < eventinfo_back.length; j++) {
//         lightDetail[j].onclick = function (e) {
//             e.preventDefault();
//             eventinfo_back[j].style.display = "flex";

//         }
//     }
// }

// 關燈箱-活動詳情


// // 動態新增燈箱-活動詳情
// function LightEventinfo(event) {
//     let eventinfoLight = $id("eventinfoLight");
//     let eventTable = JSON.parse(event);//把JSON字串翻譯成JS
//     let html = "";

//     for (i = 0; i < eventTable.length; i++) {
//         html += `
//     <div id="event${eventTable[i].event_number}" class="eventinfo_back" psn="${eventTable[i].event_number}">
//         <div class="lightbox_detailevent">
//             <div class="lightbox_detailevent_info">
//                     <div class="close eventinfoClose">✘</div>
//                     <div class="detaileventContent">
//                         <div class="detaileventPic">
//                             <div class="title">
//                                 <div class="eventInfotitle">${eventTable[i].event_name}</div>
//                                 <div class=" dotWrap lightReport">
//                                     <span class="dot"></span>
//                                     <span class="dot"></span>
//                                     <span class="dot"></span>
//                                 </div>
//                             </div>
//                             <div class="detaileventPicbox">
//                                 <img src="./img/eventPhoto/${eventTable[i].event_cover_url}">
//                             </div>
//                             <div class="detaileventRoute">
//                                 <p>${eventTable[i].route_name}</p>
//                                 <p>台北101 -> 台北101 -> 台北101</p>
//                             </div>
//                         </div>
//                         <div class="detaileventText">
//                             <form action="">
//                                 <div class="eventInforow">
//                                     <div class="eventrowTitle">活動日期</div>
//                                     <div>${eventTable[i].event_date}</div>
//                                 </div>
//                                 <div class="eventInforow">
//                                     <div class="eventrowTitle">報名截止日</div>
//                                     <div>${eventTable[i].enroll_end_date}</div>
//                                 </div>
//                                 <div class="eventInforow">
//                                     <div class="eventrowTitle">集合時間</div>
//                                     <div></div>
//                                 </div>
//                                 <div class="eventInforow">
//                                     <div class="eventrowTitle">集合地點</div>
//                                     <div>${eventTable[i].meeting_place}</div>
//                                 </div>
//                                 <div class="eventInforow">
//                                     <div class="eventrowTitle">報名人數上限</div>
//                                      <div>${eventTable[i].max_attendance}位</div>
//                                 </div>
//                                 <div class="eventInforow">
//                                     <div class="eventrowTitle">活動介紹</div>
//                                     <div>${eventTable[i].event_information}</div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                     <div class="enroll">
//                             <a href="#" class="btnRed btnEnroll">
//                             我要報名
//                             </a>
//                     </div>
//             </div>
//         </div>
//     </div>
//         `;
//     }
//     eventinfoLight.innerHTML = html;
//     showEventInfo();
// }


// function check() {
//     let xhr = new XMLHttpRequest();

//     xhr.onload = function () {
//         if (xhr.status == 200) {
//             //正確到php撈資料
//             LightEventinfo(xhr.responseText);

//         } else {
//             alert(xhr.status);
//         }

//     };
//     xhr.open("Get", "./php/getEventCards.php", true);
//     xhr.send(null);
// }


window.addEventListener("load", check());
