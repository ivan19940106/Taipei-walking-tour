<?php
try{
require_once("./connectBooks.php");
$sql="
 DELETE FROM `attractions` 
 WHERE attraction_number = :attrNum 
 ;";
$edit = $pdo->prepare($sql);
$edit->bindValue(":attrNum",$_POST["editNumber"]);
// $edit->bindValue(":attrName",$_POST["editName"]);
// $edit->bindValue(":attrAddress",$_POST["editAddress"]);
// $edit->bindValue(":attrInfo1",$_POST["editInfo1"]);
// $edit->bindValue(":attrInfo2",$_POST["editInfo2"]);
// $edit->bindValue(":attrStatus",$_POST["editStatus"]);
// $edit->bindValue(":attrLat",$_POST["editLatitude"]);
// $edit->bindValue(":attrLot",$_POST["editLongitude"]);

$edit->execute();

echo "刪除成功!";

}catch(PDOException $e){
    echo $e->getMessage();
}
?>