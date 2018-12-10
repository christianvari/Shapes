<?php
    include("server_side/login.php");
?>


<!doctype html>
<html lang="en">
    <head>
        <title>Shapes</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="./util/shapes_logo_transparency.png"/>

        <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet"/>
        <link href="index.css" rel="stylesheet"/>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.min.js"></script>
        <script type="text/javascript" lang="javascript" src="./js/startPage/startPageScript.js"></script>
        <script type="module" src="./js/startPage/background.js"></script>
    </head>
    <body class="text-center" >
        <div class="background">
            <script> 
                var screenHeight = screen.height;
                //console.log("altezza " + screenHeight);
                if (screenHeight < 800) {
                    //console.log("minore di 800");
                    $('.background').css('zoom', 0.65);
                }
            </script>
            <h1>SHAPES</h1>
            <div class="centre">
            <form action="" class="form-signin" method="POST" name="myForm" onSubmit="return checkName();">
                
                <input type="text" name="inputName" class="form-control" placeholder="Player Name" required autofocus/>
                <br>
                <input type="password" name="password" class="form-control <?php echo $error; ?>" placeholder="Password" required/>
                <?php echo $error_tip;?>
                <p>Not registered? Click <a href="./register.php">here</a></p>
                <br>
                <button  class="btn btn-lg btn-primary btn-block" type="submit">PLAY</button>
            </form>
            </div>
        </div>
    </body>
</html>
