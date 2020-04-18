//隱藏心情 函式
function hideMood(moodNum){
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            // alert(xhr.responseText);
        } else {
            alert(xhr.status + "失敗");
        }
    }

    xhr.open("Get", "./php/hideMood.php?moodNum="+moodNum, true);
    xhr.send(null);
}


//刪除檢舉資料 函式
function deleteReport(reportNum){
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            // alert(xhr.responseText);
        } else {
            alert(xhr.status + "失敗");
        }
    }

    xhr.open("Get", "./php/deleteMoodReport.php?reportNum="+reportNum, true);
    xhr.send(null);

    location.reload();
    alert("成功處理一筆檢舉!");
}


//產生檢舉清單 函式
function showList(reportData) {
    let reportList = document.getElementById('reportList');
    let reportTable = JSON.parse(reportData) //把JSON字串翻譯成JS陣列，陣列內有物件，(每個row是一個物件)
    let html="";

    //根據傳回的列數動態新增表格
    for (i = 0; i < reportTable.length; i++) {
        html += `
        <tr class="row">
            <td class="col-1">${reportTable[i].mood_report_number}</td>
            <td class="col-1">${reportTable[i].mood_number}</td>
            <td class="col-7">${reportTable[i].mood_content}</td>
            <td class="col-2">${reportTable[i].mood_report_reason}</td>
            <td class="col-1"> <button class="btn btn-outline-success btn-sm stayBtn">保留</button> <button class="btn btn-outline-danger btn-sm hideBtn">屏蔽</button> </td>
        </tr>
        `
        }   
    reportList.innerHTML = html;

    //保留 按鈕的click事件
    $(".stayBtn").on("click",function(){
        let reportNum = $(this).parent().parent().children().first().text();
        if (confirm("確定保留此筆心情嗎?")) {
            deleteReport(reportNum);
        }
    })
    
    //屏蔽 按鈕的click事件
    $(".hideBtn").on("click",function(){
        let reportNum = $(this).parent().parent().children().first().text();
        let moodNum = $(this).parent().parent().children().first().next().text();
        if (confirm("確定屏蔽此筆心情嗎?")) {
            hideMood(moodNum);
            deleteReport(reportNum);
        }
    })
}




function getMoodReportList() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //到php撈所有機器人關鍵字的資料，送到showList函式中執行
            showList(xhr.responseText);
        } else {
            alert(xhr.status + "失敗");
        }
    }

    xhr.open("Get", "./php/getMoodReportList.php", true);
    xhr.send(null);
}



window.addEventListener('load', getMoodReportList());