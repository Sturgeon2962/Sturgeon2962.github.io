<?php
session_start();
?>
<!doctype html>
<html>

    <head>
        <title>Register an account</title>
        <link rel="stylesheet" type="text/css" href="../style/navBarStyle.css">
        <link rel="stylesheet" type="text/css" href="../style/registerStyle.css">
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
            <div class='form' id='registrationBox'><br>
                <form method="POST" action="index.php">
                    <label class="lab" for="fname">First Name: </label>
                    <input type="text" name="fname" required><br><br>

                    <label class="lab" for="lname">Last Name: </label>
                    <input type="text" name="lname" required><br><br>

                    <label class="lab" for="uname">User Name: </label>
                    <input type="text" name="uname" required><br><br>

                    <label class="lab" for="pword">Password: </label>
                    <input type="password" name="pword" placeholder = "Password" required><br><br>

                    <label class="lab" for="conf_pword">Confirm Password: </label>
                    <input type="password" name="conf_pword" placeholder="Confirm Password" required><br><br>

                    <p class="plab">Do you want your score displayed on the leaderbord:</p>

                    <label class="lab" for="yes">Yes</label>
                    <input type="radio" name="display" value = "Yes" class="yes" required><br>
                    <label class="lab" for="No">No</label>
                    <input type="radio" name="display" value ="No" class="no"><br><br>

                    <input  id="button" type="submit" value="submit" action="POST">
                </form><br>
            </div>
        </div>

    </body>

</html>