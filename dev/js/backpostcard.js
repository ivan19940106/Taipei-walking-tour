//////////////////////////load建立管理員&&會員
// let mem_product;
window.addEventListener("load", function () {
    showPhoto();

    // getmanager();
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        mem_product = JSON.parse(xhr.responseText);
        let iconList = document.getElementById("iconList");
        let mem_productRow = ``;
        for (i = 0; i < mem_product.length; i++) {
            mem_productRow += `
            <tr class="row">
                <th class="col-2">${mem_product[i].customized_product_number}</th>
                <th class="col-4">${mem_product[i].customized_product_url}</th>
                <th class="col-4">
                    <div class="icon"><img class="iconimg" src="./img/postcard/${mem_product[i].customized_product_url}" alt="icon1">
                    </div>
                </th>
                <th class="col-2"><button class="btnDelIcon">刪除</button></th>
            </tr>
        `;
            iconList.innerHTML = mem_productRow;
        }
    }
    xhr.open("get", "./php/mem_product.php", true);
    xhr.send(null);
})

function showPhoto() {
    let showPhoto = document.getElementsByClassName("showPhoto");
    let btnShow = document.getElementsByClassName("btnShow");
    for (let i = 0; i < showPhoto.length; i++) {
        btnShow[i].onchange = function (e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = function (e) {
                showPhoto[i].src = reader.result;
            }
            reader.readAsDataURL(file);
        }
    }
}




document.getElementById("btnAddIcon").addEventListener("click", function () {
    
    let IconNum = document.getElementById("IconNum").value;
    // let IconPoint = document.getElementById("IconPoint").value;
    let upFile = document.getElementById("upFile").files[0];
    // console.log(IconNum);
    // console.log(IconPoint);
    // console.log(upFile);

    var Addicon = new FormData();
    if (document.getElementById("IconNum").value.length == 0) {
        alert("商品部件編號不能為空");
        document.getElementById("IconNum").focus();
        return
    }
    Addicon.append('IconNum', IconNum);
    // Addicon.append('IconPoint', IconPoint);
    Addicon.append('upFile', upFile);
    // console.log(Addicon)
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
    xhr.open("post", "./php/newicon.php", true);
    xhr.send( Addicon);
    location.reload();
});




