<?php
try{
    require_once("./connectBooks.php");
    //撈取心情卡片、會員資料
    $sql ="
    select * 
    from `mood` mo 
    join `member` me on (mo.member_number = me.member_number) 
    WHERE mo.mood_class = :moodClass and mo.mood_status = 1
    order by :orderSelect desc";
    $moodCards = $pdo->prepare($sql);
    $moodCards -> bindValue(":moodClass",$_POST["moodClass"]);
    $moodCards -> bindValue(":orderSelect",$_POST["orderSelect"]);
    $moodCards -> execute();
    
    $moodCard = $moodCards->fetchAll(PDO::FETCH_ASSOC);

    //撈取各心情卡片的回應數 此處要用LEFT OUTER JOIN，沒有被留言的卡片才會得到count數是0
    $sql2="
    SELECT mo.mood_number,COUNT(ms.mood_number) as 'moodMsgCount'
    FROM `mood` mo LEFT JOIN mood_message ms on mo.mood_number = ms.mood_number 
    WHERE mo.mood_class = :moodClass and mo.mood_status = 1
    GROUP BY mo.mood_number
    ORDER BY :orderSelect desc";
    $moodMsgs = $pdo->prepare($sql2);
    $moodMsgs -> bindValue(":moodClass",$_POST["moodClass"]);
    $moodMsgs -> bindValue(":orderSelect",$_POST["orderSelect"]);
    $moodMsgs -> execute();

    $moodMsg = $moodMsgs->fetchAll(PDO::FETCH_ASSOC);

    //把兩個SQL撈出的東西放到一個array中回傳
    echo json_encode(array('moodCard'=>$moodCard,'moodMsg'=>$moodMsg));

}catch(PDOException $e){
    echo $e->getMessage();
}
?>
