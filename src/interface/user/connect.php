<?php
    header('content-type:text/html;charset=utf-8');
    $servername = "127.0.0.1";
    // 创建连接
    $conn = mysqli_connect($servername,'root','root');
    if(mysqli_connect_error()){
        die('连接失败');
    }
?>