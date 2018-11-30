<?php

    session_start(); 

    if (!isset($_SESSION['username'])) {
        header('location: login.php');
    }

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>SHAPES</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" media="screen" href="game.css" />
        <script type="module" src="js/start.js"></script>
         
    </head>
    <body id="fullspace">
        <audio id="gameMusic" src="./audio/Shapes - soundtrack.mp3" preload="auto" autoplay loop></audio>
        <iframe src="./audio/Shapes - soundtrack.mp3" allow="autoplay" style="display:none" id="iframeAudio"></iframe> 
        <script>
            var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
            if(!isChrome){
                document.getElementById("iframeAudio").remove()
            }
            else{
                document.getElementById("gameMusic").remove()
            }
        </script>
        
        <div class="score">
            <p><?php echo $_SESSION['username'] ?></p><p class="score" id="scoreText">0</p>
        </div>
        
    </body>
</html>