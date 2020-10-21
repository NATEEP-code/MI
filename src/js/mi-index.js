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
// banner轮播图
(function(){
    var index = 0;
    var timer1 = null;
    function slide(){
        $('.swiper-slide>a').removeClass('slide-active')
        $('.swiper-slide>a').eq(index).addClass('slide-active')
    }
    function light(){
        $('.swiper-circ-dot').removeClass('swiper-circ-dot-active')
        $('.swiper-circ-dot').eq(index).addClass('swiper-circ-dot-active')
    }
    slide()
    light()
    timer1 = setInterval(() => {
        index++;
        if(index>4){
            index=0;
        }
        slide();
        light();
    }, 5000);
    $('.prev').on('click',function(){
        clearInterval(timer1);
        index--;
        if(index<0){
            index=4;
        }
        slide();
        light();
        timer1 = setInterval(() => {
            index++;
            if(index>4){
                index=0;
            }
            slide();
            light();
        }, 5000);
    })
    $('.next').on('click',function(){
        clearInterval(timer1);
        index++;
        if(index>4){
            index=0;
        }
        slide();
        light();
        timer1 = setInterval(() => {
            index++;
            if(index>4){
                index=0;
            }
            slide();
            light();
        }, 5000);
    })
    $('.swiper-slide>a').hover(function(){
        clearInterval(timer1)
    },function(){
        timer1 = setInterval(() => {
            index++;
            if(index>4){
                index=0;
            }
            slide();
            light();
        }, 5000);
    })
    $('.banner-swiper').on('click','.circ>.swiper-circ-dot',function(e){
        e=e||window.event;
        e.preventDefault?e.preventDefault():e.returnValue=false;
        clearInterval(timer1)
        index = $(this).index()
        console.log(index)
        slide();
        light();
        timer1 = setInterval(() => {
            index++;
            if(index>4){
                index=0;
            }
            slide();
            light();
        }, 5000);
    })
    document.onvisibilitychange = function(){
        if(document.visibilityState =='hidden'){
            clearInterval(timer1)
        }
        if(document.visibilityState =='visible'){
            timer1 = setInterval(() => {
                index++;
                if(index>4){
                    index=0;
                }
                slide();
                light();
            }, 5000);
        }
    }
})();
// swipe1 end

