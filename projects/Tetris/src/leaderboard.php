<?php
    session_Start()
?>
<!doctype html>
<html>

    <head>
        <title>Leaderboard</title>
        <link rel="stylesheet" type="text/css" href="../style/navBarStyle.css">
        <link rel="stylesheet" type="text/css" href="../style/leaderboardStyle.css">
    </head>

    <body>
        <header class = 'navBar'>
            <nav class = 'flex'>
                <li><a href='index.php' name='home'>Home</a></li>
                <ul>
                    <li><a href='tetris.php' name=''>Play Tetris</a></li>
                    <li><a href='leaderboard.php' name=''>Leaderboard</a></li>
                </ul>
            </nav>
        </header>

        <div class='main'>
            <div class='lead'>
                <table>
                    <tr>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                    <?php
                        getResults()
                    ?>
                </table>
            </div>
        </div>
    </body>

</html>

<?php
    function getResults(){
        $connection = new mysqli("localhost", "root", "1234", "tetris");
                
        if($connection->connect_error){
            die("Connection error");
        }

        $sql = "SELECT  Username, Score FROM Scores ORDER BY Score DESC";
        $result = $connection->query($sql);

        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
                $name = $row['Username'];
                $score = $row['Score'];
                echo "
                <tr>
                    <td>$name</td>
                    <td>$score</td>
                </tr>
                ";
            }
        } else {
            $connection->close();
        }
    }
?>
