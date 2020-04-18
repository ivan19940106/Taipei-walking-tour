<?php
try{
    require_once("./connectBooks.php");
    $sql ="
    UPDATE `mood` SET mood_heart = :heartCount+1
    WHERE mood_number = :moodNum ;
    ";

    $heartAdd = $pdo->prepare($sql);
    

    $heartAdd->bindValue(":heartCount",$_POST["heartCount"]);
    $heartAdd->bindValue(":moodNum",$_POST["moodNum"]);

    $heartAdd->execute();

    //傳回更新後的愛心數
    // $sql2 ="
    // SELECT mood_heart
    // FROM mood
    // WHERE mood_number = :moodNum ;
    // "
    // $newCounts = $pdo->prepare($sql2);
    // $newCounts -> bindValue(":moodNum",$_POST["moodNum"]);
    // $newCounts -> execute();
    // $newCount = $newCounts ->fetch(PDO::FETCH_ASSOC);

    // echo json_encode($newCount);
    

}catch(PDOException $e){
    echo $e->getMessage();
}
?>