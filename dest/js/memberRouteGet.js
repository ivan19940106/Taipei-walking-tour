//先把會員編號傳到php--->要抓會員的自訂路線
// function sendMember(){

//     let origin_member_number = emember.memNum; //會員編號
//     //把抓到的值放到html中一個隱藏的表單內
//     document.getElementById("origin_member_number").value = origin_member_number;
//     alert(document.getElementById("origin_member_number").value);

//     // -------------------測試值是否正確放入表單--------------------
//     console.log("----------------------");
//     console.log(document.getElementById("origin_member_number").value);
//     console.log("----------------------");
//     // ------------------------------------------------------------
//      // 用那個表單建立一個JS表單物件
//      var FormData = new FormData(document.getElementById("eventInsertForm"));

//     // 將表單物件的資料送到getEventRouteList.php中執行
//     let xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//         if (xhr.status == 200) {
//             alert(xhr.responseText);
//         } else {
//             alert(xhr.status + "失敗");
//         }
//     }

//     xhr.open("Post", "./php/getEventRouteList.php", true);
//     xhr.send(FormData); 
    
// }

// 判斷各頁面是否再登入狀態

// // 判斷各頁面是否再登入狀態
// function getLoginInfo() {
//     let xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//         emember= JSON.parse(xhr.responseText);
//         console.log(emember)
//     }
//     xhr.open("get", "./php/loginInfoForFront.php", true);
//     xhr.send(null); 
//     sendMember();
// };
// window.addEventListener("load", function () {
//     // // 檢查是否為登入狀態
//     getLoginInfo();
   
// });

