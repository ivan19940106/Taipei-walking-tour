
$(document).on('click', '.filter', function filterClick() {
    let routeName = $(this).text();
    // console.log(routeName)
    let editForm = new FormData;
    editForm.append('routeName', routeName);

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            let routeInfo = JSON.parse(xhr.responseText);
            // console.log(routeInfo)
            let routeAttractionBlock = document.querySelectorAll('.routeAttractionBlock');
            let routeTilteBlock = document.querySelector('.routeTilteBlock');
            if (routeInfo[0] == null) {
                routeTilteBlock.innerHTML =
                    `<img src="./img/routes/">`;
            } else {
                routeTilteBlock.innerHTML =
                    `
                    <img src="./img/route/routeInfo.png" class="routeInfo">
                    <img src="./img/routes/${routeInfo[0].route_photo}">
                    `;
            }
            for (let i = 0; i < 5; i++) {
                if (routeInfo[i] == null) {
                    routeAttractionBlock[i].innerHTML = `
                    <div class="attractionTitle">
                        <img src="./img/route/landMark.png" alt="" srcset="" class="landMark">
                        <p></p>
                    </div>
                    <div class="attractionImageBlock">
                        <div class="attractionImage">
                            <div class="attractionMask"><img src="./img/attractions/"></div>
                        </div>
                    </div>
                    `;
                } else {
                    if (routeInfo[i].attraction_status == 0) {
                        routeAttractionBlock[i].innerHTML = `
                    <div class="attractionTitle">
                        <img src="./img/route/landMark.png" alt="" srcset="" class="landMark">
                        <p>${routeInfo[i].attraction_name}</p>
                        <p>地址：${routeInfo[i].attraction_address}</p>
                        <p><img src="./img/element/note.png">景點目前關閉中</p>
                    </div>
                    <div class="attractionImageBlock">
                        <div class="attractionImage">
                            <div class="attractionMask"><img src="./img/attractions/${routeInfo[i].attraction_photo1}"></div>
                        </div>
                    </div>
                    `;
                    } else {
                        routeAttractionBlock[i].innerHTML = `
                    <div class="attractionTitle">
                        <img src="./img/route/landMark.png" alt="" srcset="" class="landMark">
                        <p>${routeInfo[i].attraction_name}</p>
                        <p>地址：${routeInfo[i].attraction_address}</p>
                    </div>
                    <div class="attractionImageBlock">
                        <div class="attractionImage">
                            <div class="attractionMask"><img src="./img/attractions/${routeInfo[i].attraction_photo1}"></div>
                        </div>
                    </div>
                    `;
                    }
                }
            }
        } else {
            alert(xhr.status);
        }
    }
    xhr.open("post", "./php/frontRouteInfo.php", true);
    xhr.send(editForm);
})