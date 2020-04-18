<?php
try{
    require_once("./connectBooks.php");
    $sql ="
    INSERT INTO `mood_message` 
    (`message_number`, `mood_number`, `message_from`, `message_content`) VALUES 
    (NULL, :msgMoodNum, :msgFrom, :leaveMsg)
    ";

    $message = $pdo->prepare($sql);
    $message->bindValue(":msgMoodNum",$_POST["msgMoodNum"]);
    $message->bindValue(":msgFrom",$_POST["msgFrom"]);
    $message->bindValue(":leaveMsg",$_POST["leaveMsg"]);
    $message->execute();
    
    echo "留言成功", $message->rowCount(), "筆";

}catch(PDOException $e){
    echo $e->getMessage();
}
?>