<?php
try {
    require_once("./connectBooks.php");
    $memNum=$_GET["number"];
    $sql = "select * from `routes`  where member_number=:memNum and route_status=1 ORDER BY `routes`.`route_number` DESC";
    $memberline = $pdo->prepare($sql);
    $memberline->bindvalue(":memNum",$memNum);
    $memberline->execute();

    $memberlineRow = $memberline->fetchAll(PDO::FETCH_ASSOC);
    $sql1 = "select * from `routes` a join `custom_attraction_list`b on( a.route_number=b.route_number) join `custom_attraction`c on( b.custom_attraction_number=c.custom_attraction_number) where member_number=:memNum and a.route_status=1
    ";
    $memberlinelist = $pdo->prepare($sql1);
    $memberlinelist->bindvalue(":memNum",$memNum);
    $memberlinelist->execute();

    $memberlinelistRow = $memberlinelist->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(array("memberline"=>$memberlineRow,"memberlinelist"=>$memberlinelistRow));
        // echo json_encode(array('attraction_name' => $attrRow, 'routeInfo' => $routesRow));
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
