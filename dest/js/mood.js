let filterClass = "all";
let filterOrder = "mood_number";

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

//檢舉 函式
function reportMood(){
    loginStatus = $(".sign").text();
    let moodNum = $("#msgMoodNum").val();
    let reason = $('input[name=reportReason]:checked').val();
    if(loginStatus == "登入登入"){
        $("#loginBlock").css("display", "block");
    }else if(reason == null){
        alert("請選擇檢舉原因");
    }else{
        let reportForm = new FormData();
        reportForm.append('moodNum',moodNum);
        reportForm.append('reason',reason);

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
function leaveMsg(){
    loginStatus = $(".sign").text();
    let msg = $("#leaveMsg").val();
    let moodNum = $("#msgMoodNum").val();
    if(loginStatus == "登入登入"){
        $("#loginBlock").css("display", "block");
    }else if(msg == ""){
        alert("請輸入留言內容");
    }else{
        let msgFrom = member.memName; //抓到目前登入的會員暱稱
        let leaveMsgForm = new FormData();
        leaveMsgForm.append('msgFrom',msgFrom);
        leaveMsgForm.append('leaveMsg',msg);
        leaveMsgForm.append('msgMoodNum',moodNum);
        
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
function showMoodDatail(moodDatailData){
    let moodLightBox = document.getElementById('moodLightBox');
    let DatailAll = JSON.parse(moodDatailData);
    // console.log(DatailAll);
    let html = "";
    html +=`
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
                    for(m = 0; m<DatailAll.moodMsg.length; m++){
                        html += `
                        <div class="messageBox">
                            <span>${DatailAll.moodMsg[m].message_from}</span> 說: <br>
                            <p>${DatailAll.moodMsg[m].message_content}</p>
                        </div>
                        `
                    }
        html +=`</div>
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
    $("#newReportBtn").on("click",function(){
        reportMood();
    })

    //留言 送出按鈕的click事件
    $("#leaveMsgBtn").on("click",function(){
        leaveMsg();
    })
}


//動態新增心情卡片 函式
function showCards(moodData){
    let moodCardsWrap = document.getElementById('moodCardsWrap');
    let moodAll = JSON.parse(moodData) //把JSON字串翻譯成JS物件，物件有兩個屬性，屬性的內容是陣列，陣列的一個索引指向一張卡片
    // console.log(moodAll);

    let html = "";
    //根據moodCard的長度數動態新增卡片
    for (i = 0; i < moodAll.moodCard.length; i++) {

        html += `
                <div class="moodCard wow fadeInUp">
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
    $(".heartIcon").on("click",function(e){
        e.target.src = "./img/index/moodLikeIcon.png"
        let thisMoodNum = $(this).parent().parent().children().first().val();
        let thisHeartCount = $(this).next().text();
        $(this).next().text(parseInt(thisHeartCount) + 1);
        let heartFormData = new FormData();
        heartFormData.append('moodNum',thisMoodNum);
        heartFormData.append('heartCount',thisHeartCount);


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


//更改排序方式 函式
// function changeOrder(){
//     let moodClass = $(".showFilter")[0].innerText;
//     let orderSelect = $("#orderSelect").val(); 
//     console.log(moodClass,orderSelect);

//     let formData = new FormData()
//     formData.append('moodClass',moodClass);
//     formData.append('orderSelect',orderSelect);

//     let xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//         if (xhr.status == 200) {
//             alert(xhr.responseText)
//             showCards(xhr.responseText);
//         } else {
//             alert(xhr.status + "失敗");
//         }
//     }
//     xhr.open("Post", "./php/getMoodCardsOrderBy.php", true);
//     xhr.send(formData);
// }

//撈取心情卡片 函式
// function getMoodCards(moodClass) {
//     let xhr = new XMLHttpRequest();
//     let url = "./php/getMoodCards" + moodClass + ".php";
//     console.log(url);
//     xhr.onload = function () {
//         if (xhr.status == 200) {
//             //到php撈所有心情的資料，送到showCards函式中執行
//             showCards(xhr.responseText);
//             console.log(JSON.parse(xhr.responseText));
//         } else {
//             alert(xhr.status + "失敗");
//         }
//     }
//     xhr.open("Get", url, true);
//     xhr.send(null);
// }
function getMoodCards() {
    // console.log(filterClass,filterOrder)
    let data_info = `moodOrder=${filterOrder}&moodClass=${filterClass}`;
    // console.log(data_info)
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
    xhr.open("Get", "./php/getMoodCards.php?"+data_info, true);
    xhr.send(data_info);
}



//新增心情 預覽上傳圖片處理函式---------------------------
function imgChange() {
    let file = document.getElementById('inputImg').files[0];
    //============讀取檔案內容(圖片)
    let readFile = new FileReader();  //---物件
    readFile.readAsDataURL(file);
    readFile.addEventListener('load', function () {
        let image = document.getElementById('viewImg');
        image.src = this.result;
    });
}

window.addEventListener('load', function () {
    
    //撈取心情卡片---------------------------------
    getMoodCards();

    //取得登入資料
    getLoginInfo();

    //註冊4顆心情分類按鈕的click事件
    $(".filter").on("click",function(){
        filterClass = $(this).children().first().val();
        getMoodCards();
    });

    //註冊排序方式select的onchange事件
    $("#orderSelect").on("change",function(e){
        filterOrder = e.target.value;
        getMoodCards();
    });
    

    //新增心情 燈箱的開、關--------------------------
    $("#newMoodBtn").on("click", function () {
        if(member.memNum){
            $("#newMoodLightBox").css("display", "flex");
        }else{
            $("#loginBlock").css("display", "block");
        }
    })
    $("#closeNewMoodBtn").on("click", function () {
        $("#newMoodLightBox").css("display", "none");
    })

    //新增心情 註冊預覽上傳圖片---------------------------
    document.getElementById('inputImg').onchange = imgChange;

    //新增心情 送出按鈕的click事件--------
    $("#newMoodPostBtn").on("click",function(){
        if($("#moodContent").val() == false){
            alert("請輸入心情內容");
        }else if(document.getElementById('inputImg').files[0] == undefined){
            alert("請上傳圖片");
        }else{
            let moodClass = $("#moodClass").val();
            let moodContent = $("#moodContent").val();
            let moodPic = document.getElementById('inputImg').files[0];
            let moodMemNum = member.memNum;
            let newMoodForm = new FormData();
            newMoodForm.append('moodClass',moodClass);
            newMoodForm.append('moodContent',moodContent);
            newMoodForm.append('moodPic',moodPic);
            newMoodForm.append('moodMemNum',moodMemNum);

            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    location.reload();
                } else {
                    alert(xhr.status + "失敗");
             }
            }
            xhr.open("Post", "./php/insertMood.php", true);
            xhr.send(newMoodForm);
        }
    })
})
