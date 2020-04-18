<?php
try {
    require_once("connectBooks.php");
    $sql = "select * from `mem_product` ";
    $mem_products = $pdo->query($sql);

    $mem_productRow = $mem_products->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($mem_productRow);
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
