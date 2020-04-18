<?php
try {
    require_once("./connectBooks.php");
    // 顯示 filter 上路線名稱
    $sql = "
    select route_name,route_status from `routes`
    where member_number is null
    ;";
    $edit = $pdo->query($sql);
    $routeName = $edit->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($routeName);

} catch (PDOException $e) {
    echo $e->getMessage();
}
?>