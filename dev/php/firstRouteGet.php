<?php
try {
    require_once("./connectBooks.php");
// 顯示頁面載入的第一條路線資訊
    $sql = "
    select * from `routes` r 
    join `routes_list` l on (r.route_number = l.route_number)
    join `attractions` a on (l.attraction_number = a.attraction_number)
    where route_name = :routeName 
    ";
    $edit = $pdo->prepare($sql);
    $edit->bindValue(':routeName', $_POST['firstRoute']);
    $edit->execute();

    $firstRoute = $edit->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($firstRoute);
} catch (PDOException $e) {
    echo $e->getMessage();
}
