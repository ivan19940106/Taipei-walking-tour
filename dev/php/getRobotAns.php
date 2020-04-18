<?php
try{
    require_once("./connectBooks.php");
    $sql ="
    select * from `robot` 
    where keyword_word like :keyword_word;
    ";

    $keywords = $pdo->prepare($sql);
    $keywords->bindValue(":keyword_word",$_GET["keyword_word"]);
    $keywords->execute();
    
    if( $keywords->rowCount() == 0 ){//找不到
        echo "{}";
      }else{
        $keyword = $keywords->fetch(PDO::FETCH_ASSOC);
        //將各欄位內容串接起來
        echo json_encode($keyword);
      }	

    // $keywordRow = $keywords->fetchAll(PDO::FETCH_ASSOC);
    // echo json_encode($keywordRow);

}catch(PDOException $e){
    echo $e->getMessage();
}
?>