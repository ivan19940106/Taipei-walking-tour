<?php
try{
    require_once("./connectBooks.php");
    $sql ="
    UPDATE `mood` SET mood_status = 0
    WHERE mood_number = :moodNum ;
    ";

    $hideMood = $pdo->prepare($sql);
    
    $hideMood->bindValue(":moodNum",$_GET["moodNum"]);
    $hideMood->execute();
    

}catch(PDOException $e){
    echo $e->getMessage();
}
?>