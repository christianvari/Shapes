<?php

    include("../server_side/check_session.php");

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>SHAPES</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="../util/shapes_logo_transparency.png"/>
        <link rel="stylesheet" type="text/css" media="screen" href="../css/game.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script src="../js/build/start.js"></script>
        
        
    </head>
    <body id="fullspace">
        <div id = "game_items">
            <iframe src='../audio/silence.mp3' allow='autoplay' style='display:none' id='iframeAudio'></iframe>
            <audio id='gameMusic' src='../audio/soundtrack.mp3' preload='auto' loop></audio>

            <script>
                var screenHeight = screen.height;
                //console.log("altezza " + screenHeight);
                if (screenHeight < 901) {
                    //console.log("minore di 800");
                    $("#game_items").css("zoom", 0.7);
                }
            </script>
            
            <div class="score">
                <table>
                    <tr>
                        <td class="name_and_scores"><?php echo $_SESSION['username']?></td>
                        <td class="name_and_scores" id="scoreText">0</td>
                    </tr>
                </table>
            </div>
            
            <div id = "game_over"></div>
            <div id = "score_on_gameover"></div>
            <div id = "new_record"></div>
            
            <div id="highscores"></div>

            <div class="background" id="centerdiv"></div>
            
            <div id="topright"></div>

            <div id="bottomright"></div>

        </div>
    </body>
</html>