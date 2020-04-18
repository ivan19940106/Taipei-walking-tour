window.addEventListener("load", function () {
    // 當按下儲存，取得各欄為的資料

    $(document).on('click', '.btnSave', function editRoute() {
        if (confirm('確定要更改路線資料嗎?')) { // 做一次確認
            let editNum = $(this).parent().parent().children().first().children().text();
            let editName = $(this).parent().parent().children().first().next().children().children().val();
            let editInfo = $(this).parent().parent().children().first().next().next().children().children().val();
            let editStatus = $(this).parent().parent().children().first().next().next().next().next().next().children().children().first().next().next().val();
            // 將各欄位的資料放進隱藏的表單中
            document.getElementById("editNumber").value = editNum;
            document.getElementById("editName").value = editName;
            document.getElementById("editInfo").value = editInfo;
            document.getElementById("editStatus").value = editStatus;
            // 檢驗
            // console.log(document.getElementById("editNumber").innerHTML);
            // console.log(document.getElementById("editName").value);
            // console.log(document.getElementById("editInfo").innerHTML);
            // console.log(document.getElementById("editInfo").value);
            // console.log(document.getElementById("editStatus").value);

            var editForm = new FormData(document.getElementById("editForm"));

            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    alert(xhr.responseText);
                } else {
                    alert(xhr.status);
                }
            }
            xhr.open("post", "./php/backRouteEdit.php", true);
            xhr.send(editForm);
            location.reload();
        }
    });

})