<?php
try {
    require_once("./connectBooks.php");
    $memNum=$_GET["number"];
    $sql = "select * from `member` where member_number=:memNum ";
    $memberinfo = $pdo->prepare($sql);
    $memberinfo->bindvalue(":memNum",$memNum);
    $memberinfo->execute();

    $memberRow = $memberinfo->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($memberRow);
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
