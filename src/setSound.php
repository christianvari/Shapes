<?php
    include("config.php");
    session_start();

    $sound_state = $_REQUEST["q"];
    
    $_SESSION["sound"] = $sound_state;
?>