<?php
    include("../server_side/registration.php");
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Registration</title>
    <link rel="icon" href="../util/shapes_logo_transparency.png"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="../util/shapes_logo_transparency.png"/>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="../css/register_mobile.css" rel="stylesheet"/>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="../js/build/background_register.js"></script>
</head>
<body>
    <div id="center"><h1>Registration</h1></div>
    <form action="" size="30" class="form-signin" method="POST" name="registerForm" onsubmit="return true;">
        <div id="left">
            <input type="text" class="form-control <?php echo $username_error; ?>" name="registerNickname" placeholder="NickName" required autofocus/>
            <?php echo ($username_error_tips == "") ? "<br>" : $username_error_tips; ?>
            <input type="text" class="form-control" name="registerName" placeholder="Name" required /><br>
            <input type="text" class="form-control" name="registerSurname" placeholder="Surname" required/><br>
            <input type="email" class="form-control <?php echo $email_error; ?>" name="registerEmail" placeholder="Email" required/>
            <?php echo ($email_error_tips == "") ? "<br>" : $email_error_tips; ?>
        </div>
        <div id="right">
            <input type="number" class="form-control <?php echo $age_error; ?>" name=registerAge placeholder="Birth Year" required/>
            <?php echo ($age_error_tips == "") ? "<br>" : $age_error_tips; ?>
            <input type="password" class="form-control <?php echo $password_error; ?>" name="registerPassword" placeholder="Password" required/><br>
            <input type="password" class="form-control <?php echo $password_error; ?>" name="checkPassword" placeholder="Retype password" required/>
            <?php echo ($password_error_tips == "") ? "<br>" : $password_error_tips; ?>
            <br>
            <div id="center_table">
                <table>
                    <button class="btn btn-lg btn-secondary btn-length" type="reset">RESET</button>
                    <button class="btn btn-lg btn-warning btn-length" type="submit">PLAY</button>
                </table>
            </div>
        </div>
        
    </form>
    
</body>
</html>