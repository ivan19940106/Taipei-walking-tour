<?php
try {
    require_once("./connectBooks.php");
    $name=$_GET["name"];
    $account=$_GET["account"];
    $password=$_GET["password"];
    $sql = "insert into `staff`(staff_name,staff_account,staff_password)
            values(:name,:account,:password) ";
    $newma = $pdo->prepare($sql);
    $newma->bindvalue(":name",$name);
    $newma->bindvalue(":account",$account);
    $newma->bindvalue(":password",$password);
    $newma->execute();
    if($newma->rowCount() == 1){
        echo "新增管理員成功";
    }else{
        echo "新增管理員失敗";
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
