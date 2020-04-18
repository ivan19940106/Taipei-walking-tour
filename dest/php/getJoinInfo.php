<?php
try {
    require_once("./connectBooks.php");
    $memNum=$_GET["number"];
    $sql = "select * from`event_record` a join `event` b on(a.event_number=b.event_number) join `member`c on(b.origin_member_number=c.member_number) join `routes` d on(b.route_number=d.route_number) where a.member_number=:memNum and b.event_status=1 ORDER BY `a`.`event_number` DESC";
    $joininfo = $pdo->prepare($sql);
    $joininfo->bindvalue(":memNum",$memNum);
    $joininfo->execute();

    $joinRow = $joininfo->fetchAll(PDO::FETCH_ASSOC);

    $sql = "select a.route_number,b.attraction_number,c.attraction_name  from`routes`a join `routes_list` b on(a.route_number=b.route_number) join `attractions` c on(b.attraction_number=c.attraction_number) where a.route_status=1 and c.attraction_status=1;";
    $joinlistofficial = $pdo->prepare($sql);
    $joinlistofficial->execute();

    $joinlistofficialRow = $joinlistofficial->fetchAll(PDO::FETCH_ASSOC);

    $sql = "select  a.route_number,b.custom_attraction_number,c.custom_attraction_name from`routes`a join `custom_attraction_list` b on(a.route_number=b.route_number) join `custom_attraction` c on(b.custom_attraction_number = c.custom_attraction_number) where a.route_status=1;";
    $joinlistcustom = $pdo->prepare($sql);
    $joinlistcustom->execute();

    $joinlistcustomRow = $joinlistcustom->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(array("memberjoin"=>$joinRow,"memberjoinlistoff"=>$joinlistofficialRow,"memberjoinlistcus"=>$joinlistcustomRow));
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
