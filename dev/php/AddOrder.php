<?php
session_start();
$member = $_SESSION["member_number"];
$memberPt = $_SESSION["member_point"];
try{

    require_once("./connectBooks.php");
    $sql ="INSERT INTO `order_master` 
    (`member_number`, `order_point`, `order_time`, `product_images_url_front`,`product_images_url_back`,`receiver_name`,`receiver_address`,`shopping_status`) VALUES  
    ( $member,100, now(),'','',:receiver_name,:receiver_address,0);
    ";
   
    $order_master = $pdo->prepare($sql);
    $order_master->bindValue(":receiver_name",$_POST["receiver_name"]);
    $order_master->bindValue(":receiver_address",$_POST["receiver_address"]);
    $order_master->execute();

    $num = $pdo->lastInsertId();

$upload_dir = "../img/postcardPhoto//";  //檢查資料夾存不存在
if( ! file_exists($upload_dir )){
  mkdir($upload_dir);
}

$imgDataStr = $_POST['hidden_data'];//收到convas.toDataURL()送來的資料
$imgDataStr2 = $_POST['hidden_data2'];//收到convas.toDataURL()送來的資料
$imgDataStr = str_replace('data:image/png;base64,', '', $imgDataStr); //將檔案格式的資訊拿掉
$imgDataStr2 = str_replace('data:image/png;base64,', '', $imgDataStr2); //將檔案格式的資訊拿掉
// $imgDataStr = str_replace(' ', '+', $imgDataStr);
$data = base64_decode($imgDataStr);
$data2 = base64_decode($imgDataStr2);

//準備好要存的filename
$fileName = "product_images_url_front"."{$num}";  //或time()
$fileName2 = "product_images_url_back"."{$num}";  //或time()
$file = $upload_dir . $fileName .".png";
$file2 = $upload_dir . $fileName2 .".png";
$success = file_put_contents($file, $data);
$success2 = file_put_contents($file2, $data2);

$sql = " update `order_master` set `product_images_url_front` = :fileName where order_number = $num ;";
			$changeName = $pdo->prepare($sql);
			$changeName -> bindValue(":fileName", $fileName);
            $changeName -> execute();  
    echo $success ? $file : 'error';
$sql = " update `order_master` set `product_images_url_back` = :fileName2 where order_number = $num ;";
			$changeName2 = $pdo->prepare($sql);
			$changeName2 -> bindValue(":fileName2", $fileName2);
            $changeName2 -> execute();  
    echo $success ? $file : 'error';

$a=(int)$memberPt;
$b=100;

$newpoint = $a - $b;


 $sql="
 UPDATE `member` SET
`member_point` = $newpoint 
 WHERE `member_number` = $member
 ";
 
$new = $pdo->query($sql);
$new->execute();
$memRow = $new->fetchAll(PDO::FETCH_ASSOC);


session_start();
$_SESSION["member_point"]= $memRow["member_point"];

} 
catch(PDOException $e){
    echo $e->getMessage();
    echo $e->getLine();
}    
?>