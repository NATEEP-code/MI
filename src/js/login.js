function setCookie(key,value,expires){
    if(expires){
        var time = new Date();
        time.setTime(time.getTime()-8*60*60*1000+1000*expires);
        document.cookie=key + "=" + value + ";expires=" + time;
    }else{
        document.cookie=key + "=" + value;
    }
}
function getCookie(key){
    var str="";
    var temp=document.cookie.split(";");
    for(var i=0;i<temp.length;i++){
        var t = temp[i].trim().split('=');
        if(t[0]===key){
            str = t[1];
        }
    }
    return str;
}
// 登陆选项卡
(function(){
    $('.nav-tabs-panel').click(function(e){
        var target = e.target;
        if($(target).hasClass('navtab-link')){
            $('.navtab-link').removeClass('now')
            $(target).addClass('now')
            if($(target).index()==0){
                $('.tabs-con').removeClass('now')
                $('.tabs-con').eq(0).addClass('now')
            }else if($(target).index()==2){
                $('.tabs-con').removeClass('now')
                $('.tabs-con').eq(1).addClass('now')
            }
        }
    })
})();

// 登录操作
(function(){
    if(getCookie('status')==1){
        location.href='./mi-index.html';
    }
    $('#user').val(getCookie('username'));
    $('#pwd').val(getCookie('password'));
    $('#login-button').click(function(){
        var uName = $('#user').val();
        var uPass = $('#pwd').val();
        
        $.ajax({
            url:'../interface/login.php',
            type:'post',
            data:{
                username:uName,
                password:uPass
            },
            dataType:'json',
            cache:false,
            success:function(res){
                if(res.code){
                    setCookie("username",uName);
                    setCookie("password",uPass);
                    setCookie('status',1);
                    $('.login-btn').val('登陆成功，正在跳转...');
                    var timer = setTimeout(() => {
                        location.href='./mi-index.html';
                        clearTimeout(timer);
                    }, 3000);
                }else{
                    $('.msg').html("账户名或密码错误");
                }
            },
            error:function(){
                console.log('无法连接到服务器');
            }
        })
    })
})();