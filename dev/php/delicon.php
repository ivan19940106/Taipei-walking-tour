<?php
try {
    require_once("connectBooks.php");
    $sql = "delete from `mem_product` where customized_product_number = :Icon_num ";
    $delicons = $pdo->prepare($sql);
    $delicons->bindvalue(":Icon_num",$_POST["Icon_num"]);
    $delicons->execute();
    // echo "成功刪除了", $delicons->rowCount(), "貼圖";
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>

