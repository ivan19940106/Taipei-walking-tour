<?php
try{
    require_once("./connectBooks.php");
    $sql ="
    DELETE FROM `event_report`
    WHERE event_report_number = :event_report_number;";
    



    $event_report_number = $pdo->prepare($sql);
    $event_report_number->bindValue(":event_report_number",$_POST["event_report_number"]);

    $event_report_number->execute();
    
    // echo "成功處理了", $event_report_number->rowCount(), "筆檢舉";


}catch(PDOException $e){
    echo $e->getMessage();
}
?>