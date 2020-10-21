(function(){
    function setCookie(key,value,expires){
        if(expires){
            var time = new Date();
            time.setTime(time.getTime()-8*60*60*1000+1000*expires);
            document.cookie=key + "=" + value + ";expires=" + time;
        }else{
            document.cookie=key + "=" + value;
        }
    }
    $("#conf-btn").eq(0).click(function(){
        var uName = $('#username').val();
        var uPass = $("#password").val();
        console.log(uName,uPass);
        $.ajax({
            url:'../interface/register.php',
            type:"get",
            data:{
                username:uName,
                password:uPass
            },
            dataType:'json',
            cache:false,
            success:function(res){
                if(res.code==1){
                    $('.region-tip-text').html('账户名可用');
                    $('.success-notic').html('账号创建成功，正在跳转至登陆页面...');
                    setCookie('status',' ',-1)
                    var timer1= setTimeout(() => {
                        location.href='./login.html'
                        clearTimeout(timer1);
                    }, 3000);
                }else if(res.code==2){
                    alert('服务器错误')
                }else if(res.code==0){
                    $('.success-notic').html('已存在该账户，请您直接登录');
                }
            },
            error:function(){
                alert('无法连接至服务器')
            }
        })
    })
})();