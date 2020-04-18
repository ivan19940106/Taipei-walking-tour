<?php
try{
    require_once("./connectBooks.php");
    $sql ="
    DELETE FROM `mood_report` 
    WHERE `mood_report_number` = :reportNum";

    $moodReport = $pdo->prepare($sql);
    $moodReport->bindValue(":reportNum",$_GET["reportNum"]);
 
    $moodReport->execute();
    
}catch(PDOException $e){
    echo $e->getMessage();
}
?>