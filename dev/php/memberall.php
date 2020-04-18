<?php
try {
    require_once("./connectBooks.php");
    $sql = "select * from `member` ";
    $members = $pdo->query($sql);

    $memberRow = $members->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($memberRow);
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
