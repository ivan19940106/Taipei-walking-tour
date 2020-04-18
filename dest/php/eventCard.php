<?php
try{
    require_once("./connectBooks.php");
    $sql ="select *
    from event e join routes r on e.route_number=r.route_number 
    where e.event_status = 1
    order by e.enroll_start_date desc;";
   
    $event = $pdo->query($sql);
    
    $eventRow = $event->fetchAll(PDO::FETCH_ASSOC);
    //送出json字串
    echo json_encode($eventRow);

}catch(PDOException $e){
    echo $e->getMessage();
    echo $e->getLine();
}
?>