<?php
session_start();
$member = $_SESSION["member_number"];
try{
    require_once("./connectBooks.php");
    $sql ="INSERT INTO `event` 
    (`event_number`, `route_number`, `origin_member_number`, `event_name`, `enroll_start_date`,`enroll_end_date`,`event_date`,`meeting_place`,`min_attendance`,`max_attendance`,`now_attendance`,`event_information`,`event_cover_url`,`event_status`) VALUES  
    (NULL, :route_number, $member, :event_name, now(),:event_date-2,:event_date,:meeting_place,1,:max_attendance,0,:event_information,:event_cover_url,1);
    ";
   
    $events = $pdo->prepare($sql);
    $events->bindValue(":route_number",$_POST["route_number"]);
    $events->bindValue(":event_name",$_POST["event_name"]);
    $events->bindValue(":event_date",$_POST["event_date"]);
    $events->bindValue(":meeting_place",$_POST["meeting_place"]);
    $events->bindValue(":max_attendance",$_POST["max_attendance"]);
    $events->bindValue(":event_information",$_POST["event_information"]);
    $events->bindValue(":event_cover_url",$_FILES["event_cover_url"]['name']);
    $events->execute();
    
    echo "成功發起了", $events->rowCount(), "個揪團";

}catch(PDOException $e){
    echo $e->getMessage();
}
?>

<?php
// 取得自動創號的key值
$num = $pdo->lastInsertId();

switch ($_FILES['event_cover_url']['error']) {
    case 0:
        if (file_exists("../img/eventPhoto") === false) {
            //如果還沒有moodPhoto資料夾的話就建立一個
            mkdir("../img/eventPhoto");
        }
        $oldName = pathinfo($_FILES['event_cover_url']['name']);  //抓到使用者上傳的檔案原名
        $from = $_FILES['event_cover_url']['tmp_name'];
        $newName ="event_cover_url"."{$num}.{$oldName["extension"]}";
        $to = "../img/eventPhoto/$newName";

        if (move_uploaded_file($from, $to)) {
			$sql = " update `event` set `event_cover_url` = :newName where event_number = $num ;";
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
        echo "error.....: ", $_FILES['event_cover_url']['error'], "<br>"; // 發生的錯誤代碼
}
?>