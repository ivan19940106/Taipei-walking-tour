<?php
try{
    require_once("./connectBooks.php");

    //判斷sql是 官方路線 or 自訂路線
    if($_POST["event_sort"] == "official"){
        $sql = "
        select e.event_number,e.event_name,e.enroll_start_date,e.enroll_end_date,e.event_date,r.route_photo,e.meeting_place,e.max_attendance,e.now_attendance,e.event_information,r.route_number,r.route_name,e.event_cover_url,a.attraction_name
        from event e
	    join routes r on r.route_number= e.route_number
        join `routes_list` l on(r.route_number = l.route_number) 
        join `attractions` a on(l.attraction_number =a.attraction_number)
        where  :thisEventNum = e.event_number ";

        $eventDetail = $pdo->prepare($sql);
        $eventDetail->bindValue(":thisEventNum",$_POST["thisEventNum"]);
        $eventDetail -> execute();
        $eventDetailRow = $eventDetail->fetchAll(PDO::FETCH_ASSOC);

    }
    else if($_POST["event_sort"] == "member"){
        $sql = " select * from
        event e
	    join `routes` r on r.route_number= e.route_number
        join `custom_attraction_list` l on(r.route_number = l.route_number) 
        join `custom_attraction` a on(l.custom_attraction_number =a.custom_attraction_number)
        where  :thisEventNum = e.event_number ";

        $eventDetail = $pdo->prepare($sql);
        $eventDetail->bindValue(":thisEventNum",$_POST["thisEventNum"]);
        $eventDetail -> execute();
        $eventDetailRow = $eventDetail->fetchAll(PDO::FETCH_ASSOC);

    }

    echo json_encode($eventDetailRow);

}catch(PDOException $e){
    echo $e->getMessage();
    echo $e->getLine();
}
?>



