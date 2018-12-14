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
        <link href="../css/credits_mobile.css" rel="stylesheet"/>
        

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script src="../js/lib/hammer.min.js"></script>
        <script src="../js/build/start_credits.js"></script>
    </head>

    <body id="fullspace">
        <iframe src='../audio/silence.mp3' allow='autoplay' style='display:none' id='iframeAudio'></iframe>
        <audio id='gameMusic' src='../audio/soundtrack.mp3' preload='auto' loop></audio>
        <div class="background">
            
            <h1>Credits</h1>
            <h1 id="bottomText">swipe UP to continue to the game</h1>
        </div>
    </body>
</html>