<?php
    include("config.php");
    session_start();
   
    if($_SERVER["REQUEST_METHOD"] == "POST") {
      // username and password sent from form 
      
        $myusername = mysqli_real_escape_string($db,$_POST['registerNickname']);
        $mypassword = mysqli_real_escape_string($db,$_POST['registerPassword']);
        $myusername = mysqli_real_escape_string($db,$_POST['registerName']);
        $mypassword = mysqli_real_escape_string($db,$_POST['registerSurname']); 
        $myusername = mysqli_real_escape_string($db,$_POST['registerAge']);
        $mypassword = mysqli_real_escape_string($db,$_POST['registerEmail']); 

        //$mypassword = password_hash($password, PASSWORD_DEFAULT);
      
        $sql = "INSERT INTO PLAYER_DATA (USERNAME, NAME, SURNAME, AGE, EMAIL, PASSWORD) VALUES($username, $name, $surname, $age, $email, $password)";
        $result = mysqli_query($db,$sql);
        /*$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
        $active = $row['active'];
      
        $count = mysqli_num_rows($result);
      
        if($count == 1) {
            //session_register("myusername");
            //$_SESSION['login_user'] = $myusername;
         
            header("location: index.php");
        }else {
            $error = "Your Login Name or Password is invalid";
        }*/
    }
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Registration</title>
    <link rel="icon" href="./util/shapes_logo_transparency.png"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" lang="javascript" src="./bootstrap/js/bootstrap.min.js"></script>
    <link href="./bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="register.css" rel="stylesheet"/>
    <script type="module" src="./js/registrationPage/background.js"></script>
</head>
<body>
    <div class="background">
        <h1>Registration</h1>
        <div class="centerzone">
            <form action="" size="30" class="form-signin" method="POST" name="registerForm" onsubmit="return true;">
                <input type="text" class="form-control" name="registerNickname" placeholder="NickName" required autofocus/><br>
                <input type="text" class="form-control" name="registerName" placeholder="Name" required /><br>
                <input type="text" class="form-control" name="registerSurname" placeholder="Surname" required/><br>
                <input type="email" class="form-control" name="registerEmail" placeholder="Email" required/><br>  
                <input type="number" class="form-control" name=registerAge placeholder="Age" required/><br>
                <input type="password" class="form-control" name="registerPassword" placeholder="Password" required/><br>
                <input type="password" class="form-control" name="checkPassword" placeholder="Retype password" required/><br>
                <br/>
                <table>
                    <button class="btn btn-lg btn-secondary btn-length" type="reset">RESET</button>
                    <button class="btn btn-lg btn-warning btn-length" type="submit">PLAY</button>
                </table>
                <p><?php echo $result; echo "ciao"; ?></p>
                
            </form>
            
            
        </div>
    </div>
    
</body>
</html>