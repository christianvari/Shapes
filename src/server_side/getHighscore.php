<?php
    include("config.php");
    
    $sql = "SELECT *\n"
    . "FROM HIGHSCORE\n"
    . "ORDER BY HIGHSCORE DESC\n"
    . "LIMIT 10";

    $result = mysqli_query($db, $sql);

    $str = '';

    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            $str = $str . "<tr><td>" . $row["PLAYER"]. "</td>" . "<td>" . $row["HIGHSCORE"] . "</td></tr>";
        }
    }

    echo "<table>" . $str . "</table>";

    
?>