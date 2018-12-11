<?php

    require_once "Mobile_Detect.php"; //Library

    function isMobile(){
        $detect = new Mobile_Detect;
        return $detect->isMobile();
    }
?>