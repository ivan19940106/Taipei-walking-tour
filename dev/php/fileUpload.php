<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Examples</title>
</head>
<body>

<?php 

switch( $_FILES['upFile']['error']) {
	case 0:
		if( file_exists("img") === false){
			//make directory
			mkdir("img");		
		}

		$from = $_FILES['upFile']['tmp_name'];
		$to = "img/{$_FILES['upFile']['name']}";//images/smile.gif

		if(copy($from, $to)){
			echo "上傳成功";
		}else{
			echo "拷貝失敗";
		}
		break;
	case 1:
		echo "上傳檔案太大, 不可超過" , ini_get("upload_max_filesize"), "<br>";
		break;
	case 2:
		echo "上傳檔案太大, 不可超過{$_POST["MAX_FILE_SIZE"]}<br>";
		break;
	case 3:
		echo "上傳檔案不完整<br>";
		break;
	case 4:
		echo "未選檔案<br>";
		break;
	default:
		echo "error.....: ", $_FILES['upFile']['error'], "<br>";	
}



// echo "['error']: " , $_FILES['upFile']['error'] , "<br>";
// echo "['name']: " , $_FILES['upFile']['name'] , "<br>";
// echo "['tmp_name']: " , $_FILES['upFile']['tmp_name'] , "<br>";
// echo "['type']: " , $_FILES['upFile']['type'] , "<br>";
// echo "['size']: " , $_FILES['upFile']['size'] , "<br>";
?>

</body>
</html>