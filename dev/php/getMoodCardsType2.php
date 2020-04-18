<?php
try{
    require_once("./connectBooks.php");

    //撈取心情卡片、會員資料
    $sql ="
    select * 
    from `mood` mo 
    join `member` me on (mo.member_number = me.member_number) 
    where mo.mood_status = 1 and mo.mood_class = '散步日記'
    ORDER BY mo.mood_number desc;";
    $moodCards = $pdo->query($sql);
    $moodCard = $moodCards->fetchAll(PDO::FETCH_ASSOC);

    //撈取各心情卡片的回應數 此處要用LEFT OUTER JOIN，沒有被留言的卡片才會得到count數是0
    $sql2="
    SELECT mo.mood_number,COUNT(ms.mood_number) as 'moodMsgCount'
    FROM `mood` mo LEFT JOIN mood_message ms on mo.mood_number = ms.mood_number 
    WHERE mo.mood_status = 1 and mo.mood_class = '散步日記'
    GROUP BY mo.mood_number
    ORDER BY mo.mood_number desc";
    $moodMsgs = $pdo->query($sql2);
    $moodMsg = $moodMsgs->fetchAll(PDO::FETCH_ASSOC);

    //把兩個SQL撈出的東西放到一個array中回傳
    echo json_encode(array('moodCard'=>$moodCard,'moodMsg'=>$moodMsg));

}catch(PDOException $e){
    echo $e->getMessage();
}
?>
