<?php
try{
require_once("./connectBooks.php");
$sql="
DELETE FROM `routes`
WHERE route_number = :routeNum
;";
$edit = $pdo->prepare($sql);
$edit->bindValue(":routeNum",$_POST["editNumber"]);

$edit->execute();

echo "成功";

}catch(PDOException $e){
    echo $e->getMessage();
}
?>