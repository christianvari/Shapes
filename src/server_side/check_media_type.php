<?php

    require_once "Mobile_Detect.php";

    function isMobile(){
        $detect = new Mobile_Detect;
        return $detect->isMobile();
    }
?>