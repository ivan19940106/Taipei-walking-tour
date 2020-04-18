<?php
try {
    require_once("./connectBooks.php");
    $number=$_GET["number"];
    $updatenum=$_GET["updatenum"];
    $sql = "update `member` set member_sataus=:updatenum where member_number=:number";

    $upmember = $pdo->prepare($sql);
    $upmember->bindvalue(":number",$number);
    $upmember->bindvalue(":updatenum",$updatenum);
    $upmember->execute();
    if($upmember->rowCount() == 1){
        echo "修改會員成功";
    }else{
        echo "修改會員失敗";
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
