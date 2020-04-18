<?php
try{
require_once("./connectBooks.php");
$sql="
 UPDATE `routes` SET
 route_name = :routeName,
 route_information = :routeInfo,
 route_status = :routeStatus
 WHERE route_number = :routeNum
 ";

$edit = $pdo->prepare($sql);
$edit->bindValue(":routeNum",$_POST["editNumber"]);
$edit->bindValue(":routeName",$_POST["editName"]);
$edit->bindValue(":routeInfo",$_POST["editInfo"]);
$edit->bindValue(":routeStatus",$_POST["editStatus"]);

$edit->execute();

echo "修改成功！";

}catch(PDOException $e){
    echo $e->getMessage();
}
?>