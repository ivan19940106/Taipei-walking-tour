<?php
try{
    require_once("./connectBooks.php");
    $sql ="select * 
    from `mood_report` mr join `mood` mo on (mr.mood_number = mo.mood_number)";
    $report = $pdo->query($sql);
    
    $reportRow = $report->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($reportRow);

}catch(PDOException $e){
    echo $e->getMessage();
}
?>



