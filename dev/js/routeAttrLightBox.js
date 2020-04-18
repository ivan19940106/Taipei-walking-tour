
// attractionsSlider
function attractionsSlider() {
    let attractionSlider = document.querySelector(".attractionAll");
    let left = document.querySelector(".arrowLeft");
    let right = document.querySelector(".arrowRight");

    left.addEventListener("click", function () {
        attractionSlider.style.transform = "translateX(0px)";
        right.style.filter = "unset";
        right.style.animation = "";
        left.style.filter = "grayscale(1)";
        left.style.animation = "unset";
    });
    right.addEventListener("click", function () {
        attractionSlider.style.transform = "translateX(-50%)";
        left.style.filter = "unset";
        left.style.animation = " moveLeft .5s alternate infinite";
        right.style.filter = "grayscale(1)";
        right.style.animation = "unset";
    });

}

window.addEventListener('load', function () {
    $(document).on('click', '.attractionImageBlock', function lightBox() {
        let attrName = $(this).parent().children().first().children().first().next().text();
        // console.log(attrName)
        let attrform = new FormData();
        attrform.append('attrName', attrName);

        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                let attrInfo = JSON.parse(xhr.responseText);
                // console.log(attrInfo)
                let lightBoxs = document.querySelector(".attractionBgImage");
                let cancels = document.getElementById("closeMoodBtn");
                let attractionAll = document.querySelector(".attractionAll");
                let left = document.querySelector(".arrowLeft");
                let right = document.querySelector(".arrowRight");
                let attrRows = "";
                lightBoxs.style.display = "flex";
                if (attrInfo[0] == null) {
                    attrRows = `
                    <div class="attractionInfoBlock">
                        <div class="attractionInfoImage" id="attractionInfoImage1">
                            <img src="./img/attractions/">
                        </div>
                        <div class="attractionInfoText" id="attractionInfoText1">
                            <h2></h2>
                            <p></p>
                        </div>
                    </div>
                    <div class="attractionInfoBlock">
                        <div class="attractionInfoImage" id="attractionInfoImage2">
                            <img src="./img/attractions/">
                        </div>
                        <div class="attractionInfoText" id="attractionInfoText2">
                            <h2></h2>
                            <p></p>
                        </div>
                    </div>
                `;
                } else {
                    attrRows = `
                        <div class="attractionInfoBlock">
                            <div class="attractionInfoImage" id="attractionInfoImage1">
                                <img src="./img/attractions/${attrInfo[0].attraction_photo1}">
                            </div>
                            <div class="attractionInfoText" id="attractionInfoText1">
                                <h2>${attrInfo[0].attraction_name}</h2>
                                <p>${attrInfo[0].attraction_information1}</p>
                            </div>
                        </div>
                        <div class="attractionInfoBlock">
                            <div class="attractionInfoImage" id="attractionInfoImage2">
                                <img src="./img/attractions/${attrInfo[0].attraction_photo2}">
                            </div>
                            <div class="attractionInfoText" id="attractionInfoText2">
                                <h2>${attrInfo[0].attraction_name}</h2>
                                <p>${attrInfo[0].attraction_information2}</p>
                            </div>
                        </div>
                    `;
                }
                attractionAll.innerHTML = attrRows


                cancels.addEventListener('click', function () {
                    lightBoxs.style.display = "none";
                    attractionAll.style.transform = "translateX(0px)";
                    right.style.filter = "unset";
                    right.style.animation = "";
                    left.style.filter = "grayscale(1)";
                    left.style.animation = "unset";
                })


            } else {
                alert(xhr.status);
            }
        }
        xhr.open("post", "./php/routeAttrLightBox.php", true);
        xhr.send(attrform);
    })
    attractionsSlider();
})
