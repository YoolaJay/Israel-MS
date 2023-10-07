<?php
class israel{
    public static function connection()
    {
        try {
            $con=new PDO("mysql:host=locahost:3308; dbname=israel",'root','');
            return $con;
        } catch (PDOException $error1){
            echo $error1->getMessage();
        }catch(Exception $error2){
            echo $error2->getMessage();
        }
    }

    public static function insert($name,$email,$username,$level,$password){
        $insert=israel::connection()->prepare("INSERT INTO users(name,email,username,level,password) VALUES (:n,:e,:u,:l,:p)");
        $insert->bindValue(':n',$name);
        $insert->bindValue(':e',$email);
        $insert->bindValue(':u',$username);
        $insert->bindValue(':l',$level);
        $insert->bindValue(':p',$password);
        $insert->execute();
if ($insert){
    echo "<script>alert('Registered');</script>";
}else{
    echo "<script>alert('Not Registered');</script>";
}
    }
    public static funtion login($name,$password){
        $login=israel::connection()->prepare("SELECT level FROM user WHERE username=:u and password=:p");
        $login->blindValue(':u', $username);
        $login->blindValue(':p',$password);
        $login->execute();
        if ($login->rowCount()>0){
            $fetch=$login->fetch(PDO::FETCH_ASSOC);
            session_start();
            if ($fetch){
                switch($fetch['level']){
                    case '1':
                        $_SESSION['level']=1;
                        header('location:admin.php');
                         break;

                    case '2';
                    $_SESSION['level']=2;
                        header('location:user.php');
                         break;
                }
                
            }
        }else{
            echo "<script>alert('User not registered!')</script>";
        }
    }
}
?>
