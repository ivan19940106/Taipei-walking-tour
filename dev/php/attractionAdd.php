<?php
try {
    require_once("./connectBooks.php");
    $sql = "
INSERT INTO `attractions`
 (`attraction_number`, `attraction_name`, 
  `attraction_address`, `attraction_information1`,
  `attraction_information2`, `attraction_photo1`, 
  `attraction_photo2`, `attraction_latitude`, 
  `attraction_longitude`, `attraction_status`) VALUES 
  (NULL, :attrName,:attrAddress, :attrInfo1, :attrInfo2, :attrPhoto1, :attrPhoto2, :attrLat,:attrLot, :attrStatus)
  ;";

    $edit = $pdo->prepare($sql);
    $edit->bindValue(":attrName", $_POST["attrName"]);
    $edit->bindValue(":attrAddress", $_POST["attrAddress"]);
    $edit->bindValue(":attrInfo1", $_POST["attrInfo1"]);
    $edit->bindValue(":attrInfo2", $_POST["attrInfo2"]);
    $edit->bindValue(":attrPhoto1", $_FILES["attrPhoto1"]);
    $edit->bindValue(":attrPhoto2", $_FILES["attrPhoto2"]);
    $edit->bindValue(":attrLat", $_POST["attrLatitude"]);
    $edit->bindValue(":attrLot", $_POST["attrLongitude"]);
    $edit->bindValue(":attrStatus", $_POST["attrStatus"]);

    $edit->execute();

    echo "修改成功";

} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
<?php
// 取得自動創號的key值
$num = $pdo->lastInsertId();

switch ($_FILES['attrPhoto1']['error']) {
    case 0:
        if (file_exists("../img/attractions") === false) {
            //make directory
            mkdir("../img/attractions");
        }
        $oldName1 = pathinfo($_FILES['attrPhoto1']['name']);
        $from = $_FILES['attrPhoto1']['tmp_name'];
        $newName1 ="attr"."{$num}-1.{$oldName1["extension"]}";
        $to = "../img/attractions/$newName1";

        if (move_uploaded_file($from, $to)) {
			$sql = " update `attractions` set `attraction_photo1` = :imgName where attraction_number = $num ;";
			$changeName = $pdo->prepare($sql);
			$changeName -> bindValue(":imgName", $newName1);
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
        echo "error.....: ", $_FILES['attrPhoto1']['error'], "<br>"; // 發生的錯誤代碼
}
?>
<?php
switch ($_FILES['attrPhoto2']['error']) {
    case 0:
        if (file_exists("../img/attractions") === false) {
            //make directory
            mkdir("../img/attractions");
        }
        $oldName2 = pathinfo($_FILES['attrPhoto2']['name']);
        $from = $_FILES['attrPhoto2']['tmp_name'];
        $newName2 ="attr"."{$num}-2.{$oldName2["extension"]}";
        $to = "../img/attractions/$newName2";

        if (move_uploaded_file($from, $to)) {
            $sql = " update `attractions` set `attraction_photo2` = :imgName where attraction_number = $num ;";
			$changeName = $pdo->prepare($sql);
			$changeName -> bindValue(":imgName", $newName2);
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
        echo "error.....: ", $_FILES['attrPhoto2']['error'], "<br>"; // 發生的錯誤代碼
}
?>