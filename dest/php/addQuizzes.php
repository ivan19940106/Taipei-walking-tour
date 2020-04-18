<?php
    try{
    require_once("./connectBooks.php");
    $sql="
        INSERT `game_quizzes` SET
        route_number = :routeNumber,
        attraction_name = :attrName,
        quiz_content = :quizContent,
        option1_content = :option1Content,
        option2_content = :option2Content,
        option3_content = :option3Content,
        answer_item = :answerItem,
        WHERE quiz_number = :quizNumber 
    ";

    $edit = $pdo->prepare($sql);
    $edit->bindValue(":quizNumber",$_POST["quiz_number"]);
    $edit->bindValue(":routeNumber",$_POST["route_number"]);
    $edit->bindValue(":attrName",$_POST["attraction_name"]);
    $edit->bindValue(":quizContent",$_POST["quiz_content"]);
    $edit->bindValue(":option1Content",$_POST["option1_content"]);
    $edit->bindValue(":option2Content",$_POST["option2_content"]);
    $edit->bindValue(":option3Content",$_POST["option3_content"]);
    $edit->bindValue(":answerItem",$_POST["answer_item"]);

    $edit->execute();

    echo "修改成功！";

    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>