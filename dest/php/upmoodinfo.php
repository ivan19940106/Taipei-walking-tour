<?php
try {
    require_once("./connectBooks.php");
    $mood_class=$_POST["mood_class"];
    $mood_content=$_POST["mood_content"];
    $mood_number=$_POST["mood_number"];
 
    // $photo=$_POST["photo"];
    $sql = "update `mood` set mood_class=:mood_class,mood_content=:mood_content where mood_number=:mood_number";

    $upmoodinfo = $pdo->prepare($sql);
    $upmoodinfo->bindvalue(":mood_class",$mood_class);
    $upmoodinfo->bindvalue(":mood_content",$mood_content);
    $upmoodinfo->bindvalue(":mood_number",$mood_number);
    // $upmemberinfo->bindvalue(":photo",$photo);
    $upmoodinfo->execute();
    // if($upmemberinfo->rowCount() == 1){
        echo "修改路線成功0";
        if($_FILES['mood_pho']['error']==0){
            echo "修改路線成功1";
            //存不存在
		    if( file_exists("../img/moodPhoto") === false){
			    //make directory
			    //新增資料夾
                mkdir("../img/moodPhoto");		
            }
            $from = $_FILES['mood_pho']['tmp_name'];
            echo $from;
            //搬照片到資料夾&&改圖片檔名
            $namee = explode(".",$_FILES['mood_pho']['name']);//00.jpg
            // echo $namee[0];
            echo $namee[1];
            $to = "../img/moodPhoto/moodPic$post_number.$namee[1]";
            // $to = "images/{$_FILES['upFile']['name']}";
            echo $to;
            // echo `event_cover_url$event_number.$namee[1]`;
            
            if(copy($from, $to)){
                echo "上傳成功00";
                header("Location:../member.html"); 
                //回寫照片的檔名為會員編號
                $sql = "update `mood` set mood_photo=:photo where mood_number=:mood_number";
                    $upopenpho = $pdo->prepare($sql);
                        $upopenpho->bindvalue(":photo","moodPic$post_number.$namee[1]");
                        $upopenpho->bindvalue(":mood_number",$mood_number);
                        $upopenpho->execute();
                if($upopenpho->rowCount() == 1){
                    echo "上傳成功11";
                    header("Location:../member.html"); 
                }
                }else{
                    echo "修改路線失敗11";
                }

        }else{
            echo $_FILES['mood_pho']['error'];
            header("Location:../member.html"); 
        }
    
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>
