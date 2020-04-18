<?php
try {
    require_once("./connectBooks.php");
    $sql = "select * from `attractions` ";
    $attractions = $pdo->query($sql);

    $attrRow = $attractions->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($attrRow);
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>