let memNum;
/////////////////////////////////////////////////////////////////////第三頁放心情
///心情照片
function moodphoto(length) {
    for (let i = 0; i < length; i++) {
        document.getElementById(`mood_pho${i}`).onchange = function () {
            // alert("00");
            let file = document.getElementById(`mood_pho${i}`).files[0];
            let readFile = new FileReader();
            readFile.readAsDataURL(file);
            readFile.addEventListener("load", function () {
                image = document.getElementById(`moodpho${i}`)
                image.src = this.result;
            })
            $(`.member_info_share_all>div:nth-child(${i+1})>form>div:nth-child(2)>label>div`).css("border", "unset");
            
        };
    }
};
//心情修改
function moodmodify() {
    for (let i = 0; i < 100; i++) {
        //修改
        $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(5)>div:nth-child(1)`).click(function () {
            $(this).css("display", "none");
            $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(5)>div:nth-child(2)`).css("display", "inline-block");
            $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(5)>div:nth-child(3)`).css("display", "none")
            $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(1)>select`).css("pointer-events", "auto");
            $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(1)>select`).focus();
            $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(2)>label`).css("pointer-events", "auto");
            $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(2)>label>div:nth-child(1)>div:nth-child(2)`).css("visibility", "visible");
            $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(2)>label>div`).click(function () {
                $(this).css("border", "3px solid #ccc");
            });
            $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(2)>label>div>div:nth-child(2)`).css("display", "block");
            $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(4)>textarea`).css("pointer-events", "auto");
        })
        //送出
        $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(5)>div:nth-child(2)`).click(function () {
            // document.getElementById("mood_upload").submit();
            $(`.member_info_share_all>div:nth-child(${i})>form`).submit();
        });
        //刪除
        $(`.member_info_share_all>div:nth-child(${i})>form>div:nth-child(5)>div:nth-child(3)`).click(function () {
            let delmoodnum = $(`.member_info_share_all>div:nth-child(${i})>form>input:nth-child(6)`).val();
            // alert(delmoodnum);
            if (confirm("真的要刪除嗎??") == true) {
                if (confirm("真的嗎!!") == false) {
                    return
                }
            } else {
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
            var url = "./php/delmembermood.php?number=" + delmoodnum
            // console.log(url);
            xhr.open("Get", url, true);
            xhr.send(null);
        });
    };

};
function getMoodInfo(memNum) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        moodinfo = JSON.parse(xhr.responseText);
        // console.log(moodinfo);
        // console.log(moodinfo.moodinfoRow);
        // console.log(moodinfo.moodinfocommentRow);
        // console.log(moodinfo.moodinfoRow[0].post_number);
        // console.log(moodinfo.moodinfocommentRow[0].comment_total)
        let member_info_share_all = document.getElementById("member_info_share_all");
        let membermoodRow = " ";
        let moodclass = ["散步日記", "吃貨手札", "隨筆心情"]
        for (let i = 0; i < moodinfo.moodinfoRow.length; i++) {
            membermoodRow += `
        <div class="member_info_share_all_all">
        <form action="./php/upmoodinfo.php" method="post" enctype="multipart/form-data" id="mood_upload">
                <div class="member_info_share_kind">
                    <select name="mood_class" id="">`
            for (let k = 0; k < moodclass.length; k++) {
                if (moodclass[k] == moodinfo.moodinfoRow[i].mood_class) {
                    membermoodRow += `<option value="${moodclass[k]}" selected >${moodclass[k]}</option>`
                }
                else {
                    membermoodRow += `<option value="${moodclass[k]}" >${moodclass[k]}</option>`
                }
            }

            // for (let k = 0; k < moodinfo.moodlineoffRow.length; k++) {
            //     if (moodinfo.moodinfoRow[i].route_number == moodinfo.moodlineoffRow[k].route_number) {
            //         membermoodRow += `<option value="${moodinfo.moodlineoffRow[k].route_number}" selected >${moodinfo.moodlineoffRow[k].route_name}</option>`
            //     } else {
            //         membermoodRow += `<option value="${moodinfo.moodlineoffRow[k].route_number}">${moodinfo.moodlineoffRow[k].route_name}</option>`
            //     }
            // }
            // for (let l = 0; l < moodinfo.moodlinecusRow.length; l++) {
            //     if (moodinfo.moodinfoRow[i].route_number == moodinfo.moodlinecusRow[l].route_number) {
            //         membermoodRow += `<option value="${moodinfo.moodlinecusRow[l].route_number}" selected >${moodinfo.moodlinecusRow[l].route_name}</option>`
            //     } else {
            //         membermoodRow += `<option value="${moodinfo.moodlinecusRow[l].route_number}">${moodinfo.moodlinecusRow[l].route_name}</option>`
            //     }
            // }
            membermoodRow += `
                    </select>
                </div>
                <div class="member_info_share_image">
                    <label for="mood_pho${i}">
                        <div>
                            <div>
                                <div>
                                    <img src="./img/moodPhoto/${moodinfo.moodinfoRow[i].mood_photo}" alt="" id="moodpho${i}">
                                </div>
                            </div>
                            <div style="visibility: hidden;">
                                <label for="mood_pho${i}">上傳照片
                                    <img src="./img/member/membercamera.png" alt="">
                                </label>
                                <input type="file" name="mood_pho" id="mood_pho${i}" style="display: none;">
                            </div>
                        </div>
                    </label>
                </div>
                <div class="member_info_share_heart">
                    <p>
                        <img src="./img/member/memberheart.png" alt="">
                        <span>${moodinfo.moodinfoRow[i].mood_heart}</span>
                        <img src="./img/member/moodChatIcon.png" alt="">
                        <span>`
            // for(let g =0;g<moodinfo.moodinfocommentRow.length;g++){
            //     if(moodinfo.moodinfoRow[i].post_number==moodinfo.moodinfocommentRow[g].post_number){
            //         membermoodRow += `${moodinfo.moodinfocommentRow[g].comment_total}`; 
            //     }
            // }
            let aa = 0;
            for (let g = 0; g < moodinfo.moodinfocommentRow.length; g++) {
                if (moodinfo.moodinfoRow[i].mood_number == moodinfo.moodinfocommentRow[g].mood_number) {
                    aa += parseInt(`${moodinfo.moodinfocommentRow[g].comment_total}`);
                } else {
                    aa += parseInt(0);
                }
            }
            membermoodRow += `${aa}`
            membermoodRow += `
                        </span>
                    </p>
                </div>
                <div class="member_info_share_word">
                    <textarea name="mood_content" id="" rows="5">${moodinfo.moodinfoRow[i].mood_content}
                </textarea>
                </div>
                <div class="member_info_share_button">
                    <div class="btnPink">
                        修改
                    </div>
                    <div style="display: none;" class="btnPink">
                        確認
                    </div>
                    <div class="btnPink">
                        取消
                    </div>
                </div>
                <input style="display:none" type="text" value="${moodinfo.moodinfoRow[i].mood_number}" name="mood_number">
            </form>
        </div>`
        }
        member_info_share_all.innerHTML = membermoodRow;
        //心情修改
        moodmodify();
        ///心情照片
        moodphoto(moodinfo.moodinfoRow.length);
    };
    let url = "./php/getMoodInfo.php?number=" + memNum;
    // console.log(url);
    xhr.open("Get", url, true);
    xhr.send(null);
}
/////////////////////////////////////////////////////////////////////第五頁放開團
//修改路線
function openlinechange(linenum, num, memNum) {
    // alert(linenum,num+1)
    // alert(num+1)
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        linepointinfo = JSON.parse(xhr.responseText);
        // console.log(linepointinfo);
        // console.log(linepointinfo.linepointoffRow);
        // console.log(linepointinfo.linepointcusRow);
        let linepointRow = " ";
        for (let i = 0; i < linepointinfo.linepointoffRow.length; i++) {
            if (linenum == linepointinfo.linepointoffRow[i].route_number) {
                linepointRow += `<div>${linepointinfo.linepointoffRow[i].attraction_name}</div>`
            }
        };
        for (let j = 0; j < linepointinfo.linepointcusRow.length; j++) {
            if (linenum == linepointinfo.linepointcusRow[j].route_number) {
                linepointRow += `<div>${linepointinfo.linepointcusRow[j].custom_attraction_name}</div>`
            }
        };
        // alert(linepointRow);
        $(`.member_info_open_all>div:nth-child(${num + 1})>form>div:nth-child(3)>div:nth-child(7)>div:nth-child(2)`).html("");
        $(`.member_info_open_all>div:nth-child(${num + 1})>form>div:nth-child(3)>div:nth-child(7)>div:nth-child(2)`).html(linepointRow);


    }
    let url = "./php/openlinechange.php?number=" + memNum;
    // console.log(url);
    xhr.open("Get", url, true);
    xhr.send(null);
};
//修改開團資訊&&刪除
function openmodify() {
    for (let i = 1; i < 100; i++) {
        //停止冒泡
        $(`.member_info_open_all>div:nth-child(${i}) input`).click(function(e){
            e.stopPropagation();
        })
        $(`.member_info_open_all>div:nth-child(${i}) select`).click(function(e){
            e.stopPropagation();
        })
        $(`.member_info_open_all>div:nth-child(${i}) textarea`).click(function(e){
            e.stopPropagation();
        })

        // $(`.member_info_open_all>div:nth-child(${i})`).css("border","10px solid red");
        // $(`.member_info_open_all>div:nth-child(${i})>div:nth-child(4)>div`).css("border","10px solid red");
        $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(4)>div:nth-child(1)`).click(function (e) {
            $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)`).click(function(e){
                e.stopPropagation();
            })
            e.stopPropagation();
            //修改隱藏
            $(this).css("display", "none");
            //確認出現
            $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(4)>div:nth-child(2)`).css("display", "inline-block");
            //刪除隱藏
            $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(4)>div:nth-child(3)`).css("display", "none");
            //欄位去除READONLY
            $(`.member_info_open_all>div:nth-child(${i})>form>input:nth-child(1)`).removeAttr("readonly");
            $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) input`).removeAttr("readonly");
            // $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3)>div:nth-child(1) input`).attr("readonly","true");
            $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) textarea`).removeAttr("readonly");
            $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) input`).css("pointer-events", "auto");
            $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) select`).css("pointer-events", "auto");
            // $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3)>div:nth-child(1) input`).css("pointer-events","none");
            $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) textarea`).css("pointer-events", "auto");
            $(`.member_info_open_all>div:nth-child(${i})>form>input:nth-child(1)`).css("pointer-events", "auto");
            //第一個欄位FOCUS
            // $(`.member_info_open_all>div:nth-child(${i})>div:nth-child(3)>div:nth-child(1)  input`).select();
            // $(`.member_info_open_all>div:nth-child(${i})>div:nth-child(3)>div:nth-child(1)  input`).focus();
            $(`.member_info_open_all>div:nth-child(${i})>form>input:nth-child(1)`).focus();
            // $(`.member_info_open_all>div:nth-child(${i})>form>input`).focus().css("background-color","white");
            //下方照相機出現
            $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)>label:nth-child(1)>div:nth-child(1)>div:nth-child(2)`).css("display", "inline-block");
            //可更新相片
            $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)>label`).css("pointer-events", "auto");
            $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)>label>div`).click(function () {
                $(this).css("border", "3px solid #ccc");
            })

        });
        $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(4)>div:nth-child(2)`).click(function (e) {
            e.stopPropagation();
            // document.getElementById("open_upload").submit();
            $(`.member_info_open_all>div:nth-child(${i})>form`).submit();
            // // alert("00");
            // $(this).css("display","none");
            // $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(4)>div:nth-child(1)`).css("display","inline-block");
            // $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(4)>div:nth-child(3)`).css("display","inline-block");
            // $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) input`).attr("readonly","true");
            // $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) textarea`).attr("readonly","true");
            // $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)>label:nth-child(1)>div:nth-child(1)>div:nth-child(2)`).css("display","none");
            // $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)>label`).css("pointer-events","none");
            // // $(`.member_info_open_all>div:nth-child(${i})>div:nth-child(2)>label`).css("border","1px solid red");
            // // $(`.member_info_open_all>div:nth-child(${i})>div:nth-child(3)>div>input`).css("border-bottom","1px solid #646464");
            // $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) input`).css("pointer-events","none");
            // $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(3) textarea`).css("pointer-events","none");
            // $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)>label>div`).css("border","unset");
            // $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(4)>a:nth-child(3)`).css("display","inline-block");
            // $(`.member_info_open_all>div:nth-child(${i})>form>input:nth-child(1)`).css("pointer-events","none");
        })
        $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(4)>div:nth-child(3)`).click(function (e) {
            e.stopPropagation();
            let delopennum = $(`.member_info_open_all>div:nth-child(${i})>form>input:nth-child(5)`).val()
            if (confirm("真的要刪除嗎??") == true) {
                if (confirm("真的嗎!!") == false) {
                    return
                }
            } else {
                return
            }
            // alert( memNum);
            // alert(joinnumber);
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
            var url = "./php/delmemberopen.php?number=" + delopennum
            // console.log(url);
            xhr.open("Get", url, true);
            xhr.send(null);
        })
    }
}
//上傳圖片會顯示
function openphoto(length) {
    for (let i = 0; i < length; i++) {
        // $(`.member_info_open_all>div:nth-child(${i})>form>div:nth-child(2)>label:nth-child(1)>div:nth-child(1)>div:nth-child(2)>input:nth-child(2)`).onchange = function () {
        //     alert("00");
        //     // let file = document.getElementById(`event_pho${i}`).files[0];
        //     // let readFile = new FileReader();
        //     // readFile.readAsDataURL(file);
        //     // readFile.addEventListener("load", function () {
        //     //     image = document.getElementById(`event_pho${i}`)
        //     //     image.src = this.result;
        //     // })
        // };
        document.getElementById(`event_pho${i}`).onchange = function () {
            // alert("00");
            let file = document.getElementById(`event_pho${i}`).files[0];
            let readFile = new FileReader();
            readFile.readAsDataURL(file);
            readFile.addEventListener("load", function () {
                image = document.getElementById(`eventpho${i}`)
                image.src = this.result;
            })
            $(`.member_info_open_all>div:nth-child(${i+1})>form>div:nth-child(2)>label>div`).css("border", "unset");
        };
    }
    // document.getElementById("event_pho").onchange = function () {
    //     // alert("00");
    //     let file = document.getElementById("event_pho").files[0];
    //     let readFile = new FileReader();
    //     readFile.readAsDataURL(file);
    //     readFile.addEventListener("load", function () {
    //         image = document.getElementById("eventpho")
    //         image.src = this.result;
    //     })
    // };
};

function getOpenInfo(memNum) {
    // alert(memNum);
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        memberopeninfo = JSON.parse(xhr.responseText);
        // console.log(memberopeninfo);
        // console.log(memberopeninfo.memberopen);
        // console.log(memberopeninfo.openjoinmember);
        // console.log(memberopeninfo.memberopenlistoff);
        // console.log(memberopeninfo.memberopenlistcus);
        // console.log(memberopeninfo.memberopenoff);
        // console.log(memberopeninfo.memberopencus);


        let member_info_open_all = document.getElementById("member_info_open_all");
        let memberopenRow = " ";
        for (let i = 0; i < memberopeninfo.memberopen.length; i++) {
            memberopenRow += `
        <div class="member_info_open_all_all">
        <form action="./php/upopeninfo.php" method="post" enctype="multipart/form-data" id="open_upload">
                <input type="text" value="${memberopeninfo.memberopen[i].event_name}" readonly name="event_name">
                <div class="member_info_open_all_left">
                    <label for="event_pho${i}">
                        <div>
                            <div>
                                <img src="./img/eventPhoto/${memberopeninfo.memberopen[i].event_cover_url}" alt="" id="eventpho${i}">
                            </div>
                            <div style="display: none;">
                                <label for="event_pho${i}">上傳照片
                                    <img src="./img/member/membercamera.png" alt="">
                                </label>
                                <input type="file" name="event_pho" id="event_pho${i}" style="display: none;">
                            </div>
                        </div>
                    </label>
                </div>
                <div class="member_info_open_all_right">
                    <div>
                        <label for="join_member">參與會員 :</label>
                        <div>`
            for (let j = 0; j < memberopeninfo.openjoinmember.length; j++) {
                if (memberopeninfo.memberopen[i].event_number == memberopeninfo.openjoinmember[j].event_number) {
                    memberopenRow += `<div>${memberopeninfo.openjoinmember[j].member_name}</div>`
                }
            };
            memberopenRow += `   
                        </div>
                    </div>
                    <div>
                        <label for="event_day">活動日期 :</label>
                        <input type="date" id="event_day" readonly value="${memberopeninfo.memberopen[i].event_date}" name="event_date">
                    </div>
                    <div>
                        <label for="event_dday">報名截止日 :</label>
                        <input type="date" id="event_dday" readonly value="${memberopeninfo.memberopen[i].enroll_end_date}" name="enroll_end_date">
                    </div>
                    <div style="display:none">
                        <label for="togethertime">集合時間 :</label>
                        <input type="text" id="togethertime" readonly value="">
                    </div>
                    <div>
                        <label for="togetherposition">集合地點 :</label>
                        <input type="text" id="togetherposition" readonly value="${memberopeninfo.memberopen[i].meeting_place}" name="meeting_place">
                    </div>
                    <div>
                        <label for="lines">路線 :</label>
                        <select name="route_number" id="" onchange="openlinechange(this.options[this.options.selectedIndex].value,${i},${memNum})">`
            for (let k = 0; k < memberopeninfo.memberopenoff.length; k++) {
                if (memberopeninfo.memberopen[i].route_number == memberopeninfo.memberopenoff[k].route_number) {
                    memberopenRow += `<option value="${memberopeninfo.memberopenoff[k].route_number}" selected >${memberopeninfo.memberopenoff[k].route_name}</option>`
                } else {
                    memberopenRow += `<option value="${memberopeninfo.memberopenoff[k].route_number}">${memberopeninfo.memberopenoff[k].route_name}</option>`
                }
            }
            for (let l = 0; l < memberopeninfo.memberopencus.length; l++) {
                if (memberopeninfo.memberopen[i].route_number == memberopeninfo.memberopencus[l].route_number) {
                    memberopenRow += `<option value="${memberopeninfo.memberopencus[l].route_number}" selected >${memberopeninfo.memberopencus[l].route_name}</option>`
                } else {
                    memberopenRow += `<option value="${memberopeninfo.memberopencus[l].route_number}">${memberopeninfo.memberopencus[l].route_name}</option>`
                }
            }
            memberopenRow += `
                        </select>
                    </div>
                    <div>
                        <label for="viewpoints">景點 :</label>
                        <div>
                        `
            for (let m = 0; m < memberopeninfo.memberopenlistoff.length; m++) {
                if (memberopeninfo.memberopen[i].route_number == memberopeninfo.memberopenlistoff[m].route_number) {
                    memberopenRow += `<div>${memberopeninfo.memberopenlistoff[m].attraction_name}</div>`
                }
            };
            for (let n = 0; n < memberopeninfo.memberopenlistcus.length; n++) {
                if (memberopeninfo.memberopen[i].route_number == memberopeninfo.memberopenlistcus[n].route_number) {
                    memberopenRow += `<div>${memberopeninfo.memberopenlistcus[n].custom_attraction_name}</div>`
                }
            };
            memberopenRow += `
                        </div>
                    </div>
                    <div>
                        <label for="people">上限人數 :</label>
                        <input type="text" id="people" readonly value="${memberopeninfo.memberopen[i].max_attendance}" name="max_attendance">
                    </div>
                    <div>
                        <label for="event_introduce">活動介紹 :</label value="0000000000000000000">
                        <textarea name="event_information" id="" cols="30" rows="5" id="event_introduce"
                            readonly>${memberopeninfo.memberopen[i].event_information}</textarea>
                    </div>
                </div>
                <div class="member_info_open_all_bottom">
                    <div class="btnPink">修改</div>
                    <div class="btnPink" href="#" style="display: none;">確認</div>
                    <div class="btnPink" href="#">取消</div>
                </div>
                <input type="text" name="event_number" style="display:none" value="${memberopeninfo.memberopen[i].event_number}"></input>
            </form>
        </div>
        
        `
                ;





        };
        member_info_open_all.innerHTML = memberopenRow;
        //開團修改
        openmodify();
        ///開團照片
        openphoto(memberopeninfo.memberopen.length);
        function openheight() {
            for (let i = 0; i < 100; i++) {
                $(`.member_info_open_all>div:nth-child(${i})`).click(function () {
                    $(this).toggleClass("height_auto")
                    // alert(00)
                })
            }
        };
        //參加太長 讓他點了再開
        openheight();

    }
    let url = "./php/getOpenInfo.php?number=" + memNum;
    // console.log(url);
    xhr.open("Get", url, true);
    xhr.send(null);
};

/////////////////////////////////////////////////////////////////////第六頁放參加
function getJoinInfo(memNum) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        memberjoininfo = JSON.parse(xhr.responseText);
        // console.log(memberjoininfo);
        // console.log(memberjoininfo.memberjoin);
        // console.log(memberjoininfo.memberjoinlistoff);
        // console.log(memberjoininfo.memberjoinlistcus);
        let member_info_join_all = document.getElementById("member_info_join_all");
        let memberjoinRow = " ";
        for (let i = 0; i < memberjoininfo.memberjoin.length; i++) {
            memberjoinRow += `
            <div class="member_info_join_all_all">
                                <input type="text" value="${memberjoininfo.memberjoin[i].event_name}" readonly>
                                <div class="member_info_join_all_left">
                                    <div>
                                        <div>
                                            <img src="./img/eventPhoto/${memberjoininfo.memberjoin[i].event_cover_url}" alt="">
                                        </div>
                                    </div>
                                </div>
                                <div class="member_info_join_all_right">
                                    <div>
                                        <label for="join_member">主揪是誰 :</label>
                                        <input type="text" value="${memberjoininfo.memberjoin[i].member_name}" id="join_member" readonly>
                                    </div>
                                    <div>
                                        <label for="event_day">活動日期 :</label>
                                        <input type="date" id="event_day" readonly value="${memberjoininfo.memberjoin[i].event_date}">
                                    </div>
                                    <div>
                                        <label for="event_dday">報名截止日 :</label>
                                        <input type="date" id="event_dday" readonly value="${memberjoininfo.memberjoin[i].enroll_end_date}">
                                    </div>
                                    <div style="display:none">
                                        <label for="togethertime">集合時間 :</label>
                                        <input type="text" id="togethertime" readonly>
                                    </div>
                                    <div>
                                        <label for="togetherposition">集合地點 :</label>
                                        <input type="text" id="togetherposition" readonly value="${memberjoininfo.memberjoin[i].meeting_place}">
                                    </div>
                                    <div>
                                            <label for="lines">路線 :</label>
                                            <input type="text" id="lines" readonly value="${memberjoininfo.memberjoin[i].route_name}">
                                        </div>
                                        <div>
                                            <label for="viewpoints">景點 :</label>
                                            <div>`;

            for (let j = 0; j < memberjoininfo.memberjoinlistoff.length; j++) {
                // alert(j);
                if (memberjoininfo.memberjoin[i].route_number == memberjoininfo.memberjoinlistoff[j].route_number) {
                    // aa+=memberjoininfo.memberjoinlistoff[j].attraction_name+"--->";
                    memberjoinRow += `<input type="text" id="viewpoints" readonly value="${memberjoininfo.memberjoinlistoff[j].attraction_name}"></input>`
                }
            };
            for (let k = 0; k < memberjoininfo.memberjoinlistcus.length; k++) {
                if (memberjoininfo.memberjoin[i].route_number == memberjoininfo.memberjoinlistcus[k].route_number) {
                    // aa+=memberjoininfo.memberjoinlistcus[k].custom_attraction_name+"--->";
                    memberjoinRow += `<input type="text" id="viewpoints" readonly value="${memberjoininfo.memberjoinlistcus[k].custom_attraction_name}"></input>`
                }
            };
            // alert(aa);
            // memberjoinRow +=`${aa}   
            //     `;
            memberjoinRow +=
                `</div>
                                    </div>
                                    <div>
                                        <label for="people">參加人數 :</label>
                                        <input type="text" id="people" readonly value="${memberjoininfo.memberjoin[i].now_attendance}">
                                    </div>
                                    <div>
                                        <label for="event_introduce">活動介紹 :</label>
                                        <textarea name="" id="" cols="30" rows="5" id="event_introduce"
                                            readonly >${memberjoininfo.memberjoin[i].event_information}</textarea>
                                    </div>
                                </div>
                                
                                <div class="member_info_join_all_bottom">
                                    <div class="btnPink" href="#">取消</div>
                                </div>
                                <div>${memberjoininfo.memberjoin[i].event_number}</div>
                            </div>
                            `;
            // console.log(memberjoinRow);
        };
        member_info_join_all.innerHTML = memberjoinRow;

        function deljoin() {
            // alert( memNum);
            for (let i = 0; i < 100; i++) {
                $(`.member_info_join_all>div:nth-child(${i})>div:nth-child(4)>div:nth-child(1)`).click(function (e) {
                    e.stopPropagation();
                    //跳窗給他反悔的機會
                    if (confirm("真的要取消嗎??") == true) {
                        if (confirm("真的嗎!!") == false) {
                            return
                        }
                    } else {
                        return
                    }
                    let joinnumber = $(`.member_info_join_all>div:nth-child(${i})>div:nth-child(5)`).text();
                    // alert( memNum);
                    // alert(joinnumber);
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
                    var url = "./php/delmemberjoin.php?number=" + memNum
                        + "&joinnumber=" + joinnumber;
                    // console.log(url);
                    xhr.open("Get", url, true);
                    xhr.send(null);

                })
            }
        }
        function joinheight() {
            for (let i = 0; i < 100; i++) {
                $(`.member_info_join_all>div:nth-child(${i})`).click(function () {
                    $(this).toggleClass("height_auto")
                    // alert(00)
                })
            }
        };
        //刪除參加
        deljoin();
        //參加太長 讓他點了再開
        joinheight();

    }
    let url = "./php/getJoinInfo.php?number=" + memNum;
    // console.log(url);
    xhr.open("Get", url, true);
    xhr.send(null);
};
/////////////////////////////////////////////////////////////////////第四頁放訂單
function getOrderInfo(memNum) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        memberorderinfo = JSON.parse(xhr.responseText);
        // alert(memberorderinfo);
        // console.log(memberorderinfo);
        // console.log(memberorderinfo.memberorder);
        // console.log(memberorderinfo.memberorder[0].order_number);
        // console.log(memberorderinfo.memberorderlist);
        let memberorder = document.getElementById("memberorder");
        let memberorderRow = " ";
        let status = "";
        for (let i = 0; i < memberorderinfo.length; i++) {
            if (memberorderinfo[i].shopping_status == 1) {
                status = "已出貨";
            } else {
                status = "未出貨";
            }
            memberorderRow += `
        <div>
            <div class="member_info_order_up">
                <p>訂單編號 :<span>NO.${memberorderinfo[i].order_number}</span></p>
                <p>訂單日期 :<span>${memberorderinfo[i].order_time}</span></p>
                <p>訂單金額 :<span>${memberorderinfo[i].order_point}元</span></p>
                <p>訂單狀態 :<span>${status}</span></p>
            </div>
            <div class="member_info_order_bottom">
                <div>
                    <div class="member_info_order_bottom_front">
                        <div>
                            <img src="./img/postcardPhoto/${memberorderinfo[i].product_images_url_front}" alt="">
                        </div>
                    </div>
                    <div class="member_info_order_bottom_contrary">
                        <div>
                            <img src="./img/postcardPhoto/${memberorderinfo[i].product_images_url_back}" alt="">
                        </div>
                    </div>
                    <div class="member_info_order_bottom_word">
                        <p>收件之人 :<span>${memberorderinfo[i].receiver_name}</span></p>
                        <p>收件地址 :<span>${memberorderinfo[i].receiver_address}</span></p>
                    </div>
                </div>
            </div>`
                ;

        
        memberorderRow += `</div>`;
        ;
    }
    memberorder.innerHTML = memberorderRow;

    // function ordermodify() {
    //     for (let i = 0; i < 100; i++) {
    //         $(`.member_info_order>div>div:nth-child(${i})`).click(function () {
    //             $(this).toggleClass("height_auto")
    //             // alert(00)
    //         })
    //     }
    // };


    // //訂單太長 讓他點了再開
    // ordermodify();


}
let url = "./php/getOrderInfo.php?number=" + memNum;
// console.log(url);
xhr.open("Get", url, true);
xhr.send(null);
}
/////////////////////////////////////////////////////////////////////第二頁放路線
function getLineInfo(memNum) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {

        var geocoder;
        var map;
        var markers = [];
        var addresses = [];
        var spots = [];
        var customRouteName = '';
        var customRouteDesc = '';
        var infowindows = [];
        var styles = [];
        var daytime = [];
        var night = [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#263c3f' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#6b9a76' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#212a37' }]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9ca5b3' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#746855' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#1f2835' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#f3d19c' }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ color: '#2f3948' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#515c6d' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#17263c' }]
            }
        ];
        geocoder = new google.maps.Geocoder();
        var center = new google.maps.LatLng(25.0505034, 121.51840949999998);
        var mapOptions = {
            zoom: 12,
            center: center,
            styles: night,
        }







        memberline = JSON.parse(xhr.responseText);
        // console.log(memberline);
        // console.log(memberline.memberline[1]);
        // console.log(memberline.memberlinelist[1]);
        let member_info_line_all = document.getElementById("member_info_line_all");
        let memberlineRow = " ";



        /////////塞地點到各個map
        function addpost(spot, map) {
            // alert("000");
            // console.log(spot);
            geocoder.geocode({ 'address': spot }, function (results, status) {
                // console.log(spot);
                // console.log(status);
                if (status == 'OK') {
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        animation: google.maps.Animation.DROP
                    });
                    //   console.log(map);
                } else {
                    alert("OPPS!!");
                }
            });
        }
        for (let i = 0; i < memberline.memberline.length; i++) {
            memberlineRow += `
            <div class="member_info_line_all_all">
                <div class="member_info_line_all_left">
                    <input type="text" value="${memberline.memberline[i].route_name}" readonly>
                    <textarea name="" id="" cols="" rows="" readonly>${memberline.memberline[i].route_information}</textarea>

                 </div>
                <div class="member_info_line_all_right">
                    <div class="btnPink">
                        修改
                    </div>
                    <div style="display: none;" class="btnPink">
                        確認
                    </div>
                    <div class="btnPink">
                        刪除
                    </div>
                </div>
                <div class="member_info_line_all_bottom" id="member_map${memberline.memberline[i].route_number}">
                </div>
                <div>${memberline.memberline[i].route_number}</div>
            </div>
            `;
            member_info_line_all.innerHTML = memberlineRow;
        };

        for (let i = 0; i < memberline.memberline.length; i++) {
            map = new google.maps.Map(document.getElementById(`member_map${memberline.memberline[i].route_number}`), mapOptions);
            for (let j = 0; j < memberline.memberlinelist.length; j++) {
                if (memberline.memberlinelist[j]["route_number"] == memberline.memberline[i]["route_number"]) {
                    // console.log(memberline.memberlinelist[j]["custom_attraction_name"]);
                    // console.log(map);
                    addpost(memberline.memberlinelist[j]["custom_attraction_name"], map);
                }
            }
        };
        // for (let i=0;i<memberline.memberline.length; i++){
        //     map =`member_map${memberline.memberline[i].route_number}`;
        //     for(let j=0;j<memberline.memberlinelist.length;j++){
        //         if(memberline.memberlinelist[j]["route_number"]==memberline.memberline[i]["route_number"]){
        //             console.log(memberline.memberlinelist[j]["custom_attraction_name"]);
        //             console.log(map);
        //             addpost(memberline.memberlinelist[j]["custom_attraction_name"], map);
        //         }
        //     }
        // }

        //////////刪除&&修改路線資料按鈕
        function memberlinemodify() {
            for (let i = 1; i < 100; i++) {
                //點擊修改
                $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(2)>div:nth-child(1)`).click(function () {
                    $(this).css("display", "none");
                    $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(2)>div:nth-child(2)`).css("display", "inline-block");
                    $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(2)>div:nth-child(3)`).css("display", "none");
                    $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(1)>input:nth-child(1)`).removeAttr("readonly");
                    $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(1)>textarea:nth-child(2)`).removeAttr("readonly");
                    $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(1)>input:nth-child(1)`).css("pointer-events", "auto");
                    $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(1)>textarea:nth-child(2)`).css("pointer-events", "auto");
                    $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(1)>input:nth-child(1)`).focus();

                })
                //修改
                $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(2)>div:nth-child(2)`).click(function () {
                    // alert("00");
                    title = $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(1)>input:nth-child(1)`).val();
                    number = $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(4)`).text();
                    word = $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(1)>textarea:nth-child(2)`).val();
                    // alert(title);
                    // alert(number);
                    // alert(word);
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
                    var url = "./php/upmemberline.php?number=" + number
                        + "&title=" + title
                        + "&word=" + word;
                    // console.log(url);
                    xhr.open("Get", url, true);
                    xhr.send(null);
                })
                //刪除
                $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(2)>div:nth-child(3)`).click(function () {
                    // $(this).css("border","1px solid red")
                    //跳窗給他反悔的機會
                    if (confirm("真的要刪除路線嗎??") == true) {
                        if (confirm("真的嗎!!") == false) {
                            return
                        }
                    } else {
                        return
                    }
                    number = $(`.member_info_line_all>div:nth-child(${i})>div:nth-child(4)`).text();
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
                    var url = "./php/delmemberline.php?number=" + number;
                    // console.log(url);
                    xhr.open("Get", url, true);
                    xhr.send(null);
                })

            }

        }

        //刪除路線資料的js
        memberlinemodify();

    }
    let url = "./php/getMemberIine.php?number=" + memNum;
    // console.log(url);
    xhr.open("Get", url, true);
    xhr.send(null);

};
//修改會員資料送出
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
               
        });
        $(".member_info_info_left>label>div").css("border", "unset");
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
            $(this).css("border", "3px solid #ccc");
        })
        //focus
        // $(".member_info_info_right input").focus().css("border","3px dashed $importantColor");
    })
    //下方修改確認 全部回復&&送出
    $(".member_info_info_button>a").click(function () {
        // $(this).css("visibility", "hidden");
        // $(".pen").css("animation", "jump 1s infinite linear");
        // $(".member_info_info_right div input").attr("readonly", "true");
        // $(".member_info_info_left div div:nth-child(2)").css("display", "none");
        // $(".member_info_info_left>label").css("pointer-events", "none");
        // $(".member_info_info_right input ").css("pointer-events", "none");
        // $(".member_info_info_left>label>div").css("border", "unset");;


        ////要傳圖 所以要form 傳值
        // alert("123");
        document.getElementById("member_upload").submit();




    })
}
///////////////////////////////////////////////////////////////////////////第一頁放資料
function getMemberInfo(memNum) {
    // alert(memNum);
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        memberinfo = JSON.parse(xhr.responseText);
        // JSON.parse(JSON.stringify(xhr.responseText))
        // console.log(memberinfo);
        //點數更新
        let point = document.getElementById("member_point_point");
        point.innerText = `${memberinfo[0].member_point}`;
        //會員資料更新
        let member_info_info_all = document.getElementById("member_info_info_all");
        member_info_info_all.innerHTML = `
        <form action="./php/upmemberinfo.php" method="post" enctype="multipart/form-data" id="member_upload">
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
    let url = "./php/getMemberInfo.php?number=" + memNum;
    // console.log(url);
    xhr.open("Get", url, true);
    xhr.send(null);
}
//去php看登入者是誰 取他編號
function getLoginInfo() {
    // alert("11");
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        member = JSON.parse(xhr.responseText);
        memNum = member.memNum
        //  alert(memNum);
        getMemberInfo(memNum);
        getLineInfo(memNum);
        getOrderInfo(memNum);
        getJoinInfo(memNum);
        getOpenInfo(memNum);
        getMoodInfo(memNum);
        // getMemberInfo(2);
        // getLineInfo(2);
        // getOrderInfo(2);
        // getJoinInfo(2);
        // getOpenInfo(2);
        // getMoodInfo(2);
    }
    xhr.open("get", "./php/logininfoForFront.php", true);
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