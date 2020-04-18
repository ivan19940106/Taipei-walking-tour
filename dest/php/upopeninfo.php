<?php
try {
    require_once("./connectBooks.php");
    $event_name=$_POST["event_name"];
    $event_date=$_POST["event_date"];
    $enroll_end_date=$_POST["enroll_end_date"];
    $meeting_place=$_POST["meeting_place"];
    $route_number=$_POST["route_number"];
    $max_attendance=$_POST["max_attendance"];
    $event_information=$_POST["event_information"];
    $event_number=$_POST["event_number"];
 
    // $photo=$_POST["photo"];
    $sql = "update `event` set event_name=:event_name,event_date=:event_date,enroll_end_date=:enroll_end_date,meeting_place=:meeting_place,route_number=:route_number,max_attendance=:max_attendance,event_information=:event_information where event_number=:event_number";

    $upopeninfo = $pdo->prepare($sql);
    $upopeninfo->bindvalue(":event_name",$event_name);
    $upopeninfo->bindvalue(":event_date",$event_date);
    $upopeninfo->bindvalue(":enroll_end_date",$enroll_end_date);
    $upopeninfo->bindvalue(":meeting_place",$meeting_place);
    $upopeninfo->bindvalue(":route_number",$route_number);
    $upopeninfo->bindvalue(":max_attendance",$max_attendance);
    $upopeninfo->bindvalue(":event_information",$event_information);
    $upopeninfo->bindvalue(":event_number",$event_number);
    // $upmemberinfo->bindvalue(":photo",$photo);
    $upopeninfo->execute();
    // if($upmemberinfo->rowCount() == 1){
        echo "修改路線成功0";
        if($_FILES['event_pho']['error']==0){
            echo "修改路線成功1";
            //存不存在
		    if( file_exists("../img/eventPhoto") === false){
			    //make directory
			    //新增資料夾
                mkdir("../img/eventPhoto");		
            }
            $from = $_FILES['event_pho']['tmp_name'];
            echo $from;
            //搬照片到資料夾&&改圖片檔名
            $namee = explode(".",$_FILES['event_pho']['name']);//00.jpg
            // echo $namee[0];
            echo $namee[1];
            $to = "../img/eventPhoto/event_cover_url$event_number.$namee[1]";
            // $to = "images/{$_FILES['upFile']['name']}";
            echo $to;
            // echo `event_cover_url$event_number.$namee[1]`;
            
            if(copy($from, $to)){
                echo "上傳成功00";
                header("Location:../member.html"); 
                //回寫照片的檔名為會員編號
                $sql = "update `event` set event_cover_url=:photo where event_number=:event_number";
                    $upopenpho = $pdo->prepare($sql);
                        $upopenpho->bindvalue(":photo","event_cover_url$event_number.$namee[1]");
                        $upopenpho->bindvalue(":event_number",$event_number);
                        $upopenpho->execute();
                if($upopenpho->rowCount() == 1){
                    echo "上傳成功11";
                    header("Location:../member.html"); 
                }
                }else{
                    echo "修改路線失敗11";
                }

        }else{
            echo $_FILES['event_pho']['error'];
            header("Location:../member.html"); 
        }
    
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
