<?php
    include("config.php");
    $username_error = "";
    $username_error_tips = "";
    $email_error = "";
    $email_error_tips = "";
    $password_error = "";
    $password_error_tips = "";
    $age_error = "";
    $age_error_tips = "";
    $errors = 0;
   
    if($_SERVER["REQUEST_METHOD"] == "POST") {
      
        $username = mysqli_real_escape_string($db,$_POST['registerNickname']);
        $password = mysqli_real_escape_string($db,$_POST['registerPassword']);
        $name = mysqli_real_escape_string($db,$_POST['registerName']);
        $surname = mysqli_real_escape_string($db,$_POST['registerSurname']); 
        $age = mysqli_real_escape_string($db,$_POST['registerAge']);
        $email = mysqli_real_escape_string($db,$_POST['registerEmail']);
        $password_2 = mysqli_real_escape_string($db,$_POST['checkPassword']);

        if ($password != $password_2) {
	        $password_error = "is-invalid";
            $password_error_tips= "<div class='invalid-feedback'>Password doesn't match</div>";
            $errors++;
        }
        if ((int)$age >= date("Y") || (int)$age < 1900) {
            $age_error = "is-invalid";
            $age_error_tips= "<div class='invalid-feedback'>Insert a legit year of birth</div>";
            $errors++;
        }

        $password = password_hash($password, PASSWORD_BCRYPT);

        $user_check_query = "SELECT * FROM PLAYER_DATA WHERE USERNAME='$username' OR EMAIL='$email' LIMIT 1";
        $result = mysqli_query($db, $user_check_query);
        $user = mysqli_fetch_assoc($result);
        
        if ($user) {
            if ($user['USERNAME'] === $username) {
                $username_error = "is-invalid";
                $username_error_tips= "<div class='invalid-feedback'>Your username is altredy registered</div>";
                $errors++;
            }

            if ($user['EMAIL'] === $email) {
                $email_error = "is-invalid";
                $email_error_tips= "<div class='invalid-feedback'>Your email is altredy registered</div>";
                $errors++;
                
            }
        }

        if ($errors == 0) {

            $query = "INSERT INTO PLAYER_DATA (USERNAME, NAME, SURNAME, BIRTH, EMAIL, PASSWORD) 
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

    <link href="./bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="register.css" rel="stylesheet"/>
    <script type="module" src="./js/registrationPage/background.js"></script>
</head>
<body>
    <div class="background">
        <h1>Registration</h1>
        <div class="centerzone">
            <form action="" size="30" class="form-signin" method="POST" name="registerForm" onsubmit="return true;">
                <input type="text" class="form-control <?php echo $username_error; ?>" name="registerNickname" placeholder="NickName" required autofocus/>
                <?php echo ($username_error_tips == "") ? "<br>" : $username_error_tips; ?>
                <input type="text" class="form-control" name="registerName" placeholder="Name" required /><br>
                <input type="text" class="form-control" name="registerSurname" placeholder="Surname" required/><br>
                <input type="email" class="form-control <?php echo $email_error; ?>" name="registerEmail" placeholder="Email" required/>
                <?php echo ($email_error_tips == "") ? "<br>" : $email_error_tips; ?>
                <input type="number" class="form-control <?php echo $age_error; ?>" name=registerAge placeholder="Birth Year" required/>
                <?php echo ($age_error_tips == "") ? "<br>" : $age_error_tips; ?>
                <input type="password" class="form-control <?php echo $password_error; ?>" name="registerPassword" placeholder="Password" required/><br>
                <input type="password" class="form-control <?php echo $password_error; ?>" name="checkPassword" placeholder="Retype password" required/>
                <?php echo ($password_error_tips == "") ? "<br>" : $password_error_tips; ?>
                <br>
                <table>
                    <button class="btn btn-lg btn-secondary btn-length" type="reset">RESET</button>
                    <button class="btn btn-lg btn-warning btn-length" type="submit">PLAY</button>
                </table>
                
            </form>
            
            
        </div>
    </div>
    
</body>
</html>