<?php
try {
    require_once("./connectBooks.php");
    $number=$_GET["number"];
    $sql = "delete from `staff` where staff_number=:number ";

    $delma = $pdo->prepare($sql);
    $delma->bindvalue(":number",$number);
    $delma->execute();
    if($delma->rowCount() == 1){
        echo "刪除管理員成功";
    }else{
        echo "刪除管理員失敗";
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
