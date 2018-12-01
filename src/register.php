<?php
    include("config.php");
    $errors = array(); 
   
    if($_SERVER["REQUEST_METHOD"] == "POST") {
      
        $username = mysqli_real_escape_string($db,$_POST['registerNickname']);
        $password = mysqli_real_escape_string($db,$_POST['registerPassword']);
        $name = mysqli_real_escape_string($db,$_POST['registerName']);
        $surname = mysqli_real_escape_string($db,$_POST['registerSurname']); 
        $age = mysqli_real_escape_string($db,$_POST['registerAge']);
        $email = mysqli_real_escape_string($db,$_POST['registerEmail']);
        $password_2 = mysqli_real_escape_string($db,$_POST['checkPassword']);

        if ($password != $password_2) {
	        array_push($errors, "Passwords don't match");
        }

        $password = password_hash($password, PASSWORD_BCRYPT);

        $user_check_query = "SELECT * FROM PLAYER_DATA WHERE USERNAME='$username' OR EMAIL='$email' LIMIT 1";
        $result = mysqli_query($db, $user_check_query);
        $user = mysqli_fetch_assoc($result);
        
        if ($user) {
            if ($user['USERNAME'] === $username) {
            array_push($errors, "Username already exists");
            }

            if ($user['EMAIL'] === $email) {
            array_push($errors, "Email already exists");
            }
        }

        if (count($errors) == 0) {

            $query = "INSERT INTO PLAYER_DATA (USERNAME, NAME, SURNAME, AGE, EMAIL, PASSWORD) 
                      VALUES('$username', '$name', '$surname', '$age', '$email', '$password')";

            mysqli_query($db, $query);
            $query = "INSERT INTO HIGHSCORE (PLAYER) 
                      VALUES('$username')";

            mysqli_query($db, $query);
            header('location: index.php');
        }

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
                <?php  if (count($errors) > 0) : ?>
                    <div class="error">
                    <?php foreach ($errors as $error) : ?>
  	                    <p><?php echo $error ?></p>
  	                <?php endforeach ?>
                    </div>
                <?php  endif ?>
                
            </form>
            
            
        </div>
    </div>
    
</body>
</html>