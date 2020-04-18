function $id(id) {
    return document.getElementById(id);
}

function loginInfoBack() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {

        member = JSON.parse(xhr.responseText);
        // console.log(member);
        xhr.open("get", "./php/loginInfoForBack.php", true);
        xhr.send(null);

    };
};
let member;
window.addEventListener("load", function () {
    loginInfoBack();

    $id('loginBack').onclick = function () {
        let memId = $id("memId").value;
        let memPsw = $id("memPsw").value;
        let data_info = `memId=${memId}&memPsw=${memPsw}`;

        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                if (xhr.responseText.indexOf("error") !=-1) {
                    alert("帳號或密碼錯誤！");

                } else {
                    member = JSON.parse(xhr.responseText);
                    // console.log(member);
                    location.href = "./backMember.html";
                }
            } else {
                alert(xhr.status);
            }

        }
        xhr.open("Post", "./php/loginForBack.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data_info);

    }

}, false);