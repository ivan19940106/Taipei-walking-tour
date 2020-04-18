<?php
try{
    require_once("./connectBooks.php");
    $sql ="
    UPDATE `robot` SET keyword_word = :keywordWord,
     keyword_response = :keywordAns, 
     keyword_status = :keywordStatus 
    WHERE keyword_number = :keywordNo ;
    ";

    $keywords = $pdo->prepare($sql);
    // $keywords->bindValue(":keywordNo",1);
    // $keywords->bindValue(":keywordWord","台北散步");
    // $keywords->bindValue(":keywordAns","我們是一個用趣味導覽台北散步路線的網站，希望到站的訪客都能對台北有更多了解與喜愛！");
    // $keywords->bindValue(":keywordStatus",1);

    $keywords->bindValue(":keywordNo",$_POST["keywordNo"]);
    $keywords->bindValue(":keywordWord",$_POST["keywordWord"]);
    $keywords->bindValue(":keywordAns",$_POST["keywordAns"]);
    $keywords->bindValue(":keywordStatus",$_POST["keywordStatus"]);
    $keywords->execute();
    
    echo "成功修改了", $keywords->rowCount(), "個關鍵字";

}catch(PDOException $e){
    echo $e->getMessage();
}
?>