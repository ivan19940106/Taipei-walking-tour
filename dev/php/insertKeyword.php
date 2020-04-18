<?php
try{
    require_once("./connectBooks.php");
    $sql ="
    INSERT INTO `robot` 
    (`keyword_number`, `keyword_word`, `keyword_response`, `keyword_status`) VALUES 
    (NULL, :keywordWord, :keywordAns, :keywordStatus);
    ";

    $keywords = $pdo->prepare($sql);
    $keywords->bindValue(":keywordWord",$_POST["keywordWord"]);
    $keywords->bindValue(":keywordAns",$_POST["keywordAns"]);
    $keywords->bindValue(":keywordStatus",$_POST["keywordStatus"]);
    $keywords->execute();
    
    echo "成功新增了", $keywords->rowCount(), "個關鍵字";

}catch(PDOException $e){
    echo $e->getMessage();
}
?>