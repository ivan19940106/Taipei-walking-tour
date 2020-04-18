<?php
try {
    require_once("./connectBooks.php");
    // 顯示選擇的路線
    $sql = "select * from `attractions` 
    WHERE attraction_name = :attrName
    ;";
    $edit = $pdo->prepare($sql);
    $edit->bindValue(":attrName",$_POST['attrName']);
    $edit->execute();

    $attrName=$edit->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($attrName);

} catch (PDOException $e) {
    echo $e->getMessage();
}
