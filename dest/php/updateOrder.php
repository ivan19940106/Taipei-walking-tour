<?php
try{
    require_once("./connectBooks.php");
    $sql ="
    UPDATE `order_master` SET shopping_status = :shopping_status  WHERE order_number = :order_number ;
    ";

    $updateOrder = $pdo->prepare($sql);
    $updateOrder->bindValue(":order_number",$_POST["OrderNo"]);
    $updateOrder->bindValue(":shopping_status",$_POST["status"]);
    $updateOrder->execute();
    
    echo "成功修改了", $updateOrder->rowCount(), "個出貨狀態";

}catch(PDOException $e){
    echo $e->getMessage();
}
?>
