window.addEventListener('load', function () {
    let member;
    // 判斷各頁面是否再登入狀態
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        member = JSON.parse(xhr.responseText);
        // console.log(member)
        if (member.memAcc) {
            // 登入 換成 登出
            $(".sign").text("登出");
            let memPhoto = `<img src="./img/memberPhoto/${member.memPhoto}">`;
            $('.memberPhoto').html(memPhoto);
            let memPoint = member.memPoint + "點";
            $(".point").html(memPoint);
            $('.memberPhoto').css('background-color', '#fff');
            $('.memberPhoto').css('box-shadow', '1px 1px 2px rgba(0,0,0,.4)');
        }
    }
    xhr.open("get", "./php/loginInfoForFront.php", true);
    xhr.send(null);
})
