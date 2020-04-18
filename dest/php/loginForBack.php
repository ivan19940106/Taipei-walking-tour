<?php
try{
    require_once("./connectBooks.php");
    $sql ="select * from `staff` where staff_account = :memId and staff_password = :memPsw";
    $member = $pdo->prepare($sql);
    $member->bindValue(":memId", $_POST["memId"]);
    $member->bindValue(":memPsw", $_POST["memPsw"]);
    $member->execute();

    if($member->rowCount()==0){
        echo "error";

    }else{
        $memRow = $member->fetch(PDO::FETCH_ASSOC);

        session_start();
        $_SESSION["memNo"] = $memRow["staff_number"];
        $_SESSION["memId"] = $memRow["staff_account"];
        $_SESSION["memPsw"] = $memRow["staff_password"];
        $_SESSION["memName"] = $memRow["staff_name"];
        $_SESSION["memStatus"] = $memRow["staff_status"];
        $_SESSION["memAccess"] = $memRow["staff_access"];

        $member =["memNo"=>$_SESSION["memNo"],
                  "memId"=>$_SESSION["memId"],
                  "memPsw"=>$_SESSION["memPsw"],
                  "memName"=>$_SESSION["memName"],
                  "memStatus"=>$_SESSION["memStatus"],
                  "memAccess"=>$_SESSION["memAccess"]];
    
        echo json_encode($member);
    }
}catch(PDOException $e){
    echo $e->getMessage();
}
?>