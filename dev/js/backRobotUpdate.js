

function updateRow() {
    //先抓取被點"儲存"按鈕的那一列，每個欄位內的值
    let keywordNo = $(this).parent().parent().children().first().text();
    let keywordWord = $(this).parent().parent().children().first().next().children().val();
    let keywordAns = $(this).parent().parent().children().first().next().next().children().val();
    let keywordStatus = $(this).parent().parent().children().first().next().next().next().children().val();

    //把抓到的值放到html中一個隱藏的表單內
    document.getElementById("keywordNo").value = keywordNo;
    document.getElementById("keywordWord").value = keywordWord;
    document.getElementById("keywordAns").value = keywordAns;
    document.getElementById("keywordStatus").value = keywordStatus;

    //-------------------測試值是否正確放入表單--------------------
    // console.log("----------------------");
    // console.log(document.getElementById("keywordNo").value);
    // console.log(document.getElementById("keywordWord").value);
    // console.log(document.getElementById("keywordAns").value);
    // console.log(document.getElementById("keywordStatus").value);
    // console.log("----------------------");
    //------------------------------------------------------------


    //用那個表單建立一個JS表單物件
    var updateFormData = new FormData(document.getElementById("myForm"));

    //將表單物件的資料送到updateKeyword.php中執行修改資料內容的SQL指令
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            alert(xhr.responseText);
        } else {
            alert(xhr.status + "失敗");
        }
    }

    xhr.open("Post", "./php/updateKeyword.php", true);
    xhr.send(updateFormData);
}



//註冊每個儲存button的click事件
$(document).on('click', '.updateBtn', updateRow);