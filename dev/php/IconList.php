<?php
try{
    require_once("./connectBooks.php");
    $sql ="SELECT * FROM `mem_product`;";
   
    $Icon = $pdo->query($sql);
    
    $IconRow = $Icon->fetchAll(PDO::FETCH_ASSOC);
    //送出json字串
    echo json_encode($IconRow);

}catch(PDOException $e){
    echo $e->getMessage();
    echo $e->getLine();
}
?>