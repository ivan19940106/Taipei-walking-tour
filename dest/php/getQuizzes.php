<?php
try {
    require_once("./connectBooks.php");
    $sql = "select * from `game_quizzes` ";
    $tests = $pdo->query($sql);
    $testsRow = $tests->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($testsRow);
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>