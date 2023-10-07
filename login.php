<?php
require './connection.php';
if (isset($_POST['loginButton'])){
    $username=$_POST['username'];
    $password=$_POST['password'];
    if (!empty($_POST['username'])&&!empty($_POST['password'])){
        $login=israel::login($name,$password);
    }else {
        echo "Please, all Flieds are required";
    }
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login form</title>
</head>
<body><div class="formLogin">
    <form action="" method="post">
        <input type="username" name="username" placeholder="Enter your username">
        <input type="password" name="password" placeholder="Enter your password">
        <input type="submit" value="Login" name="loginButton">
    </form>
</div>
    
</body>
</html>