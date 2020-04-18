<?php
try{
    require_once("./connectBooks.php");
    
    $sql="INSERT INTO `mood_report` 
    (`mood_report_number`, `mood_number`, `mood_report_reason`) VALUES
    (NULL, :moodNum, :reason) ;";
    

    $moodReport = $pdo->prepare($sql);
    $moodReport->bindValue(":moodNum",$_POST["moodNum"]);
    $moodReport->bindValue(":reason",$_POST["reason"]);
    $moodReport->execute();
    

}catch(PDOException $e){
    echo $e->getMessage();
    echo $e->getLine();
}
?>