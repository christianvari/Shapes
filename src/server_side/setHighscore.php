<?php
    include("config.php");
    session_start();

    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $record = $_POST['record'];
        $username = $_SESSION['username'];

        $user_check_query = "SELECT * FROM HIGHSCORE WHERE PLAYER='$username'";
        $result = mysqli_query($db, $user_check_query);
        $data = mysqli_fetch_assoc($result);

        if($data['HIGHSCORE'] < $record){

            $sql = "UPDATE HIGHSCORE SET HIGHSCORE = '$record' WHERE PLAYER= '$username'";
            mysqli_query($db, $sql);
            echo "Nuovo Record!";
        }
    }

?>