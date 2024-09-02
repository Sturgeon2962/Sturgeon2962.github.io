<?php
session_start();
if(!empty($_SESSION['login'])){
    echo "Test2";
    if($_SESSION['showScore'] == 0){
        echo "Test3";
        $connection = new mysqli("localhost", "root", "1234", "tetris");
        if($connection->connect_error){
            die("Connection error");
        }
        $sql = "INSERT INTO Scores (username, score) VALUES (?, ?);";
        $query = $connection->prepare($sql);
        $query->bind_param("si", $_SESSION['name'], $_POST['Score']);
        $query->execute();
        $query->close();
    }
}
?>
