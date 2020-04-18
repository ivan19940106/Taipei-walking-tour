window.addEventListener("load", function () {
    $(document).on('click', '.btnDel', function editBackRoute() {

        if (confirm('確定要刪除這個路線嗎?')) { // 做一次確認刪除
            // 取得要刪除的景點編號
            let delNum = $(this).parent().parent().children().first().children().text();
            document.getElementById("editNumber").value = delNum;
            // console.log(document.getElementById("editNumber").value)
            // // 放入表單中
            var editForm = new FormData(document.getElementById("editForm"));

            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    if (xhr.responseText == "成功") {
                        alert("刪除路線成功!");
                    }
                    location.reload();
                } else {
                    alert(xhr.status);
                }
            }
            xhr.open("post", "./php/backRouteDel.php", true);
            xhr.send(editForm); // 傳送表單
        }
    });


});


