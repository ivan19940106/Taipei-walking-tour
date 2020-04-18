<?php
try{
    require_once("./connectBooks.php");

    //用變數接要ORDER BY的值 因為ORDER BY限制不能用bindValue的方式帶入，所以改用變數帶入
    $eventOrder = $_GET["eventOrder"];

    //判斷sql是 全部 or 官方路線 or 自訂路線
    if($_GET["eventClass"] == "all"){
        $sql = "
        select * 
        from event e join routes r on (e.route_number=r.route_number)  
        where e.event_status = 1
        order by $eventOrder";
        $event = $pdo->prepare($sql);
        $event -> execute();
        $eventRow = $event->fetchAll(PDO::FETCH_ASSOC);

    }else if($_GET["eventClass"] == "official"){
        $sql = "
        select * 
        from event e join routes r on (e.route_number=r.route_number)
        where e.event_status = 1 and r.member_number is null
        order by $eventOrder";
        $event = $pdo->prepare($sql);
        // $event -> bindValue(":eventClass",$_GET["eventClass"]);
        $event -> execute();
        $eventRow = $event->fetchAll(PDO::FETCH_ASSOC);

    }else{
        $sql = "
        select * 
        from event e join routes r on (e.route_number=r.route_number)
        where e.event_status = 1 and r.member_number is not null
        order by $eventOrder";
        $event = $pdo->prepare($sql);
        // $event -> bindValue(":eventClass",$_GET["eventClass"]);
        $event -> execute();
        $eventRow = $event->fetchAll(PDO::FETCH_ASSOC);
    }
    echo json_encode($eventRow);

}catch(PDOException $e){
    echo $e->getMessage();
    echo $e->getLine();
}
?>