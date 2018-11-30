<?php
   include("config.php");
   
   if($_SERVER["REQUEST_METHOD"] == "POST") {
      
        $myusername = mysqli_real_escape_string($db,$_POST['inputName']);
        $mypassword = mysqli_real_escape_string($db,$_POST['password']); 

        $sql = "SELECT PASSWORD FROM PLAYER_DATA WHERE USERNAME = '$myusername'";
        $result = mysqli_query($db,$sql);
        $password = mysqli_fetch_assoc($result);
        $count = mysqli_num_rows($result);

        if(password_verify($mypassword, $password['PASSWORD']) && $count == 1){

            header("location: game.html");
            
        }else{
            $error = "Your Login Name or Password is invalid";
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

        <script type="text/javascript" lang="javascript" src="./bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" lang="javascript" src="./js/startPage/startPageScript.js"></script>
        <script type="module" src="./js/startPage/background.js"></script>
    </head>
    <body class="text-center" >
        <div class="background">
                <h1>SHAPES</h1>
                <div class="centre">
                <form action="" class="form-signin" method="POST" name="myForm" onSubmit="return checkName();"> <!-- to add some right action -->
                    
                    <input type="text" name="inputName" class="form-control" placeholder="Player Name" required autofocus/>
                    <br>
                    <input type="password" name="password" class="form-control" placeholder="Password" required/>
                    <!--
                    <div id="divRemember" class="checkbox mb-3">
                        <input type="checkbox" name="remember"/>
                        <label for="remember">Remember me</label>
                    </div>-->
                    
                    <p>Not registered? Click <a href="./register.php">here</a></p>
                    <br>
                    <button  class="btn btn-lg btn-primary btn-block" type="submit">PLAY</button> <!-- to add type -->
                </form>
                <p><?php echo $error;?></p>
                </div>
        </div>
    </body>
</html>
