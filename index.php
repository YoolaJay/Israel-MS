<?php
require './connection.php';
if (isset($_POST['signButton'])){
    $name=$_POST['name'];
    $email=$_POST['email'];
    $username=$_POST['username'];
    $level=$_POST['level'];
    $password=$_POST['password'];
    if(!empty($_POST['name'])&&!empty($_POST['email'])&&!empty($_POST['username'])&&!empty($_POST['level'])&&!empty($_POST['password'])){
        $insert=israel::insert($name,$email,$username,$level,$password);
    }else{
        echo "<script>alert('Please, all fields are required');</script>";
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dashboard</title>
</head>
<body>
                <div class="form">
                <form action="" method="post">
                    <div class="inputBox">
                    <input type="text" name="name" placeholder="Enter your name">
                    <input type="email" name="email" placeholder="Enter your email">
                    <input type="text" name="username" placeholder="Enter your username">
                    </div>
                    <div class="inputBox">
                    <select name="level" id="">    
                        <option value="1">Admin</option>
                        <option value="2">user</option>
                    </select>
                    <input type="password" name="password" placeholder="Enter your password">
                    </div>
                    <div class="submitButton">
                <input type="submit" value="Submit" name="signButton">
                    </div>

                    <div class="load-more"><a href="login.php" class="btn"> logout</a> </div>
            </form>
            </div>
        
</body>
</html>