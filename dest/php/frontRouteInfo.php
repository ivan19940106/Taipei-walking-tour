<?php
try {
    require_once("./connectBooks.php");
    // 顯示選擇的路線
    $sql = "select * from `routes` r 
    join `routes_list` l on(r.route_number = l.route_number) 
    join `attractions` a on(l.attraction_number =a.attraction_number) 
    WHERE route_name = :routeName
    ;";
    $edit = $pdo->prepare($sql);
    $edit->bindValue(":routeName",$_POST['routeName']);
    $edit->execute();

    $route=$edit->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($route);

} catch (PDOException $e) {
    echo $e->getMessage();
}

?>