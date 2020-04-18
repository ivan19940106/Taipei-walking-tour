<?php
try {
    require_once("./connectBooks.php");
    $number=$_GET["number"];
    $joinnumber=$_GET["joinnumber"];
    $sql = "delete from `event_record` where event_number=:joinnumber and member_number=:number ";

    $deljoin = $pdo->prepare($sql);
    $deljoin->bindvalue(":number",$number);
    $deljoin->bindvalue(":joinnumber",$joinnumber);
    $deljoin->execute();
    if($deljoin->rowCount() == 1){
        echo "取消成功";
    }else{
        echo "取消失敗";
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
