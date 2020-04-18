<?php
try{
    require_once("./connectBooks.php");

    //心情內容、會員資料
    $sql ="
    select * 
    from `mood` mo 
    join `member` me on (mo.member_number = me.member_number) 
    where :moodNumFormInput = mo.mood_number
    ;";
    $moodDatails = $pdo->prepare($sql);
    $moodDatails->bindValue(":moodNumFormInput",$_POST["moodNumFormInput"]);
    $moodDatails->execute();
    $moodDatail = $moodDatails->fetch(PDO::FETCH_ASSOC);

    //留言資料
    $sql2 ="
    select * 
    from `mood_message`
    where mood_number = :moodNumFormInput
    ;";
    $moodMsgs = $pdo->prepare($sql2);
    $moodMsgs->bindValue(":moodNumFormInput",$_POST["moodNumFormInput"]);
    $moodMsgs->execute();
    $moodMsg = $moodMsgs->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(array('moodData'=>$moodDatail,'moodMsg'=>$moodMsg));
    

}catch(PDOException $e){
    echo $e->getMessage();
}
?>