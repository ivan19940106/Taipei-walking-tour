<?php
try {
    require_once("./connectBooks.php");
    $memNum=$_GET["number"];
    $sql = "select * from `order_master` where `member_number`=:memNum ORDER BY `order_master`.`order_number` DESC";
    $orderinfo = $pdo->prepare($sql);
    $orderinfo->bindvalue(":memNum",$memNum);
    $orderinfo->execute();

    $orderRow = $orderinfo->fetchAll(PDO::FETCH_ASSOC);

    // $sql = "select * from `order_master` a join `order_list`b on( a.order_number=b.order_number) where member_number=:memNum";
    // $orderlistinfo = $pdo->prepare($sql);
    // $orderlistinfo->bindvalue(":memNum",$memNum);
    // $orderlistinfo->execute();

    // $orderlistRow = $orderlistinfo->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($orderRow);
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
