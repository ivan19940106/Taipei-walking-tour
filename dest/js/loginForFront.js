function $id(id) {
    return document.getElementById(id);
}
// login、logout 事件
// let member;
// // 判斷各頁面是否再登入狀態
// function getLoginInfo() {
//     let xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//         member = JSON.parse(xhr.responseText);
//         console.log(member)
//         if (member.memAcc) {
//             // 登入 換成 登出
//             $(".sign").text("登出");
//             let memPhoto = `<img src="./img/memberPhoto/${member.memPhoto}">`;
//             $('.memberPhoto').html(memPhoto);
//             let memPoint = member.memPoint + "點";
//             $(".point").html(memPoint);
//         }
//     }
//     xhr.open("get", "./php/loginInfoForFront.php", true);
//     xhr.send(null);
// }; //

function memberCenter() {
    let login = document.querySelectorAll('.sign')[0];
    console.log(login.innerHTML)
    $(".memberPhoto").click(function () {
        if (login.innerHTML == "登入") {
            $(".login").attr("style", "display:block");
        }else{
            $(this).attr('href', './member.html');
        }
    })
}

window.addEventListener("load", function () {
    memberCenter();
    let member;
    // // 檢查是否為登入狀態
    // getLoginInfo();
    // 登入事件
    // 按右上 .sign，當是登入...；當是登出時...
    $(".sign").click(function () {
        //檢查是登入或是登出狀態
        //如果是登入，就顯示燈箱
        //如果是登出，將登入者資料清除，並且將 .sign 登出改成登入
        if (this.innerHTML == "登入") {
            $(".login").attr("style", "display:block");
        } else { // 登出
            // 至 server端，登出 session
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {  //自server正確的登出
                    location.reload();
                    $('.sign').text("登入");
                    let memPhoto = `<img src="./img/header/navMember.png">`;
                    $('.memberPhoto').html(memPhoto);
                    let memPoint = "";
                    $(".point").html(memPoint);

                } else {
                    alert(xhr.status);
                }
            }
            xhr.open("get", "./php/logout.php", true);
            xhr.send(null);
        }

    });

    // 在燈箱按登入
    // step1 判斷登入者帳號、密碼是否填寫正確
    // step2 至server端取得登入者的資訊
    $("#login_login").click(function () {

        let login_acc = $id("login_acc").value;
        let login_psw = $id("login_psw").value;
        // 登入資訊
        let data_info = `login_acc=${login_acc}&login_psw=${login_psw}`;
        // console.log(data_info);

        if (login_acc.length == 0) {
            alert("請填寫正確的帳號");
            this.focus();
            return;
        } else if (login_psw.length == 0) {
            alert("請填寫正確的密碼");
            this.focus();
            return;
        } else {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    if (xhr.responseText.indexOf("error") != -1) {
                        alert("請填寫正確的帳號或密碼哦！");
                        // 直接清除錯誤的登入資訊

                        xhr.open("get", "./php/logout.php", true);
                        xhr.send(null);
                    } else {
                        member = JSON.parse(xhr.responseText);
                        // console.log(member);
                        location.reload();
                        $(".sign").text("登出");
                        let memPhoto = `<img src="./img/memberPhoto/${member.memPhoto}">`;
                        $('.memberPhoto').html(memPhoto);

                        let memPoint = member.memPoint + "點";
                        $(".point").html(memPoint);

                    }
                } else {
                    alert(xhr.status);
                }
            }
            xhr.open("Post", "./php/loginForFront.php", true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(data_info);
        }
        // 將登入表單上的資料清空，並隱藏起來
        $id('loginBlock').style.display = 'none';
        $id('login_acc').value = '';
        $id('login_psw').value = '';
    });

    // 註冊事件
    // 登入頁的註冊按鈕
    $(".login_register").click(function () {
        $(".login_all_all").css("display", "none");
        $(".register").attr("style", "display:block");
    })
    //判斷註冊欄位的規則
    $("#login_register").click(function () {
        if ($id("register_acc").value.length == 0) {
            alert("帳號不能為空");
            $id("register_acc").focus();
            return
        }
        if ($id("register_email").value.length == 0) {
            alert("信箱不能為空");
            $id("register_email").focus();
            return
        }
        if ($id("register_psw").value.length == 0) {
            alert("密碼不能為空");
            $id("register_psw").focus();
            return
        }
        if ($id("register_psw").value.length < 6) {
            alert("密碼至少6位數");
            $id("register_psw").focus();
            return
        }
        if ($id("register_psw_dou").value.length == 0) {
            alert("確認密碼不能為空");
            $id("register_psw_dou").focus();
            return
        }
        //信箱規則，至少@ .
        let email_check = /(?=.*[@])(?=.*[.])/;
        if (email_check.test($id("register_email").value)) {
        } else {
            alert("信箱格式錯誤");
            $id("register_email").focus();
            return
        }
        //密碼規則，至少一位數字、一位英文
        let psw_check = /(?=.*[a-z])(?=.*[0-9])/i;
        if (psw_check.test($id("register_psw").value)) {
        } else {
            alert("密碼至少英數字各一");
            $id("register_psw").focus();
            return
        }

        //密碼和確認密碼一樣否
        if ($id("register_psw").value != $id("register_psw_dou").value) {
            alert("兩組密碼不一致");
            return
        }
        //檢查完 去註冊
        // document.getElementById("member_register").submit();
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                //modify here
                alert(xhr.responseText);
                //  location.reload();
                //清空註冊頁之值&&關掉登入燈箱
                $id('register_acc').value = '';
                $id('register_nam').value = '';
                $id('register_email').value = '';
                $id('register_psw').value = '';
                $id('register_psw_dou').value = '';
                $(".register").css("display", "none");
                $(".login_all_all").css("display", "block");
                $("#loginBlock").css("display", "none");
            } else {
                alert(xhr.status);
            }
        }
        var url = "./php/member/register.php?register_acc=" + document.getElementById("register_acc").value
            + "&register_nam=" + document.getElementById("register_nam").value
            + "&register_email=" + document.getElementById("register_email").value
            + "&register_psw=" + document.getElementById("register_psw").value;
        // console.log(url);
        xhr.open("Get", url, true);
        xhr.send(null);
    })

    //找回密碼事件
    // 登入頁的找回密碼按鈕
    $(".findpsw").click(function () {
        $(".login_all_all").css("display", "none");
        $(".forgetpsw").attr("style", "display:block");
    })
    //判斷找回密碼欄位空值否
    $("#login_forgetpsw").click(function () {
        if ($id("find_acc").value.length == 0) {
            alert("帳號不能為空");
            $id("find_acc").focus();
            return
        }
        if ($id("find_email").value.length == 0) {
            alert("信箱不能為空");
            $id("find_email").focus();
            return
        }
        //信箱規則，至少@ .
        let email_check = /(?=.*[@])(?=.*[.])/;
        if (email_check.test($id("find_email").value)) {
        } else {
            alert("信箱格式錯誤");
            $id("find_email").focus();
            return
        }
        // ///忘記密碼 發認證信
        // let acc = $("#find_acc").val();
        // let email = $("#find_email").val();
        // // alert(acc);
        // // alert(email);
        // let xhr = new XMLHttpRequest();
        // xhr.onload = function () {
        //     if (xhr.status == 200) {
        //         alert(xhr.responseText);
        //     } else {
        //         alert(xhr.status);
        //     }

        // };
        // $.ajax({
        //     type :"GET",
        //     dataType: "text",
        // });
        // let url = "./php/forgotPassword.php?acc=" + acc
        // + "&email=" + email;
        // console.log(url);
        // xhr.open("Get", url, true);
        // xhr.send(null);

    })

    // 按返回按鈕，回到登入頁
    $(".btnBack").click(function () {
        $(".forgetpsw").attr("style", "display:none");
        $(".register").attr("style", "display:none");
        $(".login_all_all").css("display", "block");
    })

    // 按右上close 關掉燈箱
    $(".login_close").click(function () {
        $(".login").attr("style", "display:none");
        // 清出填寫的資訊
        $id('login_acc').value = '';
        $id('login_psw').value = '';
        // 登入初始畫面
        $(".login_all_all").css("display", "block");
        $(".register").attr("style", "display:none");
        $(".forgetpsw").attr("style", "display:none");
    })


})