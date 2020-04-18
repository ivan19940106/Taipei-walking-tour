<?php
try {
    require_once("./connectBooks.php");
    $sql = "select a.route_number,b.attraction_number,c.attraction_name FROM `routes`a join `routes_list`b on(a.route_number=b.route_number) join `attractions` c on(b.attraction_number=c.attraction_number);";
    $linepointoff = $pdo->prepare($sql);
    $linepointoff->execute();

    $linepointoffRow = $linepointoff->fetchAll(PDO::FETCH_ASSOC);

    $sql = "select  a.route_number,b.custom_attraction_number,c.custom_attraction_name from`routes`a join `custom_attraction_list` b on(a.route_number=b.route_number) join `custom_attraction` c on(b.custom_attraction_number = c.custom_attraction_number);";
    
    $linepointcus = $pdo->prepare($sql);
    $linepointcus->execute();

    $linepointcusRow = $linepointcus->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(array("linepointoffRow"=>$linepointoffRow,"linepointcusRow"=>$linepointcusRow));
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
