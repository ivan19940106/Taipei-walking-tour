<?php
$dsn = "mysql:host=localhost;port=3306;dbname=dd105g2;charset=utf8";
$user = "dd105g2";
$password = "dd105g2";
// $user = "root";
// $password = "9527";
$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
$pdo = new PDO($dsn, $user, $password, $options);
?>