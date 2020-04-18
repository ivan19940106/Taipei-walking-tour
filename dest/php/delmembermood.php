<?php
try {
    require_once("./connectBooks.php");
    $number=$_GET["number"];
    $sql = "delete from `mood` where mood_number=:number";

    $delmood = $pdo->prepare($sql);
    $delmood->bindvalue(":number",$number);
    $delmood->execute();
    if($delmood->rowCount() == 1){
        echo "刪除心情成功";
    }else{
        echo "刪除心情失敗";
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
