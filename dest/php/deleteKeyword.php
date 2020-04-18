<?php
try{
    require_once("./connectBooks.php");
    $sql ="
    DELETE FROM `robot`
    WHERE keyword_number = :keywordNo ;
    ";

    $keywords = $pdo->prepare($sql);
    $keywords->bindValue(":keywordNo",$_POST["keywordNo"]);
 
    $keywords->execute();
    
    echo "成功刪除了", $keywords->rowCount(), "個關鍵字";

}catch(PDOException $e){
    echo $e->getMessage();
}
?>