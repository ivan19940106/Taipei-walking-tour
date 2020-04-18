<?php
$num = $pdo->lastInsertId();
$upload_dir = "../img/postcardPhoto//";  //檢查資料夾存不存在
if( ! file_exists($upload_dir )){
  mkdir($upload_dir);
}

$imgDataStr = $_POST['hidden_data'];//收到convas.toDataURL()送來的資料
$imgDataStr = str_replace('data:image/png;base64,', '', $imgDataStr); //將檔案格式的資訊拿掉
// $imgDataStr = str_replace(' ', '+', $imgDataStr);
$data = base64_decode($imgDataStr);

//準備好要存的filename
$fileName = Date("YMD");  //或time()

$file = $upload_dir . $fileName .".png";
$success = file_put_contents($file, $data);

$sql = " update `order_master` set `product_images_url_front` = :newName where order_number = $num ;";
			$changeName = $pdo->prepare($sql);
			$changeName -> bindValue(":newName", $newName);
      $changeName -> execute();
      
echo $success ? $file : 'error';
?>
