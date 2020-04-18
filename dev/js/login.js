
//按右上跳登入
$(".sign").click(function (e) {
    e.preventDefault();
    $(".login").attr("style", "display:block")
});

//按登入頁的註冊 跳註冊
$(".login_register").click(function () {
    $(".login_all_all").css("display", "none");
    $(".register").attr("style", "display:block");
})
//按登入頁的找回密碼 跳找回
$(".findpsw").click(function () {
    $(".login_all_all").css("display", "none");
    $(".forgetpsw").attr("style", "display:block");
})
//按找回密碼頁的返回 跳登入頁
$(".forgetpsw_back").click(function () {
    $(".forgetpsw").attr("style", "display:none");
    $(".login_all_all").css("display", "block");

})
//按找回註冊頁的返回 跳登入頁
$(".register_back").click(function () {
    $(".register").attr("style", "display:none");
    $(".login_all_all").css("display", "block");

})
//按右上XX 關掉登入燈箱
$(".login_close").click(function () {
    $(".login").attr("style", "display:none");
    //跳回登入畫面
    $(".login_all_all").css("display", "block");
    $(".register").attr("style", "display:none");
    $(".forgetpsw").attr("style", "display:none");
})
// $(".login").click(function(e){
//     e.stopPropagation();

//     $(".login").attr("style","display:none");
//     //跳回登入畫面
//     $(".login_all_all").css("display","block");
//     $(".register").attr("style","display:none");
// })



//判斷會員登入欄位空值否
$("#login_login").click(function () {
    if (document.getElementById("login_acc").value.length == 0) {
        alert("登入帳號不能為空");
        document.getElementById("login_acc").focus();
        return
    }
    if (document.getElementById("login_psw").value.length == 0) {
        alert("登入密碼不能為空");
        document.getElementById("login_psw").focus();
        return
    }
    document.getElementById("member_login").submit();
})
//判斷註冊欄位的規則
$("#login_register").click(function(){
    if (document.getElementById("register_acc").value.length == 0) {
        alert("帳號不能為空");
        document.getElementById("register_acc").focus();
        return
    }
    if (document.getElementById("register_email").value.length == 0) {
        alert("信箱不能為空");
        document.getElementById("register_email").focus();
        return
    }
    if (document.getElementById("register_psw").value.length == 0) {
        alert("密碼不能為空");
        document.getElementById("register_psw").focus();
        return
    }
    if (document.getElementById("register_psw_dou").value.length == 0) {
        alert("確認密碼不能為空");
        document.getElementById("register_psw_dou").focus();
        return
    }
    //信箱規則
    //至少@ .
    let email_check =/(?=.*[@])(?=.*[.])/;
    if(email_check.test(document.getElementById("register_email").value)){
    }else{
        alert("信箱格式錯誤");
        document.getElementById("register_email").focus();
        return
    }
    //密碼規則
    //至少一數字一英文
    let psw_check =/(?=.*[a-z])(?=.*[0-9])/i;
    if(psw_check.test(document.getElementById("register_psw").value)){
    }else{
        alert("密碼至少英數字各一");
        document.getElementById("register_psw").focus();
        return
    }

    //密碼和確認密碼一樣否
    if(document.getElementById("register_psw").value != document.getElementById("register_psw_dou").value){
        alert("兩組密碼不一致");
        return
    }
    document.getElementById("member_register").submit();


});
//判斷找回密碼欄位空值否
$("#login_forgetpsw").click(function () {
    if (document.getElementById("find_acc").value.length == 0) {
        alert("帳號不能為空");
        document.getElementById("find_acc").focus();
        return
    }
    if (document.getElementById("find_email").value.length == 0) {
        alert("信箱不能為空");
        document.getElementById("find_email").focus();
        return
    }
    //信箱規則
    //至少@ .
    let email_check =/(?=.*[@])(?=.*[.])/;
    if(email_check.test(document.getElementById("find_email").value)){
    }else{
        alert("信箱格式錯誤");
        document.getElementById("find_email").focus();
        return
    }
    document.getElementById("member_findpsw").submit();

})