function doFirst() {



    // /*第一支程式: 切換步驟窗格--點擊時需要(1)切換postRight  (2)切換步驟的黃底postStepYellow
    $(document).ready(function () {
        $("#postRight_1").css("display", "block");
        $("#postRight_2").css("display", "none");
        $("#postRight_3").css("display", "none");
        $("#postRight_4").css("display", "none");
        $("#postRight_5").css("display", "none");
        $("#step1").addClass("step_yellow");
        $("#postcardCanvas").css("display", "block");
        $("#postcardback").css("display", "none");
        $(".canvas-container").css("display", "none");
        /*步驟1~步驟2*/
        $("#step_btn1").on("click", function () {
            $("#postRight_1").css("display", "none");
            $("#postRight_2").css("display", "block");
            $("#step2").addClass("step_yellow");
            $("#step1").removeClass("step_yellow");
            $("#postcardCanvas").css("display", "block");
            // $("#postcardback").css("display", "none");
            $(".canvas-container").css("display", "none");
        });
        /*步驟2~步驟1*/
        $("#step_btn2").on("click", function () {
            $("#postRight_1").css("display", "block");
            $("#postRight_2").css("display", "none");
            $("#step1").addClass("step_yellow");
            $("#step2").removeClass("step_yellow");
            $("#postcardCanvas").css("display", "block");
            // $("#postcardback").css("display", "none");
            $(".canvas-container").css("display", "none");
        });
        /*步驟2~步驟3*/
        $("#step_btn3").on("click", function () {
            $("#postRight_2").css("display", "none");
            $("#postRight_3").css("display", "block");
            $("#step3").addClass("step_yellow");
            $("#step2").removeClass("step_yellow");
            $("#postcardCanvas").css("display", "none");
            $("#postcardback").css("display", "block");
            $(".canvas-container").css("display", "block");
        });
        /*步驟3~步驟2*/
        $("#step_btn4").on("click", function () {
            $("#postRight_2").css("display", "block");
            $("#postRight_3").css("display", "none");
            $("#step2").addClass("step_yellow");
            $("#step3").removeClass("step_yellow");
            $("#postcardCanvas").css("display", "block");
            // $("#postcardback").css("display", "none");
            $(".canvas-container").css("display", "none");
        });
        /*步驟3~步驟4*/
        $("#step_btn5").on("click", function () {
            $("#postRight_3").css("display", "none");
            $("#postRight_4").css("display", "block");
            $("#step4").addClass("step_yellow");
            $("#step3").removeClass("step_yellow");
            $("#postcardCanvas").css("display", "none");
            $("#postcardback").css("display", "block");
            $(".canvas-container").css("display", "block");
        });
        /*步驟4~步驟3*/
        $("#step_btn6").on("click", function () {
            $("#postRight_4").css("display", "none");
            $("#postRight_3").css("display", "block");
            $("#step3").addClass("step_yellow");
            $("#step4").removeClass("step_yellow");
            $("#postcardCanvas").css("display", "none");
            $("#postcardback").css("display", "block");
            $(".canvas-container").css("display", "block");
        });
        /*步驟4~步驟5*/
        $("#step_btn7").on("click", function () {
            $("#postRight_4").css("display", "none");
            $("#postRight_5").css("display", "block");
            $("#step5").addClass("step_yellow");
            $("#step4").removeClass("step_yellow");
            $("#postcardCanvas").css("display", "none");
            $("#postcardback").css("display", "block");
            $(".canvas-container").css("display", "block");
        });
        /*步驟5~步驟4*/
        $("#step_btn8").on("click", function () {
            $("#postRight_5").css("display", "none");
            $("#postRight_4").css("display", "block");
            $("#step4").addClass("step_yellow");
            $("#step5").removeClass("step_yellow");
            $("#postcardCanvas").css("display", "none");
            $("#postcardback").css("display", "block");
            $(".canvas-container").css("display", "block");
        });
        /*完成*/
        let btn = document.getElementsByName("btn");
        btn[0].onclick = function () {
            let login = $('.sign').text();
            if (login == "登入登入") { //顯示登入登入--->未登入跳出提醒
                $("#loginBlock").css("display", "block");
            } else { //已登入則打開
                if ($("#name").val() != "" && $("#address").val() != "") {} else if ($("#name").val() == "") {
                    alert("你尚未填寫姓名");
                    eval("document.form['name'].focus()");

                } else if ($("#address").val() == "") {
                    alert("你尚未填寫地址");
                    eval("document.form['address'].focus()");
                }
            }
            let receiver_name = $('#name').val();
            let receiver_address = $('#address').val();
            var canvas = document.getElementById("postcardCanvas");
            var dataURL = canvas.toDataURL("image/png");
            var canvas2 = document.getElementById("postcardback");
            var dataURL2 = canvas2.toDataURL("image/png");

            let neworderForm = new FormData();
            neworderForm.append('hidden_data', dataURL);
            neworderForm.append('hidden_data2', dataURL2);
            neworderForm.append('receiver_name', receiver_name);
            neworderForm.append('receiver_address', receiver_address);


            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    if (xhr.responseText == "error") {
                        alert("Error");

                    } else {
                        alert('已將商品加入訂單囉!!!');
                        location.reload();
                    }
                } else {
                    // alert()
                }
            }
            xhr.open('POST', './php/AddOrder.php', true);
            xhr.send(neworderForm);
        }
    });



    /*步驟一畫圖 */


    $(document).ready(function () {
        var getPixelRatio = function (context) {
            var backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
        };
        let canvas = document.getElementById('postcardCanvas');
        let context = canvas.getContext('2d');
        var ratio = getPixelRatio(context);

        canvas.width = canvas.width * ratio;
        canvas.height = canvas.height * ratio;
        context.scale(ratio, ratio);


        if (window.innerWidth <= 576) { //RWD
            canvas.style.width = canvas.width = "380";
            canvas.style.height = canvas.height = "240";
        } else if (window.innerWidth < 1200) {
            canvas.style.width = canvas.width = "720";
            canvas.style.height = canvas.height = "450";
        } else {
            canvas.style.width = canvas.width = "900";
            canvas.style.height = canvas.height = "560";
        }

        const myFile = document.querySelector('#file')
        myFile.addEventListener('change', function (e) {
            const file = e.target.files[0]
            const reader = new FileReader()
            const img = document.querySelector('#img')
            // 轉換成 DataURL
            reader.readAsDataURL(file)
            reader.onload = function () {
                // 將圖片 src 替換為 DataURL
                img.src = reader.result
                if (postBGC == 1) {
                    let postcard = new Image();
                    let img = new Image();
                    img.src = reader.result;
                    postcard.src = './img/postcard/postcardBGI_1.png';
                    img.onload = function () {
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        context.drawImage(postcard, 0, 0, canvas.width, canvas.height);
                    }
                } else if (postBGC == 2) {
                    let postcard2 = new Image();
                    let img = new Image();
                    img.src = reader.result;
                    postcard2.src = './img/postcard/postcardBGI_2.png';
                    img.onload = function () {
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        context.drawImage(postcard2, 0, 0, canvas.width, canvas.height);
                    }
                } else {
                    let postcard3 = new Image();
                    let img = new Image();
                    img.src = reader.result;
                    postcard3.src = './img/postcard/postcardBGI_3.png';
                    img.onload = function () {
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        context.drawImage(postcard3, 0, 0, canvas.width, canvas.height);
                    }

                }
            }
        })


        let img = new Image();
        img.src = './img/postcard/postcardBGI_1.png';
        context.drawImage(img, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
        let img2 = new Image();
        img2.src = './img/postcard/postcardBGI_2.png';
        let img3 = new Image();
        img3.src = './img/postcard/postcardBGI_3.png';



        let postBGC_1 = document.getElementById("postBGC_1");
        let postBGC_2 = document.getElementById("postBGC_2");
        let postBGC_3 = document.getElementById("postBGC_3");


        let postphoto_1 = document.getElementById("postphoto_1");
        let postphoto_2 = document.getElementById("postphoto_2");
        let postphoto_3 = document.getElementById("postphoto_3");
        let postphoto_4 = document.getElementById("postphoto_4");
        let postBGC = 0;




        $(postBGC_1).click(function () {
            context.drawImage(img, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
            postBGC = 1;
        });
        $(postBGC_2).click(function () {
            context.drawImage(img2, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
            postBGC = 2;
        });
        $(postBGC_3).click(function () {
            context.drawImage(img3, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
            postBGC = 3;
        });


        $(postphoto_1).click(function () {
            if (postBGC == 1) {
                let bgi1 = new Image();
                bgi1.src = './img/postcard/taipei101-1.jpg';
                context.drawImage(bgi1, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
                context.drawImage(img, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
            } else if (postBGC == 2) {
                let bgi1 = new Image();
                bgi1.src = './img/postcard/taipei101-1.jpg';
                context.drawImage(bgi1, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
                context.drawImage(img2, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
            } else {
                let bgi1 = new Image();
                bgi1.src = './img/postcard/taipei101-1.jpg';
                context.drawImage(bgi1, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
                context.drawImage(img3, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
            }
        });
        $(postphoto_2).click(function () {
            if (postBGC == 1) {
                let bgi2 = new Image();
                bgi2.src = './img/postcard/taipei101-2.jpg';
                context.drawImage(bgi2, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
                context.drawImage(img, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
            } else if (postBGC == 2) {
                let bgi2 = new Image();
                bgi2.src = './img/postcard/taipei101-2.jpg';
                context.drawImage(bgi2, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
                context.drawImage(img2, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
            } else {
                let bgi2 = new Image();
                bgi2.src = './img/postcard/taipei101-2.jpg';
                context.drawImage(bgi2, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
                context.drawImage(img3, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
            }
        });
        $(postphoto_3).click(function () {
            if (postBGC == 1) {
                let bgi3 = new Image();
                bgi3.src = './img/postcard/taipei101-3.jpg';
                context.drawImage(bgi3, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
                context.drawImage(img, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
            } else if (postBGC == 2) {
                let bgi3 = new Image();
                bgi3.src = './img/postcard/taipei101-3.jpg';
                context.drawImage(bgi3, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
                context.drawImage(img2, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
            } else {
                let bgi3 = new Image();
                bgi3.src = './img/postcard/taipei101-3.jpg';
                context.drawImage(bgi3, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
                context.drawImage(img3, 0, 0, canvas.width, canvas.height); //drawImage(img,x,y,width,height)
            }
        });

    });





    //操作畫面步驟一(選背景)
    //步驟1_________________________________________________________________________________

    //背景1
    function PostcardChangeBGI_1() {
        document.getElementById("postBGC_1").classList.add("postBGC_1_Selected");
        document.getElementById("postBGC_2").classList.remove("postBGC_2_Selected");
        document.getElementById("postBGC_3").classList.remove("postBGC_3_Selected");
    }
    //背景2
    function PostcardChangeBGI_2() {
        document.getElementById("postBGC_1").classList.remove("postBGC_1_Selected");
        document.getElementById("postBGC_1_foucs").classList.remove("postBGC_1_foucs");
        document.getElementById("postBGC_2").classList.add("postBGC_2_Selected");
        document.getElementById("postBGC_3").classList.remove("postBGC_3_Selected");
    }
    //背景3
    function PostcardChangeBGI_3() {
        document.getElementById("postBGC_1").classList.remove("postBGC_1_Selected");
        document.getElementById("postBGC_2").classList.remove("postBGC_2_Selected");
        document.getElementById("postBGC_3").classList.add("postBGC_3_Selected");
        document.getElementById("postBGC_1_foucs").classList.remove("postBGC_1_foucs");
    }
    $(document).ready(function () {
        document.getElementById("postBGC_1").addEventListener("click", PostcardChangeBGI_1);
        document.getElementById("postBGC_2").addEventListener("click", PostcardChangeBGI_2);
        document.getElementById("postBGC_3").addEventListener("click", PostcardChangeBGI_3);
    });


    //操作畫面步驟二(選風景)
    //步驟2_________________________________________________________________________________
    //風景1
    function PhotoChangeBGI_1() {
        document.getElementById("postphoto_1").classList.add("postphoto_1_Selected");
        document.getElementById("postphoto_2").classList.remove("postphoto_2_Selected");
        document.getElementById("postphoto_3").classList.remove("postphoto_3_Selected");
        document.getElementById("postphoto_4").classList.remove("postphoto_4_Selected");
    }
    //風景2
    function PhotoChangeBGI_2() {
        document.getElementById("postphoto_1").classList.remove("postphoto_1_Selected");
        document.getElementById("postphoto_2").classList.add("postphoto_2_Selected");
        document.getElementById("postphoto_3").classList.remove("postphoto_3_Selected");
        document.getElementById("postphoto_4").classList.remove("postphoto_4_Selected");
    }

    //風景3
    function PhotoChangeBGI_3() {
        document.getElementById("postphoto_1").classList.remove("postphoto_1_Selected");
        document.getElementById("postphoto_2").classList.remove("postphoto_2_Selected");
        document.getElementById("postphoto_3").classList.add("postphoto_3_Selected");
        document.getElementById("postphoto_4").classList.remove("postphoto_4_Selected");
    }

    //風景4
    function PhotoChangeBGI_4() {

        document.getElementById("postphoto_1").classList.remove("postphoto_1_Selected");
        document.getElementById("postphoto_2").classList.remove("postphoto_2_Selected");
        document.getElementById("postphoto_3").classList.remove("postphoto_3_Selected");
        document.getElementById("postphoto_4").classList.add("postphoto_4_Selected");
    }

    $(document).ready(function () {
        document.getElementById("postphoto_1").addEventListener("click", PhotoChangeBGI_1);
        document.getElementById("postphoto_2").addEventListener("click", PhotoChangeBGI_2);
        document.getElementById("postphoto_3").addEventListener("click", PhotoChangeBGI_3);
        document.getElementById("postphoto_4").addEventListener("click", PhotoChangeBGI_4);
        document.getElementById("file").addEventListener("click", file);
    });


    let canvas2 = document.getElementById('postcardback');
    let context = canvas2.getContext('2d');

    let postBGC_1 = document.getElementById("postBGC_1");
    let postBGC_2 = document.getElementById("postBGC_2");
    let postBGC_3 = document.getElementById("postBGC_3");
    let img = new Image();
    img.src = './img/postcard/line-font.png';
    let img2 = new Image();
    img2.src = './img/postcard/blue-font.png';
    let img3 = new Image();
    img3.src = './img/postcard/pink-font.png';


    fabric.Image.fromURL('./img/postcard/line-back.png', (img) => {
        const oImg = img.set({
            scaleX: postcardback.width / img.width,
            scaleY: postcardback.height / img.height,
        })
        postcardback.setBackgroundImage(oImg).renderAll()
    })

    function postcardbackBGI_1() {
        fabric.Image.fromURL('./img/postcard/line-back.png', (img) => {
            const oImg = img.set({
                scaleX: postcardback.width / img.width,
                scaleY: postcardback.height / img.height,
            })
            postcardback.setBackgroundImage(oImg).renderAll()
        })
    }

    function postcardbackBGI_2() {
        fabric.Image.fromURL('./img/postcard/blue-back.png', (img) => {
            const oImg = img.set({
                scaleX: postcardback.width / img.width,
                scaleY: postcardback.height / img.height,
            })
            postcardback.setBackgroundImage(oImg).renderAll()
        })
    }

    function postcardbackBGI_3() {
        fabric.Image.fromURL('./img/postcard/pink-back.png', (img) => {
            const oImg = img.set({
                scaleX: postcardback.width / img.width,
                scaleY: postcardback.height / img.height,
            })
            postcardback.setBackgroundImage(oImg).renderAll()
        })
    }
    $(document).ready(function () {
        document.getElementById("postBGC_1").addEventListener("click", postcardbackBGI_1);
        document.getElementById("postBGC_2").addEventListener("click", postcardbackBGI_2);
        document.getElementById("postBGC_3").addEventListener("click", postcardbackBGI_3);
    });








    document.getElementById("step_btn3").addEventListener("click", iconblack);

    function iconblack() {
        if (localStorage.getItem("hasRunBefore") === null) {
            // show manual-modal
            $('header.fullHeader').addClass('header-backward');
            window.scrollTo(0, 556);
            $('.manual-modal').css({
                top: '556px'
            });
            $('body').addClass('scroll-lock');

            localStorage.setItem("hasRunBefore", false);
        } else {
            $('.fullHeader').removeClass('header-backward');
            $('.manual-modal').addClass('hide-manual-modal');
            $('body').removeClass('scroll-lock');
        }
        // remove manual-modal
        $('.manual-modal').click(function () {
            $('.fullHeader').removeClass('header-backward');
            $('.manual-modal').addClass('hide-manual-modal');
            $('body').removeClass('scroll-lock');
        });
    }

   


    //操作畫面步驟三(選插圖)
    //步驟3_________________________________________________________________________________
    var postFather = document.getElementById("postWhiteBack");
    var postcardbackW = postFather.offsetWidth;
    var postcardbackH = postFather.offsetHeight;


    var postcardback = new fabric.Canvas('postcardback', {
        hoverCursor: 'progress', // 移動時鼠標顯示
        freeDrawingCursor: 'all-scroll', // 畫畫模式時鼠標模式
    });

    postcardback.setWidth(postcardbackW);
    postcardback.setHeight(postcardbackH);

    if (window.innerWidth <= 576) { //RWD
        postcardback.setWidth(postcardbackW); //435
        postcardback.setHeight(postcardbackH); //276
    } else if (window.innerWidth < 1200) {
        postcardback.setWidth(postcardbackW); //720
        postcardback.setHeight(postcardbackH); //450
    } else {
        postcardback.setWidth(postcardbackW); //900
        postcardback.setHeight(postcardbackH); //560
    }

    // postcardback.setBackgroundImage('./img/postcard/wormz.png', () => postcardback.renderAll())


    // postcardback.isDrawingMode = false
    // // postcardback.freeDrawingBrush = new fabric.CircleBrush(postcardback)
    // postcardback.freeDrawingBrush.color = 'rgba(255,0,0, 0.3)'
    // postcardback.freeDrawingBrush.width = 10
    // postcardback.freeDrawingBrush = new fabric.SprayBrush( postcardback)

    fabric.Object.prototype.set({
        transparentCorners: false,
        borderColor: 'block', // 邊框顏色
        cornerColor: 'rgb(156, 20, 24)', // 控制點填滿色
        cornerSize: 10, // 控制點大小
        cornerStrokeColor: 'block', // 控制點邊框色
        padding: 10,
        borderDashArray: [5, 5],
        cornerStyle: 'circle',
        borderColor: 'black',

    });



    // //註冊每個刪除button的click事件
    // $(document).on('click', '.icon', IconChangeBGI_1);
    $(".icon").click(function () {
        iconclick = $(this).children().attr("src");
        // console.log(iconclick);
    });

    $(document).on('click', `.icon`, IconChangeBGI);

    //ICON1
    function IconChangeBGI() {
        $(this).addClass("Selected");
        $(this).siblings().removeClass("Selected");
        fabric.Image.fromURL(iconclick, (img) => {
            img.set({
                scaleX: postcardback.width / img.width / 4,
                scaleY: postcardback.height / img.height / 4,
                hasControls: true, // 是否开启图层的控件
            })
            postcardback.add(img) // 加進canvas
        })
    }



    // $('.black').click(function () {
    //     confirm("這個貼圖需花50點，是否確定購買？");
    //     $("#icon4").attr("src", "./img/postcard/postIcon06.png"); //要更換的圖片位置
    // });

    postcardback.on('mouse:dblclick', e => {
        // console.log(e)
        const active = e.target
        if (active) {

            postcardback.remove(active);
            postcardback.renderAll();
        }
    })



    //操作畫面步驟四(寫文字)
    //步驟4_________________________________________________________________________________
    //建立html連結:註冊顏色按鈕
    /*切換顏色*/
    function postcardTextColorChoose_1() {
        postcardTextColor1.classList.add("postcardTextColorSelected");
        postcardTextColor2.classList.remove("postcardTextColorSelected");
        postcardTextColor3.classList.remove("postcardTextColorSelected");
        postcardTextColor4.classList.remove("postcardTextColorSelected");
    }

    function postcardTextColorChoose_2() {
        postcardTextColor1.classList.remove("postcardTextColorSelected");
        postcardTextColor2.classList.add("postcardTextColorSelected");
        postcardTextColor3.classList.remove("postcardTextColorSelected");
        postcardTextColor4.classList.remove("postcardTextColorSelected");
    }

    function postcardTextColorChoose_3() {
        postcardTextColor1.classList.remove("postcardTextColorSelected");
        postcardTextColor2.classList.remove("postcardTextColorSelected");
        postcardTextColor3.classList.add("postcardTextColorSelected");
        postcardTextColor4.classList.remove("postcardTextColorSelected");
    }

    function postcardTextColorChoose_4() {
        postcardTextColor1.classList.remove("postcardTextColorSelected");
        postcardTextColor2.classList.remove("postcardTextColorSelected");
        postcardTextColor3.classList.remove("postcardTextColorSelected");
        postcardTextColor4.classList.add("postcardTextColorSelected");
    }
    $(document).ready(function () {

        document.getElementById("newTextBtn").addEventListener("click", newText);
        document.getElementById("postcardTextColor1").addEventListener("click", postcardTextColorChoose_1);
        document.getElementById("postcardTextColor2").addEventListener("click", postcardTextColorChoose_2);
        document.getElementById("postcardTextColor3").addEventListener("click", postcardTextColorChoose_3);
        document.getElementById("postcardTextColor4").addEventListener("click", postcardTextColorChoose_4);
    });





    var newTextBtn = document.getElementById("newTextBtn");

    function newText() {
        var postcardColor1 = $("#postcardTextColor1").hasClass("postcardTextColorSelected");
        var postcardColor2 = $("#postcardTextColor2").hasClass("postcardTextColorSelected");
        var postcardColor3 = $("#postcardTextColor3").hasClass("postcardTextColorSelected");
        var postcardColor4 = $("#postcardTextColor4").hasClass("postcardTextColorSelected");

        //建立html連結:抓取文字盒內容(注意抓input值的要寫在函式裡面, 通常打完才會按按鈕抓取文字)
        var postcardText = document.getElementById("postcardText");
        var realText = postcardText.value;


        // const editText = new fabric.IText('雙擊我編輯', {
        //     top: 400,
        //     left: 400
        //   })
        //   canvas.add(editText)


        //沒辦法帶變數給顏色
        if (postcardColor1) {
            const Text_1 = new fabric.Text(realText, {
                left: 40,
                top: 120,
                fill: 'white',
                fontSize: 40,
                fontFamily: '微軟正黑體',
            })
            postcardback.add(Text_1);
        } else if (postcardColor2) {
            const Text_1 = new fabric.Text(realText, {
                left: 40,
                top: 120,
                fill: 'rgb(178, 100, 102)',
                fontSize: 40,
                fontFamily: '微軟正黑體',
            })
            postcardback.add(Text_1);
        } else if (postcardColor3) {
            const Text_1 = new fabric.Text(realText, {
                left: 40,
                top: 120,
                fill: 'rgb(255, 201, 121)',
                fontSize: 40,
                fontFamily: '微軟正黑體',
            })
            postcardback.add(Text_1);
        } else if (postcardColor4) {
            const Text_1 = new fabric.Text(realText, {
                left: 40,
                top: 120,
                fill: 'rgba(0, 0, 0, 0.9)',
                fontSize: 40,
                fontFamily: '微軟正黑體',
            })
            postcardback.add(Text_1);
        }

        //清空
        postcardText.value = "";
    }


    //操作畫面步驟五(寫地址)
    //步驟5_________________________________________________________________________________


    $(document).ready(function () {
        $('.inputform').focus(function () {
            $(this).css("border-color", "green")
        })
        $('.inputform').blur(function () {
            $(this).css("border-color", "")
        })
        var rule1 = /^.{2,16}$/;
        $("#name").blur(function () {
            if (rule1.test($(this).val())) {
                $('.error1').text('')
                $(this).css("border-color", "green")
            } else {
                $('.error1').text('不符合規則，請輸入2~16個任意文字')
                $(this).css("border-color", "red")
            }
        })

    })
    // $("#address1").twzipcode({
    //     zipcodeIntoDistrict: true, // 郵遞區號自動顯示在區別選單中
    //     css: ["city_form-control", "town_form-control"], // 自訂 "城市"、"地別" class 名稱 
    //     countyName: "city", // 自訂城市 select 標籤的 name 值
    //     districtName: "town" // 自訂區別 select 標籤的 name 值
    // });
    // $("#step_btn9").click(function () {
    //     let yyy = document.getElementById("name");
    //      yyy = yyy.value;
    //     let zzz = document.getElementById("address");
    //      zzz = zzz.value;
    //     alert("你的姓名是 " + yyy + "\n電子郵件是 " + zzz);
    // });
    // var butSave = document.getElementById("save");
    // butSave.onclick=function(){
    //     var svaeHref = document.getElementById("save_href");


    //     var tempSrc = postcardCanvas.toDataURL("image/png");
    //     var tempSrc2 = postcardback.toDataURL("image/png");
    //     svaeHref.href=['tempSrc,tempSrc2']; 

    //     var img = document.getElementById("save_img");
    //     var img2 = document.getElementById("save_img2");
    //     img.src=tempSrc; 
    //     img2.src=tempSrc2;  
    // }
    // function saveImage() {
    //     var canvas = document.getElementById("postcardCanvas");
    //     var dataURL = canvas.toDataURL("image/png");
    //     document.getElementById('hidden_data').value = dataURL;
    //     // document.getElementById("testImg").src = dataURL;
    //     var formData = new FormData(document.getElementById("form1"));
    //     var xhr = new XMLHttpRequest();

    //     xhr.onload = function () {
    //         if (xhr.status == 200) {
    //             if (xhr.responseText == "error") { 
    //                 alert("Error");
    //             } else {
    //                 alert('Succesfully uploaded');
    //             }
    //         } else {
    //             alert(xhr.status)
    //         }
    //     }
    //     xhr.open('POST', './php/AddOrder.php', true);
    //     xhr.send(formData);
    // }






    // $(document).on('click', '#step_btn9', order);


}
window.addEventListener('load', doFirst);