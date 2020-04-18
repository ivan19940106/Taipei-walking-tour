
//////////////////////////load建立管理員&&會員
let staff;
window.addEventListener("load", function () {
    // console.log(location.search.split("?")[1]);
    // if(location.search.split("?")[1]=="aaa"){
    //     alert("新增成功!");
    // }

    // getmanager();
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        staff = JSON.parse(xhr.responseText);
        // console.log(staff);
        let status = "";
        let manager = document.getElementById("manager");
        let staffRow = `<tr>
                <td>編號</td>
                <td>暱稱</td>
                <td>帳號</td>
                <td>密碼</td>
                <td>狀態</td>
                <td></td>
            </tr>`;
        for (let i = 0; i < staff.length; i++) {
            //判斷1或0 改中文
            if (`${staff[i].staff_status}` == 1) {
                status = "停權"
            } else {
                status = "回復"
            }
            staffRow += `
        <tr>
                    <td>${staff[i].staff_number}</td>
                    <td>${staff[i].staff_name}</td>
                    <td>${staff[i].staff_account}</td>
                    <td>${staff[i].staff_password}</td>
                    <td style="display:none"><button>${staff[i].staff_status}</button></td>
                    <td><button class="btn manager_status ">${status}</button></td>
                    <td><button class="btn btn-danger">刪除</button></td>
        </tr>`;
            manager.innerHTML = staffRow;
        }
        //判斷文字 給不同CLASS
        for (let i = 0; i < 100; i++) {
            let status = document.getElementsByClassName("manager_status")[i];
            if ($(status).text() == "停權") {
                $(status).addClass("btn-outline-warning")
            } else {
                $(status).addClass("btn btn-warning")
            }
        }

        //////////////////////////////刪除管理員
        function delmenager(num) {
            // alert(num);
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    //modify here
                    alert(xhr.responseText);
                    location.reload();
                } else {
                    alert(xhr.status);
                }
            }
            var url = "./php/delma.php?number=" + num;
            // console.log(url);
            xhr.open("Get", url, true);
            xhr.send(null);

        }
        for (let i = 1; i < 100; i++) {
            $(`#manager>tbody>tr:nth-child(${i})>td:nth-child(7)>button`).click(function () {
                // $(this).css("border","10px solid red");
                //跳窗給他反悔的機會
                if(confirm("確認刪除管理員嗎??")==true){
                    if(confirm("真的嗎!!")==false){
                        return
                    }
                }else{
                    return
                }
                let num = $(`#manager>tbody>tr:nth-child(${i})>td:nth-child(1)`).text();
                // alert(num);
                delmenager(num);
            })
        }
        //////////////////////////////停權管理員
        // function reloadstatus(){
        //     if( $(`#manager>tbody>tr:nth-child(${i})>td:nth-child(5)>button`).text()==1){
        //         $(`#manager>tbody>tr:nth-child(${i})>td:nth-child(5)>button`).text()=停權
        //     }else{
        //         $(`#manager>tbody>tr:nth-child(${i})>td:nth-child(5)>button`).text()=覆權
        //     }
        // };
        function updatemenager(num, updatenum) {
            // alert(num);
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    //modify here
                    alert(xhr.responseText);
                    location.reload();
                } else {
                    alert(xhr.status);
                }
            }
            var url = "./php/upma.php?number=" + num
                + "&updatenum=" + updatenum;
            // console.log(url);
            xhr.open("Get", url, true);
            xhr.send(null);

        }
        for (let i = 1; i < 100; i++) {
            $(`#manager>tbody>tr:nth-child(${i})>td:nth-child(6)>button`).click(function () {
                // $(this).css("border","10px solid red");
                let updatenum = $(`#manager>tbody>tr:nth-child(${i})>td:nth-child(5)>button`).text();
                let num = $(`#manager>tbody>tr:nth-child(${i})>td:nth-child(1)`).text();
                // alert(num);
                // alert(updatenum);
                if (updatenum == 1) {
                    updatenum = 0
                } else {
                    updatenum = 1
                };
                // alert(updatenum);
                updatemenager(num, updatenum);
            })
        }

    }
    xhr.open("get", "./php/backmember.php", true);
    xhr.send(null);

    ///////會員資料
    let xhr1 = new XMLHttpRequest();
    xhr1.onload = function () {
        memberall = JSON.parse(xhr1.responseText);
        // console.log(memberall);
        let members = document.getElementById("memberall");
        let memberRow = `<tr>
                <td>編號</td>
                <td>暱稱</td>
                <td>帳號</td>
                <td>密碼</td>
                <td>信箱</td>
                <td>頭貼</td>
                <td>點數</td>
                <td>狀態</td>
            </tr>`;
        for (j = 0; j < memberall.length; j++) {
             //判斷1或0 改中文
             if (`${memberall[j].member_sataus}` == 1) {
                status = "停權"
            } else {
                status = "回復"
            }
            memberRow += `
            <tr>
                    <td>${memberall[j].member_number}</td>
                    <td>${memberall[j].member_name}</td>
                    <td>${memberall[j].member_account}</td>
                    <td>${memberall[j].member_password}</td>
                    <td>${memberall[j].member_email}</td>
                    <td><img src="./img/memberPhoto/${memberall[j].member_photo}" alt=""></td>
                    <td>${memberall[j].member_point}</td>
                    <td style="display:none"><button>${memberall[j].member_sataus}</button></td>
                    <td><button class="btn member_status">${status}</button></td>
            </tr>
        `;
            members.innerHTML = memberRow;
        }
          //判斷文字 給不同CLASS
          for (let i = 0; i < 100; i++) {
            let status = document.getElementsByClassName("member_status")[i];
            if ($(status).text() == "停權") {
                $(status).addClass("btn-outline-warning")
            } else {
                $(status).addClass("btn btn-warning")
            }
        }
        //////////////////////////////停權會員
        function updatemember(num, updatenum) {
            // alert(num);
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    //modify here
                    alert(xhr.responseText);
                    location.reload();
                } else {
                    alert(xhr.status);
                }
            }
            var url = "./php/upmember.php?number=" + num
                + "&updatenum=" + updatenum;
            // console.log(url);
            xhr.open("Get", url, true);
            xhr.send(null);

        }
        for (let i = 1; i < 100; i++) {
            $(`#memberall>tbody>tr:nth-child(${i})>td:nth-child(9)>button`).click(function () {
                // $(this).css("border","10px solid red");
                let updatenum = $(`#memberall>tbody>tr:nth-child(${i})>td:nth-child(8)>button`).text();
                let num = $(`#memberall>tbody>tr:nth-child(${i})>td:nth-child(1)`).text();
                // alert(num);
                // alert(updatenum);
                if (updatenum == 1) {
                    updatenum = 0
                } else {
                    updatenum = 1
                };
                // alert(updatenum);
                updatemember(num, updatenum);
            })
        }
    }
    xhr1.open("get", "./php/memberall.php", true);
    xhr1.send(null);
    // $("#manager>tbody>tr:nth-child(2)>td:nth-child(6)>button").css("border","10px solid red");
    // $(".newma_del").eq(1).css("border","10px solid red");
})
//////////////////////////////新增管理員
document.getElementById("newma").addEventListener("click", function () {
    if (document.getElementById("newma_nam").value.length == 0) {
        alert("暱稱不能為空");
        document.getElementById("newma_nam").focus();
        return
    }
    if (document.getElementById("newma_acc").value.length == 0) {
        alert("帳號不能為空");
        document.getElementById("newma_acc").focus();
        return
    }
    if (document.getElementById("newma_psw").value.length == 0) {
        alert("密碼不能為空");
        document.getElementById("newma_psw").focus();
        return
    }
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //modify here
            alert(xhr.responseText);
            location.reload();
        } else {
            alert(xhr.status);
        }
    }
    var url = "./php/newma.php?name=" + document.getElementById("newma_nam").value
        + "&account=" + document.getElementById("newma_acc").value
        + "&password=" + document.getElementById("newma_psw").value;
    // console.log(url);
    xhr.open("Get", url, true);
    xhr.send(null);
});





