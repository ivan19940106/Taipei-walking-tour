<?php
session_start();
$memberNum = $_SESSION['member_number'];
try {
    require_once("./connectBooks.php");
    // 新增自訂路線至路線表格
    $sql = "
    INSERT INTO `routes` 
    (`route_number`, `route_name`,
     `route_information`, `route_status`, `member_number`) VALUES
    (NULL, :routeName, :routeInfo , 1, $memberNum)
    ;";
    $edit = $pdo->prepare($sql);
    $edit->bindValue(":routeName", $_POST["customRouteName"]);
    $edit->bindValue(":routeInfo", $_POST["customRouteDesc"]);
    $edit->execute();

    // 取得自動創號的key值
    $customNum = $pdo->lastInsertId();

    // 新增自訂景點至自訂景點表格
    $customAttr = explode(',', $_POST["routeInfo"]);
    for ($i = 0; $i < count($customAttr); $i++) {
        $sql2 = "
        INSERT INTO `custom_attraction`
        (`custom_attraction_number`, `custom_attraction_name`) VALUES
        (NULL, '$customAttr[$i]')
        ;";
        $customAttrInsert = $pdo->prepare($sql2);
        $customAttrInsert->execute();

        // 取得新增的自訂景點key值
        $attrNum = $pdo->lastInsertId();

        // 新增自訂景點至自訂景點清單
        $sql3 = "
        INSERT INTO `custom_attraction_list`
        (`route_number`, `custom_attraction_number`) VALUES
        ($customNum, $attrNum)
        ;";
        $insertNum = $pdo->prepare($sql3);
        $insertNum->execute();
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
