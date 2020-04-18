window.addEventListener("load", function () {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        order_master = JSON.parse(xhr.responseText);
        // console.log(order_master);
        let OrderList = document.getElementById("OrderList");
        let order_masterRow = ``;
        for (i = 0; i < order_master.length; i++) {
            order_masterRow += `
            <tr class="row">
            <th class="col-1">${order_master[i].order_number}</th>
            <th class="col-1">${order_master[i].member_number}</th>
            <th class="col-1">${order_master[i].order_time}</th>
            <th class="col-1">${order_master[i].order_point}</th>
            <th class="col-2">${order_master[i].product_images_url_front}</th>
            <th class="col-2">${order_master[i].product_images_url_back}</th>
            <th class="col-1">${order_master[i].receiver_name}</th>
            <th class="col-1">${order_master[i].receiver_address}</th>
            <th class="col-1"> <input type="text" class="form-control" value="${order_master[i].shopping_status}"> </th>
            <th class="col-1"><button class="updateBtn">儲存</button></th>
        </tr> 
        `;
        OrderList.innerHTML = order_masterRow;
        }
    }
    xhr.open("get", "./php/order_master.php", true);
    xhr.send(null);
    //註冊每個儲存button的click事件
$(document).on('click', '.updateBtn', updateRow);
})

function updateRow() {
    //先抓取被點"儲存"按鈕的那一列，每個欄位內的值
    let OrderNo = $(this).parent().parent().children().first().text();
    let status = $(this).parent().parent().children().eq(8).children().val();
    // console.log(status)
    //把抓到的值放到html中一個隱藏的表單內
    document.getElementById("OrderNo").value = OrderNo;
    document.getElementById("status").value = status;

    //-------------------測試值是否正確放入表單--------------------
    // console.log("----------------------");
    // console.log(document.getElementById("OrderNo").value);
    // console.log(document.getElementById("status").value);
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

    xhr.open("Post", "./php/updateOrder.php", true);
    xhr.send(updateFormData);
}



