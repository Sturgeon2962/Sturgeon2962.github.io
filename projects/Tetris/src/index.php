<?php
    session_start();

    if(isset($_POST['nameLog']) && isset($_POST['pwdLog'])){
        login();
    }

    if(isset($_POST['uname'])){
        if($_POST['display'] == "yes"){
            $showScore = 1;
        } else {
            $showScore = 0;
        }

        if($_POST['pword'] != $_POST['conf_pword']){
            header("Location:register.php");
        }

        $connection = new mysqli("localhost", "root", "1234", "tetris");
        if($connection->connect_error){
            die("Connection error");
        }

        $sql = "SELECT  Username FROM Users";
        $result = $connection->query($sql);

        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
                $name = $row['Username'];
                if($name == $_POST['uname']){
                    header("Location:register.php");
                }
            }
        }

        //INSERT INTO Users VALUES (username, firstName, lastName, password, display);

        $query = $connection->prepare("INSERT INTO Users VALUES (?, ?, ?, ?, ?)");
        $query->bind_param("ssssi", $_POST['uname'],$_POST['fname'],$_POST['lname'],$_POST['pword'],$showScore);
        $query->execute();
        $query->close();
        $_SESSION['login'] = true;
        $_SESSION['name'] = $_POST['uname'];
        $_SESSION['showScore'] = $showScore;
    }
?>


<!doctype html>

<html>

    <head>
        <title>Home</title>
        <link rel='stylesheet' type='text/css' href='../style/navBarStyle.css'>
        <link rel='stylesheet' type='text/css' href='../style/indexStyle.css'>
    </head>

    <body>
        <header class = 'navBar'>
            <nav class = 'flex'>
                <li><a href='index.php' name='home'>Home</a></li>
                <ul>
                    <li><a href='tetris.php' name='tetris'>Play Tetris</a></li>
                    <li><a href=leaderboard.php name='leaderboard'>Leaderboard</a></li>
                </ul>
            </nav>
        </header>
        
        <div class = 'main'>
            <?php
                if (!isset($_SESSION['login'])){
                    echo "
                    <div class='login'><br>
                        <form method='post' action=''>
                            <label class='lab' for='nameLog'>Username:</label>
                            <input type='text' id='nameLog'name='nameLog' placeholder='username' required><br><br>
                            
                            <label class='lab' for='pwdLog'>Password:</label>
                            <input type='password' id='pwdLog' name='pwdLog' required><br><br>

                            <input type='submit' id='button' value='submit'>
                        </form>
                        <p>Don't have a user account? <a href='register.php'>Register now?</a></p><br>
                    </div>
                    ";
                } elseif (isset($_SESSION['login'])){
                    echo "
                    <div class='login'
                        <br>
                        <h1> Welcome to Tetris</h1>
                        <form method='post' action='tetris.php'>
                            <br>
                            <button type'button'>Click here to play</button>
                            <br><br>
                        </form>
                    </div>
                    ";
                } else {
                    echo 'Some how you are not logged in or out so that sucks';
                }
            ?>
        <div>
    </body>

</html>

<?php

    function login(){
        $connection = new mysqli("localhost", "root", "1234", "tetris");
        
        if($connection->connect_error){
            die("Connection error");
        }
        
        $sql = "SELECT  UserName, Password, Display FROM Users";
        $result = $connection->query($sql);
        
        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
                $username = $row['UserName'];
                $password = $row['Password'];
                if ($_POST['nameLog'] == $username && $_POST['pwdLog'] == $password) {
                    $_SESSION['login'] = true;
                    $_SESSION['name'] = $username;
                    $_SESSION['showScore'] = $row['Display'];
                } 
            }
        } else {
            $conn->close();
        }
   
    }

?>
