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
        
        <script type="module" src="./js/credits/startcredits.js"></script>
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
            <script>
                var screenHeight = screen.height;
                //console.log("altezza " + screenHeight);
                if (screenHeight < 800) {
                    //console.log("minore di 800");
                    $(".background").css("zoom", 0.7);
                }
            </script>
            <h1>Credits</h1>
            <h1 id="bottomText">press SPACE to continue to the game</h1>
        </div>
    </body>
</html>