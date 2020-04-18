function stayRow(event_report_number) {

    //把抓到的值放到html中一個隱藏的表單內
    document.getElementById("event_report_number").value = event_report_number;


    //用那個表單建立一個JS表單物件
    var updateFormData = new FormData(document.getElementById("myForm"));

    //將表單物件的資料送到stayEventReport.php中執行修改資料內容的SQL指令
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            // alert(xhr.responseText);
        } else {
            alert(xhr.status + "失敗");
        }
    }

    xhr.open("Post", "./php/stayEventReport.php", true);
    xhr.send(updateFormData);

    location.reload();
    alert("成功處理一筆檢舉!");
}



function checkStay() {
    //先抓取被點"刪除"按鈕的那一列，每個欄位內的值
    let event_report_number = $(this).parent().parent().children().first().text();
    // console.log(event_report_number)
    //彈出確認視窗，如果選擇確定，再執行stayRow
    if (confirm("確定保留此筆揪團嗎?")) {
        stayRow(event_report_number);
    }
}

//註冊每個刪除button的click事件
$(document).on('click', '.updateBtn', checkStay);