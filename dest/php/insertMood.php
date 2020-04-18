<?php
try{
    require_once("./connectBooks.php");
    $sql ="
    INSERT INTO `mood` 
    (`mood_number`, `member_number`, `mood_date`, `mood_class`, `mood_content`, `mood_photo`, `mood_heart`, `mood_status`) VALUES 
    (NULL, :moodMemNum, CURRENT_DATE(), :moodClass, :moodContent, :moodPic, '0', '1');
    ";

    $newMood = $pdo->prepare($sql);
    $newMood->bindValue(":moodMemNum",$_POST["moodMemNum"]);
    $newMood->bindValue(":moodClass",$_POST["moodClass"]);
    $newMood->bindValue(":moodContent",$_POST["moodContent"]);
    $newMood->bindValue(":moodPic",$_FILES["moodPic"]['name']);
    $newMood->execute();
    
    // echo "寫入", $newMood->rowCount(), "筆心情";

}catch(PDOException $e){
    echo $e->getMessage();
}
?>

<?php
// 取得自動創號的key值
$num = $pdo->lastInsertId();

switch ($_FILES['moodPic']['error']) {
    case 0:
        if (file_exists("../img/moodPhoto") === false) {
            //如果還沒有moodPhoto資料夾的話就建立一個
            mkdir("../img/moodPhoto");
        }
        $oldName = pathinfo($_FILES['moodPic']['name']);  //抓到使用者上傳的檔案原名
        $from = $_FILES['moodPic']['tmp_name'];
        $newName ="moodPic"."{$num}.{$oldName["extension"]}";
        $to = "../img/moodPhoto/$newName";

        if (move_uploaded_file($from, $to)) {
			$sql = " update `mood` set `mood_photo` = :newName where mood_number = $num ;";
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
        echo "error.....: ", $_FILES['moodPic']['error'], "<br>"; // 發生的錯誤代碼
}
?>