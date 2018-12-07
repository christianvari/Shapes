<?php
   define('DB_SERVER', 'localhost');
   //define('DB_USERNAME', 'shapes');
   define('DB_USERNAME', 'root');
   define('DB_PASSWORD', '');
   define('DB_DATABASE', 'my_shapes');
   $db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
?>