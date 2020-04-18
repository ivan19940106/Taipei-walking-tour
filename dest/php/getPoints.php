<?php
    try{
    require_once("./connectBooks.php");

    $sql="UPDATE `member` SET `member_point` = :memPoint WHERE `member_number` = :memNum";

    $edit = $pdo->prepare($sql);
    $edit->bindValue(":memNum", $_POST['memNum']);
    $edit->bindValue(":memPoint", $_POST['memPoint']);

    $edit->execute();

    echo "獲得點數300點！";

    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>