function checkRobot(keywords) {
    let keywordTable = JSON.parse(keywords)
    let selects = document.getElementsByClassName("satausInsert");
    for (let i = 0; i < keywordTable.length; i++) {
        if (keywordTable[i].keyword_status == 1) {
            selects[i].options[1].selected = true;
        }else{
            selects[i].options[0].selected = true;
        }
    }
}

function showList(keywords) {
    let keywordWrap = document.getElementById('keywordList');
    let keywordTable = JSON.parse(keywords) //把JSON字串翻譯成JS陣列，陣列內有物件，(每個row是一個物件)
    let html = "";

    //根據傳回的列數動態新增表格
    for (i = 0; i < keywordTable.length; i++) {
        html += `
        <tr class="row">
            <td class="col-1">${keywordTable[i].keyword_number}</td>
            <td class="col-1"> <input type="text" class="form-control" value="${keywordTable[i].keyword_word}"> </td>
            <td class="col-7"> <input type="text" class="form-control" value="${keywordTable[i].keyword_response}"> </td>
            <td class="col-2"> 
                <select class="form-control satausInsert">
                    <option value="0">否</option>
                    <option value="1">是</option>
                </select> 
            </td>
            <td class="col-1"> <button class="btn btn-outline-success btn-sm updateBtn">儲存</button> <button class="btn btn-outline-danger btn-sm deleteBtn">刪除</button> </td>
        </tr>
        `
    }
    keywordWrap.innerHTML = html;
}




function getKeywordList() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //到php撈所有機器人關鍵字的資料，送到showList函式中執行
            showList(xhr.responseText);
            checkRobot(xhr.responseText);
        } else {
            alert(xhr.status + "失敗");
        }
    }

    xhr.open("Get", "./php/getKeywordList.php", true);
    xhr.send(null);
}



window.addEventListener('load', getKeywordList());