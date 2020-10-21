<?php
    require('./user/_connect.php');
    // 获取前端参数
    $uname = $_REQUEST['username'];
    $upass = $_REQUEST['password'];
    $sql = "SELECT * FROM `userinfo` WHERE `user_name`='$uname'";
    $res = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($res);
    // 查询数据库是否存在该用户名
    if($row){
        // 如果存在，说明已经存在账户，返回1
        echo json_encode(array("code"=>0,"msg"=>"已存在账户，请您直接登录"));
    }else{
        // echo json_encode(array("code"=>1,"msg"=>"不存在该账户名"));
        // 如果不存在，创建账户，返回0
        $sql = "INSERT INTO `userinfo` VALUES ('$uname','$upass')";

        $res = mysqli_query($conn,$sql);
        mysqli_close($conn);
        if($res){
            // 如果$res为true，说明插入成功，返回1；
            echo json_encode(array("code"=>1,"msg"=>"账户创建成功"));
        }else{
            //如果$res为false,说明$sql有语法错误
            echo json_encode(array("code"=>2,"msg"=>"服务器错误"));
        }
    }
?>