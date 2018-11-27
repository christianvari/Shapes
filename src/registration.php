<?php
$username = $_POST['register'];
$password = $_POST['registerPassword'];
$name = $_POST['registerName'];
$surname = $_POST['registerSurname'];
$age = $_POST['register'];
$email = $_POST['registerEmail'];

?>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
    <h1>Risultati Registrazione</h1>
        <p>Benvenuto <?php echo $username ?></p>
        <?php header("location: /nuova-pagina.php"); ?>

</body>
</html>