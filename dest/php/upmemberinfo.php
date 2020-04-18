<?php
try {
    require_once("./connectBooks.php");
    $number=$_POST["member_number"];
    $account=$_POST["member_account"];
    $password=$_POST["member_password"];
    $name=$_POST["member_name"];
    $email=$_POST["member_email"];
    // $photo=$_POST["photo"];
    $sql = "update `member` set member_account=:account,member_password=:password,member_name=:name,member_email=:email where member_number=:number";

    $upmemberinfo = $pdo->prepare($sql);
    $upmemberinfo->bindvalue(":number",$number);
    $upmemberinfo->bindvalue(":account",$account);
    $upmemberinfo->bindvalue(":password",$password);
    $upmemberinfo->bindvalue(":name",$name);
    $upmemberinfo->bindvalue(":email",$email);
    // $upmemberinfo->bindvalue(":photo",$photo);
    $upmemberinfo->execute();
    // if($upmemberinfo->rowCount() == 1){
        echo "修改會員資料成功0";
        if($_FILES['photo_up']['error']==0){
            echo "修改會員資料成功1";
            //存不存在
		    if( file_exists("../img/memberPhoto") === false){
			    //make directory
			    //新增資料夾
                mkdir("../img/memberPhoto");		
            }
            $from = $_FILES['photo_up']['tmp_name'];
            echo $from;
            //搬照片到資料夾&&改圖片檔名
            $namee = explode(".",$_FILES['photo_up']['name']);//00.jpg
            // echo $namee[0];
            echo $namee[1];
            $to = "../img/memberPhoto/$number.$namee[1]";
            // $to = "images/{$_FILES['upFile']['name']}";
            echo $to;
            echo $number.$namee[1];
            
            if(copy($from, $to)){
                echo "上傳成功00";
                header("Location:../member.html"); 
                //回寫照片的檔名為會員編號
                $sql = "update `member` set member_photo=:photo where member_number=:number";
                    $upmemberpho = $pdo->prepare($sql);
                        $upmemberpho->bindvalue(":photo","$number.$namee[1]");
                        $upmemberpho->bindvalue(":number",$number);
                        $upmemberpho->execute();
                        
                        session_start();
                        $_SESSION["member_photo"] = "$number.$namee[1]";
                if($upmemberpho->rowCount() == 1){

                    echo "上傳成功11";
                    header("Location:../member.html"); 
                }
                }else{
                    echo "修改會員資料失敗11";
                }

        }else{
            echo $_FILES['photo_up']['error'];
            header("Location:../member.html"); 
        }
    
} catch (PDOException $e) {
    echo $e->getMessage();
}
