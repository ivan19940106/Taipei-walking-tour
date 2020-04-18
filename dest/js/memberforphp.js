let memNum;
//////////////////////////load抓會員資料
//修改會員資料送出
function memberupload() {

};
//上傳圖片會顯示
function memberphoto() {
    document.getElementById("photo_up").onchange = function () {
        // alert("00");
        let file = document.getElementById("photo_up").files[0];
        let readFile = new FileReader();
        readFile.readAsDataURL(file);
        readFile.addEventListener("load", function () {
            image = document.getElementById("photoup")
            image.src = this.result;
        })
    };
};
//編輯會員資料的js
function membermodify() {
    $(".pen").click(function () {
        //動畫停止
        $(this).css("animation", "unset")
        // //title變
        // $(".member_info_info_right div:nth-child(1) span").text("資料編輯中")
        //下面按鈕變
        $(".member_info_info_button>a").css("visibility", "visible");

        //右邊資料欄位變可輸入
        $(".member_info_info_right div input").removeAttr("readonly");
        // $(".member_info_info_right div input").focus("border","3px dashed $importantColor");
        // $(".member_info_info_right div input:nth-child(0)").focus();
        //focus在第一個
        $(".member_info_info_right input ").css("pointer-events", "auto");
        $(".member_info_info_right>div:nth-child(3) input").focus();
        // $(".member_info_info_right div input").css("border","1px solid #646464");
        // $(".member_info_info_right div input:focus").css("border","10px solid #646464");
        // alert($(".member_info_info_right div input").attr("readonly"))
        //左邊照相機出現
        // $(".member_info_info_left div div:nth-child(2) label").css("pointer-events","auto");
        $(".member_info_info_left div div:nth-child(2)").css("display", "inline-block");
        // $(".member_info_info_left>label>div").css("border","1px solid #646464");
        $(".member_info_info_left>label").css("pointer-events", "auto");
        $(".member_info_info_left>label>div").click(function () {
            $(this).css("border", "3px dashed #a5361c");
        })
        //focus
        // $(".member_info_info_right input").focus().css("border","3px dashed $importantColor");
    })
    //下方修改確認 全部回復&&送出
    $(".member_info_info_button>a").click(function () {
        $(this).css("visibility", "hidden");
        $(".pen").css("animation", "jump 1s infinite linear");
        $(".member_info_info_right div input").attr("readonly", "true");
        $(".member_info_info_left div div:nth-child(2)").css("display", "none");
        $(".member_info_info_left>label").css("pointer-events", "none");
        $(".member_info_info_right input ").css("pointer-events", "none");
        $(".member_info_info_left>label>div").css("border", "unset");;


        ////要傳圖 所以要form 傳值
        // alert("123");
        document.getElementById("member_upload").submit();

        


    })
}
//第一頁放資料
function getMemberInfo(memNum) {
    // alert(memNum);
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        memberinfo = JSON.parse(xhr.responseText);
        console.log(memberinfo);
        //點數更新
        let point = document.getElementById("member_point_point");
        point.innerText = `${memberinfo[0].member_point}`;
        //會員資料更新
        let member_info_info_all = document.getElementById("member_info_info_all");
        member_info_info_all.innerHTML = `
        <form action="./php/member/upmemberinfo.php" method="post" enctype="multipart/form-data" id="member_upload">
                                <div class="member_info_info_left">
                                    <div>
                                        <span>我的資料</span>
                                        <img src="./img/member/memberchange.png" alt="" class="pen">
                                    </div>
                                    <label for="photo_up">
                                        <div>
                                            <div>
                                                <img src="./img/memberPhoto/${memberinfo[0].member_photo}" alt="" id="photoup">
                                            </div>
                                            <div>
                                                <label for="photo_up">上傳大頭照
                                                    <img src="./img/member/membercamera.png" alt="">
                                                </label>
                                                <input style="display: none;" type="file" name="photo_up" id="photo_up">
                                            </div>
                                        </div>
                                    </label>



                                </div>
                                <div class="member_info_info_line"></div>
                                <div class="member_info_info_right">
                                    <div>
                                        <span>我的資料</span>
                                        <img src="./img/member/memberchange.png" alt="" class="pen">

                                    </div>
                                    <input type="text" name="member_number" style="display:none" value="${memberinfo[0].member_number}"></input>
                                    <div>
                                        <label for="">帳號 :</label>
                                        <input type="text" readonly value="${memberinfo[0].member_account}" name="member_account">
                                    </div>
                                    <div>
                                        <label for="">密碼 :</label>
                                        <input type="text" readonly value="${memberinfo[0].member_password}" name="member_password">
                                    </div>
                                    <div>
                                        <label for="">暱稱 :</label>
                                        <input type="text" readonly value="${memberinfo[0].member_name}" name="member_name">
                                    </div>
                                    <div>
                                        <label for="">信箱 :</label>
                                        <input type="text" readonly value="${memberinfo[0].member_email}" name="member_email">
                                    </div>
                                </div>
                                <div class="member_info_info_button ">
                                    <a class="btnPink" style="visibility: hidden;">
                                        確認
                                    </a>
                                </div>
                                </form>`
            ;
        //編輯會員資料的js
        membermodify();
        //上傳圖片會顯示
        memberphoto();
    }
    let url = "./php/member/getMemberInfo.php?number=" + memNum;
    console.log(url);
    xhr.open("Get", url, true);
    xhr.send(null);
}
//去php看登入者是誰 取他編號
function getLoginInfo() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        member = JSON.parse(xhr.responseText);
        memNum = member.memNum
        // alert(memNum);
        getMemberInfo(memNum);
    }
    xhr.open("get", "./php/loginInfoForFront.php", true);
    xhr.send(null);
}; //
window.addEventListener("load", function () {
    // alert("讀取");
    getLoginInfo();
    //nav
    //按上面1到6個li 下面會變
    for (let i = 1; i < 7; i++) {
        $(`.member_info_nav ul li:nth-child(${i}) img`).click(function () {
            // $(this).css("border", "1px solid red");
            //圖案會變
            $(this).css("opacity", ".2");
            $(".member_info_nav ul li img").not(this).css("opacity", "0");
            //字會改色
            $(this).parent().css("color", "#a5361c");
            $(".member_info_nav ul li img").not(this).parent().css("color", "#1e1e1e");
            // alert($(this).parent().text());
            //麵包的字會變
            $(".breadCrumb li:nth-child(3) a").text($(this).parent().text());
            //下面div會變
            $(`.member_info>div`).css("display", "none");
            $(`.member_info>div:nth-child(${i + 1})`).css("display", "block");
            // //自己變大
            // $(this).parent().css("transform","scale(1.2)");
            // $(".member_info_nav ul li img").not(this).parent().css("transform","scale(1)");

        });

    };
});