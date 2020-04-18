<?php
try{
    require_once("./connectBooks.php");
    $sql ="select * from `robot` where keyword_status = 1";
    $keywords = $pdo->query($sql);
    
    $keywordRow = $keywords->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($keywordRow);

}catch(PDOException $e){
    echo $e->getMessage();
}
?>



