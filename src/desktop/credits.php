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
            <div id ="music"></div> 
            <script>
                var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
                if(!isChrome){
                    document.getElementById("music").innerHTML = "<audio id='gameMusic' src='../audio/Shapes - soundtrack.mp3' preload='auto' autoplay loop></audio>" ;
                }
                else{
                    document.getElementById("music").innerHTML = "<iframe src='../audio/Shapes - soundtrack.mp3' allow='autoplay' style='display:none' id='iframeAudio'></iframe>"; 
                }
                var screenHeight = screen.height;
                //console.log("altezza " + screenHeight);
                if (screenHeight < 800) {
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