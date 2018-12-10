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
        <link rel="icon" href="./util/shapes_logo_transparency.png"/>
        <link rel="stylesheet" type="text/css" media="screen" href="game.css" />
        <script type="module" src="./js/startcredits.js"></script>
        <link href="./bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
        <link href="credits.css" rel="stylesheet"/>
    </head>

    <body id="fullspace">
        <audio id="gameMusic" src="./audio/Shapes - soundtrack[1].mp3" preload="auto" autoplay loop></audio>
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
        <div class="background">
            <h1>Credits</h1>
            <h1 class="bottom" id="bottomText">press SPACE to continue to the game</h1>
        </div>
    </body>
</html>