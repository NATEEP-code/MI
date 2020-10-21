<?php
    require('./user/_connect.php');
    // 获取前端参数
    $uname = $_REQUEST['username'];
    $password = $_REQUEST['password'];
    $sql = "SELECT * FROM `userinfo` WHERE `user_name`='$uname' AND `user_password`='$password'";
    $res = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($res);
    mysqli_close($conn);

    if($row){
        echo json_encode(array("code"=>1));
    }else{
        echo json_encode(array("code"=>0));
    }
?>