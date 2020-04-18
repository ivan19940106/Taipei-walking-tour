function showPhoto() {
    let showPhoto = document.getElementsByClassName("showPhoto");
    let btnShow = document.getElementsByClassName("btnShow");
    for (let i = 0; i < showPhoto.length; i++) {
        btnShow[i].onchange = function (e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = function (e) {
                showPhoto[i].src = reader.result;
            }
            reader.readAsDataURL(file);
        }
    }
}

window.addEventListener("load", function () {
    showPhoto();
    // 按下新增按鈕，資料會存到資料庫中
    $(document).on('click', '.btnAdd', function editBackAttraction() {
        // 取得新增表單的值
        let attrName = document.getElementById("attrName").value;
        let attrAddress = document.getElementById("attrAddress").value;
        let attrInfo1 = document.getElementById("attrInfo1").value;
        let attrInfo2 = document.getElementById("attrInfo2").value;
        let attrPhoto1 = document.getElementById("attrPhoto1").files[0];
        let attrPhoto2 = document.getElementById("attrPhoto2").files[0];
        let attrLongitude = document.getElementById("attrLongitude").value;
        let attrLatitude = document.getElementById("attrLatitude").value;
        let attrStatus = document.getElementById("attrStatus").value;
        // 確認
        // console.log(attrName);
        // console.log(attrAddress);
        // console.log(attrInfo1);
        // console.log(attrInfo2);
        // console.log(attrPhoto1);
        // console.log(attrPhoto2);
        // console.log(attrLongitude);
        // console.log(attrLatitude);
        // console.log(attrStatus);

            // 建一個表單物件，將值放入表單物件中
        var editForm = new FormData();
        // 檢驗
        if (attrName == "") {
            alert("請確實填寫名稱！");
            return;
        } else if (attrAddress == "") {
            alert("請確實填寫地址！");
            return;
        } else if (attrInfo1 == "") {
            alert("請確實填寫資訊1！");
            return;
        } else if (attrInfo2 == "") {
            alert("請確實填寫資訊2！");
            return;
        } else if (attrPhoto1 == "") {
            alert("請確實放上照片1！");
            return;
        } else if (attrPhoto2 == "") {
            alert("請確實放上照片2！");
            return;
        } else if (attrLongitude == "") {
            alert("請確實填寫經度！");
            return;
        } else if (attrLatitude == "") {
            alert("請確實填寫緯度！");
            return;
        } else if (attrStatus == "") {
            alert("請確實填寫狀態！");
            return;
        } else {

            editForm.append('attrName', attrName);
            editForm.append('attrAddress', attrAddress);
            editForm.append('attrInfo1', attrInfo1);
            editForm.append('attrInfo2', attrInfo2);
            editForm.append('attrPhoto1', attrPhoto1);
            editForm.append('attrPhoto2', attrPhoto2);
            editForm.append('attrLongitude', attrLongitude);
            editForm.append('attrLatitude', attrLatitude);
            editForm.append('attrStatus', attrStatus);
            // console.log(editForm)
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    alert("新增景點成功！");

                } else {
                    alert(xhr.status);
                }
            }
            xhr.open("post", "./php/attractionAdd.php", true);
            xhr.send(editForm); // 傳送表單物件
            location.reload();
        }
    });
});


