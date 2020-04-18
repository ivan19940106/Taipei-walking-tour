// for(let i=0;i<100;i++){
//     //修改
//     $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(5)>div:nth-child(1)`).click(function(){
//         $(this).css("display","none");
//         $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(5)>div:nth-child(2)`).css("display","inline-block");
//         $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(5)>div:nth-child(3)`).css("display","none")
//         $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(1)>select`).css("pointer-events","auto");
//         $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(1)>select`).focus();
//         $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(2)>label`).css("pointer-events","auto");
//         $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(2)>label>div`).click(function(){
//             $(this).css("border","3px dashed #a5361c");
//         });
//         $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(2)>label>div>div:nth-child(2)`).css("display","block");
//         $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(4)>textarea`).css("pointer-events","auto");
//     })
//     //送出
//     $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(5)>div:nth-child(2)`).click(function(){});
//     //刪除
//     $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(5)>div:nth-child(3)`).click(function(){});
// };
// for(let i =0;i<100;i++){
//     // $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)>label:nth-child(1)>div:nth-child(1)>div:nth-child(2)>input:nth-child(2)`).onchange(function(){
//     //     alert(0)
//     // })
//         $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)>label:nth-child(1)>div:nth-child(1)>div:nth-child(2) input`).
//         $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)>label:nth-child(1)>div:nth-child(1)>div:nth-child(2)`).css("border","1px solid red")
// }

















//編輯路線資訊
//100之後改
// for(let i = 1; i < 100; i++){
//     //點擊修改
//     $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(2)>div:nth-child(1)`).click(function(){
//         $(this).css("display","none");
//         $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(2)>div:nth-child(2)`).css("display","inline-block");
//         $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(2)>div:nth-child(3)`).css("display","none");
//         $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(1)>input:nth-child(1)`).removeAttr("readonly");
//         $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(1)>textarea:nth-child(2)`).removeAttr("readonly");
//         $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(1)>input:nth-child(1)`).css("pointer-events","auto");
//         $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(1)>textarea:nth-child(2)`).css("pointer-events","auto");
//         $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(1)>input:nth-child(1)`).focus();
  
//     })
//          $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(2)>div:nth-child(2)`).click(function(){
//         //去PHP修改
//     })

// }


//編輯揪團資訊
//100之後改
// for(let i = 1; i < 100; i++){
// // $(`.member_info_open_all>div:nth-child(${i})`).css("border","10px solid red");
// // $(`.member_info_open_all>div:nth-child(${i})>div:nth-child(4)>div`).css("border","10px solid red");
// $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(4)>div:nth-child(1)`).click(function(){
//     //修改隱藏
//     $(this).css("display","none");
//     //確認出現
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(4)>div:nth-child(2)`).css("display","inline-block");
//     //刪除隱藏
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(4)>div:nth-child(3)`).css("display","none");
//     //欄位去除READONLY
//     $(`.member_info_open_all>div:nth-child(${i})>form>input:nth-child(1)`).removeAttr("readonly");
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) input`).removeAttr("readonly");
//     // $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3)>div:nth-child(1) input`).attr("readonly","true");
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) textarea`).removeAttr("readonly");
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) input`).css("pointer-events","auto");
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) select`).css("pointer-events","auto");
//     // $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3)>div:nth-child(1) input`).css("pointer-events","none");
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) textarea`).css("pointer-events","auto");
//     $(`.member_info_open_all>div:nth-child(${i})>form>input:nth-child(1)`).css("pointer-events","auto");
//     //第一個欄位FOCUS
//     // $(`.member_info_open_all>div:nth-child(${i})>div:nth-child(3)>div:nth-child(1)  input`).select();
//     // $(`.member_info_open_all>div:nth-child(${i})>div:nth-child(3)>div:nth-child(1)  input`).focus();
//     $(`.member_info_open_all>div:nth-child(${i})>form>input:nth-child(1)`).focus();
//     // $(`.member_info_open_all>div:nth-child(${i})>form>input`).focus().css("background-color","white");
//     //下方照相機出現
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)>label:nth-child(1)>div:nth-child(1)>div:nth-child(2)`).css("display","inline-block");
//     //可更新相片
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)>label`).css("pointer-events","auto");
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)>label>div`).click(function(){
//         $(this).css("border","3px dashed #a5361c");
//     })

// });
// $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(4)>div:nth-child(2)`).click(function(){
//     // alert("00");
//     $(this).css("display","none");
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(4)>div:nth-child(1)`).css("display","inline-block");
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(4)>div:nth-child(3)`).css("display","inline-block");
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) input`).attr("readonly","true");
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) textarea`).attr("readonly","true");
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)>label:nth-child(1)>div:nth-child(1)>div:nth-child(2)`).css("display","none");
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)>label`).css("pointer-events","none");
//     // $(`.member_info_open_all>div:nth-child(${i})>div:nth-child(2)>label`).css("border","1px solid red");
//     // $(`.member_info_open_all>div:nth-child(${i})>div:nth-child(3)>div>input`).css("border-bottom","1px solid #646464");
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) input`).css("pointer-events","none");
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) textarea`).css("pointer-events","none");
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)>label>div`).css("border","unset");
//     $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(4)>a:nth-child(3)`).css("display","inline-block");
//     $(`.member_info_open_all>div:nth-child(${i})>form>input:nth-child(1)`).css("pointer-events","none");
// })
// }
// $(".member_info_open_all_bottom>div").click(function(){
//     $(this).css("display","none");
//     $(".member_info_open_all_bottom>a:nth-child(2)").css("display","inline-block");
//     $(".member_info_open_all_right input").removeAttr("readonly");
//     $(".member_info_open_all_right textarea").removeAttr("readonly");
//     $(".member_info_open_all_right>div:nth-child(1) input").focus();
// })




    

