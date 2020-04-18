// 路線的分類filter，有幾條官方路線就要顯示幾個 filter
function getFilterName(info) {
    let routeInfo = JSON.parse(info);
    // console.log(routeInfo)
    let filter = document.querySelector('.filterAll');
    let filterRows = "";

    for (let i = 0; i < routeInfo.length; i++) {
        if (routeInfo[i].route_status == 1) {
            filterRows += `
        <li id="filter${i}" class="filter">${routeInfo[i].route_name}</li>
        `
        }
    }
    filter.innerHTML = filterRows;

    // 傳送地一個filter的值來取得第一條路線資訊
    let firstRoute = document.querySelectorAll('.filter')[0].innerHTML;
    // console.log(firstRoute)
    let firstRouteForm = new FormData();
    firstRouteForm.append('firstRoute', firstRoute);

    let xhr2 = new XMLHttpRequest();
    xhr2.onload = function () {
        if (xhr2.status == 200) {
            let firstRouteInfo = JSON.parse(xhr2.responseText);
            // console.log(firstRouteInfo);

            let routeAttractionBlock = document.querySelectorAll('.routeAttractionBlock');
            let routeTilteBlock = document.querySelector('.routeTilteBlock');

            routeTilteBlock.innerHTML =
                `
                <img src="./img/route/routeInfo.png" class="routeInfo">
                <img src="./img/routes/${firstRouteInfo[0].route_photo}">
                `;
            for (let i = 0; i < firstRouteInfo.length; i++) {
                if (firstRouteInfo[i].attraction_status == 0) {
                    routeAttractionBlock[i].innerHTML = `
                    <div class="attractionTitle">
                        <img src="./img/route/landMark.png" class="landMark">
                        <p>${firstRouteInfo[i].attraction_name}</p>
                        <p>${firstRouteInfo[i].attraction_address}</p>
                        <p><img src="./img/element/note.png">景點目前關閉中</p>
                    </div>
                    <div class="attractionImageBlock">
                        <div class="attractionImage">
                            <div class="attractionMask"><img src="./img/attractions/${firstRouteInfo[i].attraction_photo1}"></div>
                        </div>
                    </div>
                `;
                }else{
                    routeAttractionBlock[i].innerHTML = `
                    <div class="attractionTitle">
                        <img src="./img/route/landMark.png" alt="" srcset="" class="landMark">
                        <p>${firstRouteInfo[i].attraction_name}</p>
                        <p>${firstRouteInfo[i].attraction_address}</p>
                    </div>
                    <div class="attractionImageBlock">
                        <div class="attractionImage">
                            <div class="attractionMask"><img src="./img/attractions/${firstRouteInfo[i].attraction_photo1}"></div>
                        </div>
                    </div>
                `;
                }
            }
        } else {
            alert(xhr2.status);
        }

    }
    xhr2.open("Post", "./php/firstRouteGet.php", true);
    xhr2.send(firstRouteForm);

    // 點選 filter
    document.querySelectorAll('.filter')[0].setAttribute('class', 'filter showFilter');
    $('.filterAll li').click(function (e) {
        e.preventDefault();

        $(this).closest("ul.filterAll").find("li.filter").removeClass("showFilter");
        $(this).addClass("showFilter");
    });
}

// 當頁面載入顯示第一條路線的揪團資訊
function firstRouteEvent() {
    // 當頁面載入顯示地一條路線的揪團資訊
    let firstRoute = document.querySelectorAll('.filter')[0].innerHTML;
    let firstRouteForm = new FormData();
    firstRouteForm.append('eventConcat', firstRoute);

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            // 新增卡片
            let cardBox = $id("cardBox");
            let eventTable = JSON.parse(xhr.responseText);//把JSON字串翻譯成JS
            // console.log(eventTable);
            let html = "";
            for (i = 0; i < eventTable.length; i++) {
                html += `
                <div class="eventCard wow zoomIn">
                    <div class="cardTop">
                    `
                if (eventTable[i].member_number == null) {
                    html += `
                        <div class="starMark">
                            <div><img src="./img/event/event_star.png" alt=""></div>
                            <div class="markWord">官方路線</div>
                            <input type="hidden" name="event_sort" value="official" class="event_sort">
                        </div>
                        `
                } else {
                    html += `<div class="starMark"><input type="hidden" name="event_sort" value="member" class="event_sort"></div>`
                }
                html += `
                        <div class="dotWrap">
                        </div>
                    </div>
                    <div class="eventPicWrap">
                        <img src="./img/eventPhoto/${eventTable[i].event_cover_url}" class="eventPic">
                    </div>
                    <div class="cardText">
                        <h1>${eventTable[i].event_name}</h1>
                        <p>
                            活動日期:${eventTable[i].event_date}<br>
                            報名截止:${eventTable[i].enroll_end_date}<br>
                            集合地點:${eventTable[i].meeting_place}
                        </p>
                        <span id="more${eventTable[i].event_number}" class="lightDetail">more</span>
                        <input type="hidden" name="event_number" value="${eventTable[i].event_number}" class="event_number">
                    </div>
                </div> 
                `;
            }
            cardBox.innerHTML = html;

        } else {
            alert(xhr.status);
        }
    }
    xhr.open("post", "./php/getEventForConcat.php", true);
    xhr.send(firstRouteForm);

}

// 取得一開始顯示在頁面上路線的資訊

window.addEventListener("load", function () {

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            getFilterName(xhr.responseText);
            firstRouteEvent();
        } else {
            alert(xhr.status);
        }
    }
    xhr.open("get", "./php/frontRouteFilter.php", true);
    xhr.send(null);
}, false);