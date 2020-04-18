function deleteRow(keywordNo) {

    //把抓到的值放到html中一個隱藏的表單內
    document.getElementById("keywordNo").value = keywordNo;

    //用那個表單建立一個JS表單物件
    var updateFormData = new FormData(document.getElementById("myForm"));

    //將表單物件的資料送到deleteKeyword.php中執行修改資料內容的SQL指令
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            alert(xhr.responseText);
        } else {
            alert(xhr.status + "失敗");
        }
    }

    xhr.open("Post", "./php/deleteKeyword.php", true);
    xhr.send(updateFormData);

    location.reload();
    alert("刪除關鍵字成功!");
}



function checkDelete(){
    //先抓取被點"刪除"按鈕的那一列，每個欄位內的值
    let keywordNo = $(this).parent().parent().children().first().text();
    
    //彈出確認視窗，如果選擇確定，再執行deleteRow
    if (confirm("確定要刪除關鍵字嗎?")) {
        deleteRow(keywordNo);
      }
}

//註冊每個刪除button的click事件
$(document).on('click', '.deleteBtn', checkDelete);