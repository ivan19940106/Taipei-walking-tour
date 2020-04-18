<?php
try{
    require_once("./connectBooks.php");
    $sql ="
    DELETE FROM `event_report`
    WHERE event_report_number = :event_report_number ;
    update `event`
    set event_status = 0
    where event_number = :event_number;
    ";


    $event_report_number = $pdo->prepare($sql);
    $event_report_number->bindValue(":event_report_number",$_POST["event_report_number"]);
    $event_report_number->bindValue(":event_number",$_POST["event_number"]);

    $event_report_number->execute();
    
    // echo "成功刪除", $event_report_number->rowCount(), "筆檢舉";

}catch(PDOException $e){
    echo $e->getMessage();
}
?>