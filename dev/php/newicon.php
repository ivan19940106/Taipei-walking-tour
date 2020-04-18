<?php
try {
    require_once("connectBooks.php");
    
    
    
    // $IconNum=$_GET["IconNum"];
    // $IconPoint=$_GET["IconPoint"];
    // $upFile=$_GET["upFile"];
    $sql = "insert into `mem_product`(customized_product_number,customized_product_url)
            values(:IconNum,:upFile)";

    $newicon = $pdo->prepare($sql);
    $newicon->bindvalue(":IconNum", $_POST["IconNum"]);
    $newicon->bindValue(":upFile",$_FILES["upFile"]['name']);
    $newicon->execute();
    if($newicon->rowCount() == 1){
        echo "新增貼圖成功";
    }else{
        echo "新增貼圖失敗";
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
<?php
// 取得自動創號的key值
$num = $pdo->lastInsertId();
switch ($_FILES['customized_product_url']['error']) {
    case 0:
        if (file_exists("../img/postcardPhoto") === false) {
            //如果還沒有moodPhoto資料夾的話就建立一個
            mkdir("../img/postcardPhoto");
        }
        $oldName = pathinfo($_FILES['customized_product_url']['name']);  //抓到使用者上傳的檔案原名
        $from = $_FILES['customized_product_url']['tmp_name'];
        $newName ="customized_product_url"."{$num}.{$oldName["extension"]}";
        $to = "../img/postcardPhoto/$newName";

        if (move_uploaded_file($from, $to)) {
			$sql = " update `mem_product` set `customized_product_url` = :newName where event_number = $num ;";
			$changeName = $pdo->prepare($sql);
			$changeName -> bindValue(":newName", $newName);
			$changeName -> execute();
            echo "上傳成功";
        } else {
            echo "上傳失敗";
        }
        break;
    case 1:
        echo "上傳檔案太大, 不可超過", ini_get("upload_max_filesize"), "<br>"; // 取得ini配置的參數
        break;
    case 2:
        echo "上傳檔案不完整<br>";
        break;
    case 3:
        echo "未選檔案<br>";
        break;
    default:
        echo "error.....: ", $_FILES['customized_product_url']['error'], "<br>"; // 發生的錯誤代碼
}
?>