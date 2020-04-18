<?php
    try{
    require_once("./connectBooks.php");
    $sql="
        DELETE `game_quizzes`
        WHERE quiz_number = :quizNumber 
    ";

    $edit = $pdo->prepare($sql);

    $edit->execute();

    echo "修改成功！";

    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>