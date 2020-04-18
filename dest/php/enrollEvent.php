<?php
session_start();
$member = $_SESSION["member_number"];

try{
    require_once("./connectBooks.php");
    
    $sql="INSERT INTO `event_record` 
    (`event_number`, `member_number`, `enroll_date`) VALUES
    (:enroll_event_number, $member,now()) ;
    UPDATE `event` SET now_attendance=now_attendance+1  WHERE event_number =:enroll_event_number;";


    $event_record = $pdo->prepare($sql);
    $event_record->bindValue(":enroll_event_number",$_POST["enroll_event_number"]);
    $event_record->execute();
    
    echo '加入成功';

}catch(PDOException $e){
    echo $e->getMessage();
    echo $e->getLine();
}
?>