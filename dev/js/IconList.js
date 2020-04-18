function $id(id) {
    return document.getElementById(id);
}
// var iconclick='';

// 動態新增卡片
function IconList(icon) {
    let iconchoose = $id("iconchoose");
    let iconTable = JSON.parse(icon); //把JSON字串翻譯成JS
    let html = "";

    for (i = 0; i < iconTable.length; i++) {

        html += `
        <div class="icon" id="icon_${iconTable[i].customized_product_number}">
        <img src="./img/postcard/${iconTable[i].customized_product_url}">
    </div>
        `;
    }
    iconchoose.innerHTML = html;
}

// 確定是否有撈到資料
function check() {
    let xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status == 200) {
            //正確到php撈資料
            IconList(xhr.responseText);
        } else {
            alert(xhr.status);
        }

    };
    xhr.open("Get", "./php/IconList.php", true);
    xhr.send(null);
}


window.addEventListener("load", check());