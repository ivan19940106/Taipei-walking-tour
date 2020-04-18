<?php
try {
    require_once("./connectBooks.php");
    $sql = "select * from `staff` ";
    $staffs = $pdo->query($sql);

    $staffRow = $staffs->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($staffRow);
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
