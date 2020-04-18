<?php
try{
    require_once("./connectBooks.php");
    
    $sql="INSERT INTO `event_report` 
    (`event_report_number`, `event_number`, `event_report_reason`) VALUES
    (NULL, :event_number, :event_report_reason) ;";
    

    $event_Report = $pdo->prepare($sql);
    $event_Report->bindValue(":event_number",$_POST["event_number"]);
    $event_Report->bindValue(":event_report_reason",$_POST["event_report_reason"]);
    $event_Report->execute();
    

}catch(PDOException $e){
    echo $e->getMessage();
    echo $e->getLine();
}
?>