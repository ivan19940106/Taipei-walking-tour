//抓檢舉資料到後台

function showList(eventReport) {
    let eventReportList = document.getElementById('eventReportList');
    let eventReportTable = JSON.parse(eventReport) //把JSON字串翻譯成JS陣列，陣列內有物件，(每個row是一個物件)
    let html="";

    //根據傳回的列數動態新增表格
    for (i = 0; i < eventReportTable.length; i++) {
        html += `
        <tr class="row">
            <td class="col-1">${eventReportTable[i].event_report_number}</td>
            <td class="col-2">${eventReportTable[i].event_number}</td>
            <td class="col-2">${eventReportTable[i].origin_member_number}</td>
            <td class="col-3">${eventReportTable[i].event_name}</td>
            <td class="col-3">${eventReportTable[i].event_reprt_reason}</td>
            <td class="col-1">${eventReportTable[i].event_reprt_reason}
                <button class="btn btn-outline-success btn-sm updateBtn">保留</button>
                <button class="btn btn-outline-danger btn-sm deleteBtn">刪除</button>
            </td>
        </tr>
        `
        }   
    eventReportList.innerHTML = html;
}




function getEventReportList() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //到php撈所有檢舉揪團資料
            showList(xhr.responseText);
        } else {
            alert(xhr.status + "失敗");
        }
    }

    xhr.open("Get", "./php/getEventReportList.php", true);
    xhr.send(null);
}



window.addEventListener('load', getEventReportList());