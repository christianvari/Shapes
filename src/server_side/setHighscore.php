<?php
    include("config.php");
    session_start();

    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $record = $_POST['record'];
        $a = $_POST['k'];
        $username = $_SESSION['username'];

        if($a == "asdfghjkl" && (($record % 100) == 0) && ($record < 100000)){

            $user_check_query = "SELECT * FROM HIGHSCORE WHERE PLAYER='$username'";
            $result = mysqli_query($db, $user_check_query);
            $data = mysqli_fetch_assoc($result);

            if($data['HIGHSCORE'] < $record){

                $sql = "UPDATE HIGHSCORE SET HIGHSCORE = '$record' WHERE PLAYER= '$username'";
                mysqli_query($db, $sql);
                echo "Nuovo Record!";
            }
        }
    }

?>