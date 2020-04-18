<?php
try {
    require_once("./connectBooks.php");
    $number=$_GET["number"];
    $updatenum=$_GET["updatenum"];
    $sql = "update `staff` set staff_status=:updatenum where staff_number=:number";

    $upma = $pdo->prepare($sql);
    $upma->bindvalue(":number",$number);
    $upma->bindvalue(":updatenum",$updatenum);
    $upma->execute();
    if($upma->rowCount() == 1){
        echo "修改管理員成功";
    }else{
        echo "修改管理員失敗";
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
