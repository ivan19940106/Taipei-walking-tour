//========================= 機器人開關 START =======================
let openBtn = document.getElementById('openBot')
let chatBot = document.getElementById('chatBot')
window.addEventListener('load',function(){
    openBtn.onclick = function(){
        openBtn.classList.toggle("-closeBtn");
        chatBot.classList.toggle("-chatBotOpen");
    }
})
//========================= 機器人開關 END =========================


//======================== 撈取關鍵字標籤 START ====================
function showSpan(keywords) {
    let keywordBar = document.getElementById('keywordBar');
    let keywordTable = JSON.parse(keywords); //把JSON字串翻譯成JS陣列，陣列內有物件，(每個row是一個物件)
    let spanHtml="";

    //根據傳回的列數動態新增span標籤
    for(let i = 0; i < keywordTable.length; i++) {
        spanHtml += `
        <span class="keywordSpan">${keywordTable[i].keyword_word}</span>
        `
    }   
    keywordBar.innerHTML = spanHtml;
}

function getKeywordSpan() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //到php撈所有要顯示標籤的關鍵字，送到showSpan函式中執行
            showSpan(xhr.responseText);
            
        } else {
            alert(xhr.status + "失敗");
        }
    }

    xhr.open("Get", "./php/getKeywordSpan.php", true);
    xhr.send(null);
}
window.addEventListener('load', getKeywordSpan());
//======================== 撈取關鍵字標籤 END ======================



//======================== User點擊關鍵字標籤的處理 START ====================
function showAns(keyword){
    let chatContent = document.getElementById("chatContent");
    let ansTable = JSON.parse(keyword);
    let chatHtml = "";
    // console.log(ansTable);

    chatHtml += `
            <div class="userSay">${ansTable.keyword_word}</div>
            <div class="botSay">${ansTable.keyword_response}</div>
    `
    let chatBox = document.createElement("div");
    chatBox.setAttribute("class", "chatBox");
    chatBox.innerHTML = chatHtml;
    chatContent.append(chatBox);
    chatContent.scrollTop = chatContent.scrollHeight;
}


function getAns(){
    let spanText = $(this).text();
    // console.log(spanText);

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            // console.log(xhr.responseText);
            //到php撈到此關鍵字的資料，送到showAns中執行
            showAns(xhr.responseText);
        } else {
            alert(xhr.status + "失敗");
        }
    }

    let url = "./php/getRobotAns.php?keyword_word=" + spanText;
    // console.log(url);
    xhr.open("Get", url, true);
    xhr.send(null);
}


//----註冊每個關鍵字button的click事件
$(document).on('click', '.keywordSpan', getAns);
//======================== User點擊關鍵字標籤的處理 END ======================



//======================== User輸入對話內容的處理 START ======================
function showAnsByInput(keyword){
    let chatContent = document.getElementById("chatContent");
    let ansTable = JSON.parse(keyword);
    let chatHtml = "";
    // console.log(ansTable);
    if(ansTable.keyword_response){
        chatHtml += `
            <div class="userSay">${ansTable.keyword_word}</div>
            <div class="botSay">${ansTable.keyword_response}</div>
        `
    }else if($('#botInput').val()==false){
        chatHtml += `
            <div class="botSay">啾??公威啊啾～</div>
        `
    }else{
        let inputText = $('#botInput').val();
        chatHtml += `
        <div class="userSay">${inputText}</div>
        <div class="botSay">啾?哩工蝦咪!?</div>
        `
    }
    let chatBox = document.createElement("div");
    chatBox.setAttribute("class", "chatBox");
    chatBox.innerHTML = chatHtml;
    chatContent.append(chatBox);
    chatContent.scrollTop = chatContent.scrollHeight;
    document.getElementById('botInput').value="";
}

function getAnsByInput(){
    let inputText = $('#botInput').val();
    // console.log(inputText);

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            // console.log(xhr.responseText);
            //到php撈到此關鍵字的資料，送到showAnsByInput中執行
            showAnsByInput(xhr.responseText);
        } else {
            alert(xhr.status + "失敗");
        }
    }

    let url = "./php/getRobotAns.php?keyword_word=" + inputText;
    // console.log(url);
    xhr.open("Get", url, true);
    xhr.send(null);
}
//----註冊點擊送出button的click事件
$(document).on('click', '#botInputBtn', getAnsByInput);

$(document).on('keyup', '#botInput', function(e){
    if (e.keyCode != 13) {
        return;
    }
    getAnsByInput(); 
});

// document.getElementById("botInput").onkeyup = function(e) {
//     if (e.keyCode != 13) {
//       return;
//     }
//     getAnsByInput(); 
//   };
//======================== User輸入對話內容的處理 END ======================