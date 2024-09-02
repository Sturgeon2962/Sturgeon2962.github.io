<?php
session_start();
?>

<!doctype html>

<html>

    <head>
        <title>Play Tetris</title>
        <link rel="stylesheet" type="text/css" href="../style/navBarStyle.css">
        <link rel="stylesheet" type="text/css" href="../style/tetrisStyle.css">
        <script src='tetris_2.js'></script>
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
        <div class="main">
            <div id="greyBox">
                <button id="StartButton" type="Button" onclick="tetris()">Start the Game</button>
	    </div>
	    <p>Music from zapsplat.com</p>
	</div>
	<audio id="audio" src="../img/music.mp3" type="audio/mpeg" loop></audio>
    </body>

</html>
