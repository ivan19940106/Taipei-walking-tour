<?php
try {
    require_once("./connectBooks.php");
    $sql = "select * from `order_master` ";
    $order_master = $pdo->query($sql);

    $order_masterRow  = $order_master->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($order_masterRow);
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
