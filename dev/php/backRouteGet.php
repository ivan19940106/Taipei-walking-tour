<?php
try {
    require_once("./connectBooks.php");
    // 顯示官方路線
    $sql = "select * from `routes` r 
    join `routes_list` l on(r.route_number = l.route_number) 
    join `attractions` a on(l.attraction_number =a.attraction_number)
    where  member_number is null
    group by r.route_number order by r.route_number
    ;";
    $routes = $pdo->query($sql);
    $routesRow = $routes->fetchAll(PDO::FETCH_ASSOC);
    // 顯示自訂路線
    $sql = "select * from `routes` r 
    join `custom_attraction_list` c on(r.route_number = c.route_number) 
    join `custom_attraction` a on(c.custom_attraction_number =a.custom_attraction_number)
    where  member_number is not null
    group by r.route_number order by r.route_number
    ;";
    $custom = $pdo->query($sql);
    $customRow = $custom->fetchAll(PDO::FETCH_ASSOC);

    // 顯示官方路線各路線景點
    $sql = "select * from `attractions` a 
    join `routes_list` l on(a.attraction_number = l.attraction_number)
    ;";
    $attractions = $pdo->query($sql);
    $attrsRow = $attractions->fetchAll(PDO::FETCH_ASSOC);

     // 顯示自訂路線各路線景點
     $sql = "select * from `custom_attraction` c 
     join `custom_attraction_list` l on(c.custom_attraction_number = l.custom_attraction_number)
     ;";
     $customAttractions = $pdo->query($sql);
     $customAttrsRow = $customAttractions->fetchAll(PDO::FETCH_ASSOC);

    // 顯示路線景點
    $sql = "select * from `attractions`
    ;";
    $attraction = $pdo->query($sql);
    $attrRow = $attraction->fetchAll(PDO::FETCH_ASSOC);

    // $arrA = array();
    // $arrB = array();
    // $x = 0;
    // $y = 0;
    // foreach ($attrRow as $key => $val) {
    //     $routeNum[$key] = $val['route_number'];
    //     $attrName[$key] = $val['attraction_name'];
    //     if (array_search($routeNum[$key], $arrA) == false) {
    //         $x++;
    //         $arrA[$x] = $routeNum[$key];
    //     }
    //     if (array_search($attrName[$key], $arrB) == false) {
    //         $y++;
    //         $arrB[$x] = $attrName[$key];
    //     }
    // }

    echo json_encode(array('customAttr'=>$customAttrsRow,'attraction' => $attrRow, 'attractions' => $attrsRow, 'routeInfo' => $routesRow, 'customInfo' => $customRow));
} catch (PDOException $e) {
    echo $e->getMessage();
}
