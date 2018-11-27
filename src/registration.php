<?php
$username = $_POST['registerNickname'];
$password = $_POST['registerPassword'];
$name = $_POST['registerName'];
$surname = $_POST['registerSurname'];
$age = $_POST['registerAge'];
$email = $_POST['registerEmail'];
?>

<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body text_align="center">
    <h1>Risultati Registrazione</h1>
        <p>Benvenuto <?php echo $username ?></p>
        <?php header("refresh: 10; url = index.html"); ?>

</body>
</html>