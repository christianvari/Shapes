<?php
   include("config.php");
   include("check_media_type.php");
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
            $_SESSION['sound'] = "true";
            
            $useragent=$_SERVER['HTTP_USER_AGENT'];

            if(isMobile()){
                header("location: ../mobile/game_mobile.php");
            }
            else{
                header("location: ../desktop/game.php");
            }
            
        }else{
            $error = "is-invalid";
            $error_tip = "<div class='invalid-feedback'>Username or password is wrong</div>";
        }
    }
?>