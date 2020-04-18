<?php
    session_start();
    $member = $_SESSION["member_number"];

try{
    require_once("connectBooks.php");
    // 顯示官方路線
    $sql = "select * from `routes` r 
    join `routes_list` l on(r.route_number = l.route_number) 
    join `attractions` a on(l.attraction_number =a.attraction_number)
    where  member_number is null;";
    
    $routes = $pdo->query($sql);
    $routesRow = $routes->fetchAll(PDO::FETCH_ASSOC);
    // echo json_encode($member);
   
    // echo $member;    
    // 顯示自訂路線
    $sql = "select * 
            from `routes` r
            join `custom_attraction_list` l on (r.route_number = l.route_number) 
            join `custom_attraction` a on (l.custom_attraction_number =a.custom_attraction_number)
            where  r.member_number =$member";

    $custom = $pdo->query($sql);
    $custom ->execute();
    $custom->bindValue(":member_number",$member);
    $customRow = $custom->fetchAll(PDO::FETCH_ASSOC);

    

    echo json_encode(array('routeInfo' => $routesRow,'customInfo'=>$customRow));

}catch(PDOException $e){
    echo $e->getMessage();
    echo $e->getLine();
}
?>



