<?php
try {
    require_once("./connectBooks.php");
    $memNum=$_GET["number"];
    $sql = "select * FROM `event` WHERE origin_member_number=:memNum and event_status=1 ORDER BY `event`.`event_number` DESC";
    $openinfo = $pdo->prepare($sql);
    $openinfo->bindvalue(":memNum",$memNum);
    $openinfo->execute();

    $openRow = $openinfo->fetchAll(PDO::FETCH_ASSOC);


    $sql = "select * FROM `routes`a join `routes_list`b on(a.route_number=b.route_number)  where a.route_status=1 group by a.route_number";
    $openlineoff = $pdo->prepare($sql);
    $openlineoff->execute();

    $openlineoffRow = $openlineoff->fetchAll(PDO::FETCH_ASSOC);

    $sql = "select * FROM `routes`a join `custom_attraction_list`b on(a.route_number=b.route_number) where a.member_number=:memNum and a.route_status=1 group by a.route_number";
    $openlinecus = $pdo->prepare($sql);
    $openlinecus->bindvalue(":memNum",$memNum);
    $openlinecus->execute();

    $openlinecusRow = $openlinecus->fetchAll(PDO::FETCH_ASSOC);



    $sql = "select a.event_number,a.origin_member_number,b.member_number,c.member_name FROM `event`a join `event_record` b on(a.event_number =b.event_number) join `member` c on(b.member_number=c.member_number) WHERE origin_member_number=:memNum and a.event_status=1;";
    $openjoinmember = $pdo->prepare($sql);
    $openjoinmember->bindvalue(":memNum",$memNum);
    $openjoinmember->execute();
 
    $openjoinmemberRow = $openjoinmember->fetchAll(PDO::FETCH_ASSOC);




    $sql = "select a.route_number,b.attraction_number,c.attraction_name  from`routes`a join `routes_list` b on(a.route_number=b.route_number) join `attractions` c on(b.attraction_number=c.attraction_number) where a.route_status=1 and c.attraction_status=1;";
    $openlistofficial = $pdo->prepare($sql);
    $openlistofficial->execute();

    $openlistofficialRow = $openlistofficial->fetchAll(PDO::FETCH_ASSOC);

    $sql = "select  a.route_number,b.custom_attraction_number,c.custom_attraction_name from`routes`a join `custom_attraction_list` b on(a.route_number=b.route_number) join `custom_attraction` c on(b.custom_attraction_number = c.custom_attraction_number) where a.route_status=1 ;";
    $openlistcustom = $pdo->prepare($sql);
    $openlistcustom->execute();

    $openlistcustomRow = $openlistcustom->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(array("memberopen"=>$openRow,"openjoinmember"=>$openjoinmemberRow,"memberopenlistoff"=>$openlistofficialRow,"memberopenlistcus"=>$openlistcustomRow,"memberopenoff"=>$openlineoffRow,"memberopencus"=>$openlinecusRow));
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
