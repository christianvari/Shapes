<?php

    session_start(); 

    if (!isset($_SESSION['username'])) {
        header('location: index.php');
    }

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>SHAPES</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" media="screen" href="game.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script type="module" src="js/start.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        
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
            <p><?php echo $_SESSION['username'] ?></p><p id="scoreText">0</p>
        </div>
        <div id="highscores">

        </div>

        <div class="background" id="centerdiv">
                
        </div>
        
        <div class="topright" id="topright">
            
        </div>

        <div class="bottomright" id="bottomright">
            
        </div>
    
        
    </body>
</html>