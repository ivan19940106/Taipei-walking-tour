<?php
try {
    require_once("./connectBooks.php");
    // $acc=$_POST["register_acc"];
    // $nam=$_POST["register_nam"];
    // $email=$_POST["register_email"];
    // $psw=$_POST["register_psw"];
    // $sql = "insert into `member`(member_name,member_account,member_password,member_email)
    //         values(:name,:account,:password,:email) ";
    // $newma = $pdo->prepare($sql);
    // $newma->bindvalue(":name",$nam);
    // $newma->bindvalue(":account",$acc);
    // $newma->bindvalue(":email",$email);
    // $newma->bindvalue(":password",$psw);
    // $newma->execute();
    // if($newma->rowCount()==1){ 
    // // header("Location:../../backMember.html?aaa"); 
    // header("Location:../../index.html"); 
    // }
    $acc=$_GET["register_acc"];
    $nam=$_GET["register_nam"];
    $email=$_GET["register_email"];
    $psw=$_GET["register_psw"];
    $sql = "insert into `member`(member_name,member_account,member_password,member_email)
            values(:name,:account,:password,:email) ";
    $newmem = $pdo->prepare($sql);
    $newmem->bindvalue(":name",$nam);
    $newmem->bindvalue(":account",$acc);
    $newmem->bindvalue(":email",$email);
    $newmem->bindvalue(":password",$psw);
    $newmem->execute();
    if($newmem->rowCount() == 1){ 
        echo "新增成功";
    }else{
        echo "新增失敗";
    }





} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
