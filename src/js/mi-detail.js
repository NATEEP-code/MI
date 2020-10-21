// 首页登录按钮显隐
(function(){
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
    function setCookie(key,value,expires){
        if(expires){
            var time = new Date();
            time.setTime(time.getTime()-8*60*60*1000+1000*expires);
            document.cookie=key + "=" + value + ";expires=" + time;
        }else{
            document.cookie=key + "=" + value;
        }
    }
    function hide(){
        $('.login').css({
            'display':'inline-block'
        })
        $('.title-right>.title-line').eq(0).css({
            'display':'inline-block'
        })
        $('.sign').css({
            'display':'inline-block'
        })
        $('.user').css({
            'display':'none'
        })
        $('.login-notic').css({
            "display":"block"
        })
    }
    if(getCookie("status")==1){
        $('.login').css({
            'display':'none'
        })
        $('.title-right>.title-line').eq(0).css({
            'display':'none'
        })
        $('.sign').css({
            'display':'none'
        })
        $('.user').css({
            'display':'inline-block'
        })
        $('.login-notic').css({
            "display":"none"
        })
        $('.user .name').text(getCookie('username'))
        $('.user').hover(function(e){
            $('.user').addClass('user-active')
            return false;
        },function(e){
            $('.user').removeClass('user-active')
        })
        $('.logout').click(function(){
            setCookie('status','',-1)
            hide()
        })
    }else{
        hide()
    }

    
})();
// swiper 

(function(){
      
  var mySwiper = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    autoplay:true,
    delay:3000,
    effect:'fade',
    speed:800,
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable :true,
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })
})();

// 首页回到顶部按钮滚动显隐
(function(){
    $(window).scroll(function(){
        if($(window).scrollTop()>300){
            $('.backtop').addClass('active')
        }else{
            $('.backtop').removeClass('active')
        }
    })
})();
//header下拉菜单
(function(){
    $('.nav-list>.nav-item').each(function(index,item){
        if(index<=6){
            $(item).hover(function(){
                $.ajax({
                    url:`../json/header-menu${index+1}.json`,
                    type:'get',
                    dataType:'json',
                    cache:false,
                    async:false,
                    success:function(res){
                        $.each(res,function(i,v){
                            // console.log(v.price);
                            $('.header-nav-menu li').eq(i)
                            .find('img')
                            .attr("src",v.img);
                            // console.log(a);
                            $('.header-nav-menu li').eq(i)
                            .find('.title')
                            .html(v.title);
                            $('.header-nav-menu li').eq(i)
                            .find('.price')
                            .text(v.price);
                            // console.log(v);
                        })
                    }
                })
                $('.header-nav-menu').stop()
                $('.header-nav-menu').slideDown(300)
            },function(){
                $('.header-nav-menu').stop()
                $('.header-nav-menu').slideUp(300)
            })
        }
    })
    $('.header-nav-menu').hover(function(){
        $('.header-nav-menu').stop()
        $('.header-nav-menu').slideDown(300)
    },function(){
        $('.header-nav-menu').stop()
        $('.header-nav-menu').slideUp(300)
    })
})();
//点击加入购物车
(function(){
    $('.btn-primary').eq(0).click(function(){
        $.ajax({
            url:'../interface/addwq.php',
            data:{
                id:$('#134679').attr('id'),
                name:$('.product-con').children('h2').text(),
                img:'../image/mi/mi-index/header-menu1.webp',
                price:$('.price-info').children('span').html(),
                num:1
            },
            dataType:'json',
            success:function(res){
                if(res.code){
                    alert("商品加入成功,正在跳转至购物车...")
                }
                location.href='../pages/cart.html'
            },
            error:function(){
                console.log(2);
            }
        })
    })
})();