(function(){
    var index = 0;
    var timer = 0;
    var flag = true;
    var width = $('.swiper-wrapper').parent().width()+14;
    function swiper(){
        $('.home-con-swiper .swiper-wrapper').animate({
            left:-width*index
        },500,'swing',function(){
            flag=true;
        })
    }
    timer = setInterval(function(){
        if(index==0){
            index++;
            $('.swiper-controls .swiper-prev').removeClass('swiper-button-disabled')
            swiper()
        }else if(index==2){
            index=0;
            swiper();
            $('.swiper-controls .swiper-next').removeClass('swiper-button-disabled')
            $('.swiper-controls .swiper-prev').addClass('swiper-button-disabled')
            swiper()
        }else{
            index++;
            swiper();
            if(index==2){
            $('.swiper-controls .swiper-next').addClass('swiper-button-disabled')
            }
        }
    },5000)
    $('.home-con-swiper').on('click','.swiper-controls .swiper-next',function(e){
        clearInterval(timer);
        if(flag){
            flag=false;
            $('.swiper-controls .swiper-prev').removeClass('swiper-button-disabled')
            index++;
            if(index>=2){
                index=2
                $('.swiper-controls .swiper-next').addClass('swiper-button-disabled')
                swiper()
            }else{
                swiper()
            }
            timer = setInterval(function(){
                if(index==0){
                    index++;
                    $('.swiper-controls .swiper-prev').removeClass('swiper-button-disabled')
                    swiper()
                }else if(index==2){
                    index=0;
                    swiper();
                    $('.swiper-controls .swiper-next').removeClass('swiper-button-disabled')
                    $('.swiper-controls .swiper-prev').addClass('swiper-button-disabled')
                    swiper()
                }else{
                    index++;
                    swiper();
                    if(index==2){
                    $('.swiper-controls .swiper-next').addClass('swiper-button-disabled')
                    }
                }
            },5000)
        }
    })
    $('.home-con-swiper').on('click','.swiper-controls .swiper-prev',function(e){
        clearInterval(timer);
        if(flag){
            flag=false;
            $('.swiper-controls .swiper-next').removeClass('swiper-button-disabled')
            index--;
            if(index<=0){
                index=0;
                swiper()
                $('.swiper-controls .swiper-prev').addClass('swiper-button-disabled')
            }else{
                swiper()
            }
            timer = setInterval(function(){
                if(index==0){
                    index++;
                    $('.swiper-controls .swiper-prev').removeClass('swiper-button-disabled')
                    swiper()
                }else if(index==2){
                    index=0;
                    swiper();
                    $('.swiper-controls .swiper-next').removeClass('swiper-button-disabled')
                    $('.swiper-controls .swiper-prev').addClass('swiper-button-disabled')
                    swiper()
                }else{
                    index++;
                    swiper();
                    if(index==2){
                    $('.swiper-controls .swiper-next').addClass('swiper-button-disabled')
                    }
                }
            },5000)
        }
    })
    $('.container-swiper').hover(function(){
        clearInterval(timer)
    },function(){
        timer = setInterval(function(){
            if(index==0){
                index++;
                $('.swiper-controls .swiper-prev').removeClass('swiper-button-disabled')
                swiper()
            }else if(index==2){
                index=0;
                swiper();
                $('.swiper-controls .swiper-next').removeClass('swiper-button-disabled')
                $('.swiper-controls .swiper-prev').addClass('swiper-button-disabled')
                swiper()
            }else{
                index++;
                swiper();
                if(index==2){
                $('.swiper-controls .swiper-next').addClass('swiper-button-disabled')
                }
            }
        },5000)
    })
    document.onvisibilitychange = function(){
        if(document.visibilityState =='hidden'){
            clearInterval(timer)
        }
        if(document.visibilityState =='visible'){
            timer = setInterval(function(){
                if(index==0){
                    index++;
                    $('.swiper-controls .swiper-prev').removeClass('swiper-button-disabled')
                    swiper()
                }else if(index==2){
                    index=0;
                    swiper();
                    $('.swiper-controls .swiper-next').removeClass('swiper-button-disabled')
                    $('.swiper-controls .swiper-prev').addClass('swiper-button-disabled')
                    swiper()
                }else{
                    index++;
                    swiper();
                    if(index==2){
                    $('.swiper-controls .swiper-next').addClass('swiper-button-disabled')
                    }
                }
            },5000)
        }
    }
})();

// banner-swiper end

(function(){
    var fn = ()=>{
        var dateNow = new Date();
        var timerArr=[];
        var y = dateNow.getFullYear();
        var mon = dateNow.getMonth();
        var d = dateNow.getDate();
        var h = dateNow.getHours();
        var m = dateNow.getMinutes();
        var s =dateNow.getSeconds();
        var dateEnd = new Date(y,mon,d,22);
        var dateRemain = dateEnd.getTime()-dateNow.getTime();
        if(dateRemain<=0){
            clearInterval(timer)
        }
        h = parseInt(dateRemain/(60*60*1000))
        if(h){
            var timeRemain = dateRemain%(h*60*60*1000)
        }else{
            var timeRemain = dateRemain;
        }
        m = parseInt(timeRemain/(60*1000))
        timeRemain = timeRemain%(m*60*1000)
        s = parseInt(timeRemain/1000)
        timerArr=[
            parseInt(h/10),
            h%10,
            parseInt(m/10),
            m%10,
            parseInt(s/10),
            s%10
        ]
        $('.count-down .hour').html(`${timerArr[0]}${timerArr[1]}`)
        $('.count-down .min').html(`${timerArr[2]}${timerArr[3]}`)
        $('.count-down .sec').html(`${timerArr[4]}${timerArr[5]}`)
    }
    fn()
    var timer = setInterval(fn,1000)
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
})() 
