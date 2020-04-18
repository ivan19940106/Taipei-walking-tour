
// 開燈箱-檢舉揪團
function showEventReport() {
    let eventreport_back = $('#eventreport_back');
    eventreport_back.css('display', 'flex');
}

// 關燈箱-檢舉揪團
function closeEventReport() {
    let eventreport_back = $('#eventreport_back');
    eventreport_back.css('display', 'none');

}

function insertRow(e) {
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

    ////把抓到的值放到html中一個隱藏的表單內
    document.getElementById("event_number").value = event_number;
    document.getElementById("event_report_reason").value = eventReportReason;

    //-------------------測試值是否正確放入表單--------------------
    // console.log("----------------------");
    // console.log(document.getElementById("event_number").value);
    // console.log(document.getElementById("event_report_reason").value);
    // console.log("----------------------");
    //------------------------------------------------------------

    //用那個表單建立一個JS表單物件
    var updateFormData = new FormData(document.getElementById("eventReportForm"));

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
}
//註冊送出檢舉的click事件
$(document).on('click', '.reportEnter', insertRow);

//註冊開檢舉燈箱...的click事件
$(document).on('click', '.lightReport', showEventReport);

//註冊關閉檢舉燈箱的click事件
$(document).on('click', '.reportCancel', closeEventReport);
