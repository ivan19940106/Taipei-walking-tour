<?php
try{
    require_once("./connectBooks.php");
    $sql =" select * from `member` where member_account = :memId and member_password = :memPsw; ";
    $member = $pdo->prepare($sql);
    $member->bindValue(":memId", $_POST["login_acc"]);
    $member->bindValue(":memPsw", $_POST["login_psw"]);
    $member->execute();

    if($member->rowCount()==0){
        echo "error";

    }else{
        $memRow = $member->fetch(PDO::FETCH_ASSOC);

        session_start();
        $_SESSION["member_number"] = $memRow["member_number"];
        $_SESSION["member_account"] = $memRow["member_account"];
        $_SESSION["member_password"] = $memRow["member_password"];
        $_SESSION["member_name"] = $memRow["member_name"];
        $_SESSION["member_email"]= $memRow["member_email"];
        $_SESSION["member_photo"]= $memRow["member_photo"];
        $_SESSION["member_point"]= $memRow["member_point"];

        $member = [
            "memNum"=>$_SESSION["member_number"],
            "memAcc"=>$_SESSION["member_account"],
            "memPsw"=>$_SESSION["member_password"],
            "memName"=>$_SESSION["member_name"],
            "memEmail"=>$_SESSION["member_email"],
            "memPhoto"=>$_SESSION["member_photo"],
            "memPoint"=>$_SESSION["member_point"]];
    
        echo json_encode($member);
    }
}catch(PDOException $e){
    echo $e->getMessage();
}
?>