<?php
   include("config.php");
   session_start();
   $error = "";
   $error_tip = "";
   
   if($_SERVER["REQUEST_METHOD"] == "POST") {
      
        $myusername = mysqli_real_escape_string($db,$_POST['inputName']);
        $mypassword = mysqli_real_escape_string($db,$_POST['password']); 

        $sql = "SELECT PASSWORD FROM PLAYER_DATA WHERE USERNAME = '$myusername'";
        $result = mysqli_query($db,$sql);
        $password = mysqli_fetch_assoc($result);
        $count = mysqli_num_rows($result);

        if(password_verify($mypassword, $password['PASSWORD']) && $count == 1){

            $_SESSION['username'] = $myusername;
            header("location: game.php");
            
        }else{
            $error = "is-invalid";
            $error_tip = "<div class='invalid-feedback'>Username or password is wrong</div>";
        }
    }
?>


<!doctype html>
<html lang="en">
    <head>
        <title>Shapes</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="./util/shapes_logo_transparency.png"/>

        <link href="./bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
        <link href="index.css" rel="stylesheet"/>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script type="text/javascript" lang="javascript" src="./bootstrap/js/bootstrap.min.js"></script>
        <script> 
            var screenHeight = screen.height;
            console.log("altezza " + screenHeight);
            if (screenHeight < 800) {
                console.log("minore di 800");
                $('.background').css('zoom', 0.8);
            }
        </script>
        <script type="text/javascript" lang="javascript" src="./js/startPage/startPageScript.js"></script>
        <script type="module" src="./js/startPage/background.js"></script>
    </head>
    <body class="text-center" >
        <div class="background">
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
