<?php

    include("server_side/check_media_type.php");

    if(isMobile()){
        header("location: mobile/login_mobile.php");
    }
    else{
        header("location: desktop/login.php");
    }
?>