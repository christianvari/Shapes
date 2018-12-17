<?php
    include("../server_side/check_session.php");
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>SHAPES</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="../util/shapes_logo_transparency.png"/>
        <link href="../css/credits.css" rel="stylesheet"/>
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script src="../js/build/start_credits.js"></script>
    </head>

    <body id="fullspace">
        <div id="credit_items">
            <iframe src='../audio/silence.mp3' allow='autoplay' style='display:none' id='iframeAudio'></iframe>
            <audio id='gameMusic' src='../audio/soundtrack.mp3' preload='auto' loop></audio>
            <script>
                var screenHeight = screen.height;
                //console.log("altezza " + screenHeight);
                if (screenHeight < 901) {
                    //console.log("minore di 800");
                    $("#credit_items").css("zoom", 0.8);
                }
            </script>
            <div class="background">
                <h1>Credits</h1>
                <h1 id="bottomText">press SPACE to continue to the game</h1>
            </div>
        </div>
    </body>
</html>