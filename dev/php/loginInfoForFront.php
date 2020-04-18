<?php 
session_start();
if( isset($_SESSION["member_number"])){ // 已登入
	$member = [
        "memNum"=>$_SESSION["member_number"],
        "memAcc"=>$_SESSION["member_account"],
        "memPsw"=>$_SESSION["member_password"],
        "memName"=>$_SESSION["member_name"],
        "memEmail"=>$_SESSION["member_email"],
        "memPhoto"=>$_SESSION["member_photo"],
        "memPoint"=>$_SESSION["member_point"]];
    
    echo json_encode($member);
}else{
	echo "{}";
}
?>