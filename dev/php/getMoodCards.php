<?php
try{
    require_once("./connectBooks.php");

    //用變數接要ORDER BY的值 因為ORDER BY限制不能用bindValue的方式帶入，所以改用變數帶入
    $moodOrder = $_GET["moodOrder"];

    //判斷sql要走 全部 or 某一分類
    if($_GET["moodClass"] == "all"){
        $sql = "
        select * 
        from `mood` mo 
        join `member` me on (mo.member_number = me.member_number) 
        where mo.mood_status = 1
        order by $moodOrder desc";
        $moodCards = $pdo->prepare($sql);
        $moodCards -> execute();
        $moodCard = $moodCards->fetchAll(PDO::FETCH_ASSOC);

        $sql2 = "
        SELECT mo.mood_number,COUNT(ms.mood_number) as 'moodMsgCount'
        FROM `mood` mo LEFT JOIN mood_message ms on mo.mood_number = ms.mood_number 
        WHERE mo.mood_status = 1
        GROUP BY mo.mood_number
        ORDER BY $moodOrder desc";
        $moodMsgs = $pdo->prepare($sql2);
        $moodMsgs -> execute();
        $moodMsg = $moodMsgs->fetchAll(PDO::FETCH_ASSOC);

    }else{
        $sql = "
        select * 
        from `mood` mo 
        join `member` me on (mo.member_number = me.member_number) 
        where mo.mood_status = 1 and mo.mood_class = :moodClass
        order by $moodOrder desc";
        $moodCards = $pdo->prepare($sql);
        $moodCards -> bindValue(":moodClass",$_GET["moodClass"]);
        $moodCards -> execute();
        $moodCard = $moodCards->fetchAll(PDO::FETCH_ASSOC);

        $sql2 = "
        SELECT mo.mood_number,COUNT(ms.mood_number) as 'moodMsgCount'
        FROM `mood` mo LEFT JOIN mood_message ms on mo.mood_number = ms.mood_number 
        WHERE mo.mood_status = 1 and mo.mood_class = :moodClass
        GROUP BY mo.mood_number
        ORDER BY $moodOrder desc";
        $moodMsgs = $pdo->prepare($sql2);
        $moodMsgs -> bindValue(":moodClass",$_GET["moodClass"]);
        $moodMsgs -> execute();
        $moodMsg = $moodMsgs->fetchAll(PDO::FETCH_ASSOC);

    }
    
    echo json_encode(array('moodCard'=>$moodCard,'moodMsg'=>$moodMsg));

}catch(PDOException $e){
    echo $e->getMessage();
}
?>