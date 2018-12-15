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
            header('location: /index.php');
        }

    }
?>