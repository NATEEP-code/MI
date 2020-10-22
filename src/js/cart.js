(function(){

    // 一打开购物车页面，展示购物车里面的商品
    showBody();
    cart()
    function showBody(){
        $.ajax({
            url:'../interface/showlist.php',
            dataType:'json',
            async:false,
            cache:false,
            success:function(res){
                console.log(res.code);
                if(res.code){
                    var arr = res.data;
                    if(res.data){
                        $('.empty-cart-wrap').addClass('not-empty');
                        $('.cart-wrap').addClass('not-empty');
                        $('.item-table').empty();
                        console.log(arr);
                        $.each(arr,function(index,item){
                            $('.cart-wrap .item-table').append(
                                `
                                <div class="item-row clearfix" id="${item.product_id}">
                                    <div class="col col-check">
                                        <i class="iconfont icon-checkbox">&#xe61b;</i>
                                    </div>
                                    <div class="col col-img">
                                        <a href="javascript:void(0)">
                                            <img src="${item.product_img}" alt="">
                                        </a>
                                    </div>
                                    <div class="col col-name">
                                        <h3 class="name">
                                            <a href="javascript:void(0)">${item.product_name}</a>
                                        </h3>
                                    </div>
                                    <div class="col col-price">${item.product_price}</div>
                                    <div class="col col-num">
                                        <div class="change-goods-num">
                                            <a href="javascript:void(0)" class="subtraction iconfont">&#xe60b;</a>
                                            <input type="text" autocomplete="off" value="${item.product_num}">
                                            <a href="javascript:void(0)" class="add iconfont">&#xe721;</a>
                                        </div>
                                    </div>
                                    <div class="col col-total">${((item.product_price).split('元')[0]*(item.product_num)).toFixed(1)}元</div>
                                    <div class="col col-action">
                                        <a href="javascript:void(0)" class="del iconfont">&#xe62d;</a>
                                    </div>
                                </div>`
                            )
                        });
                        var sCase=false;
                        var sCaseAll=false;
                        function count(){
                            sCase=!sCase;
                            if(sCase){
                                $(this).addClass('icon-checkbox-selected');
                                $('.no-select-tip').addClass('active')
                                $('.btn-a')
                                .addClass('btn-primary')
                                .removeClass('btn-disabled');
                                $('.cart-total i').eq(1).text(
                                    $(this)
                                    .parent()
                                    .parent()
                                    .find('.change-goods-num input')
                                    .val()
                                )
                                $('.total-price em').text(
                                    $(this)
                                    .parent()
                                    .parent()
                                    .find('.col-total')
                                    .text()
                                    .split('元')[0]
                                )
                            }else{
                                $(this).removeClass('icon-checkbox-selected');
                                $('.no-select-tip').removeClass('active')
                                $('.btn-a')
                                .removeClass('btn-primary')
                                .addClass('btn-disabled');
                                $('.cart-total i').eq(1).text('0')
                                $('.total-price em').text('0')
                            }
                            console.log(2);
                        }
                        $('.list-head .icon-checkbox').click(function(){
                            sCaseAll = !sCaseAll;
                            var totalSum = null;
                            var totalNum = '';
                            var totalPrice = null;
                            $('.change-goods-num input').each(function(i,v){
                                totalSum+=parseInt($(v).val())
                                return totalSum;
                            })
                            $('.item-row .col-total').each(function(i,v){
                                totalPrice+=parseInt($(v).text().split('元')[0]);
                                return totalPrice;
                            })
                            totalNum = $('.item-row').length;
                            if(sCaseAll){
                                sCase=true;
                                $('.no-select-tip').addClass('active')
                                $('.btn-a')
                                .addClass('btn-primary')
                                .removeClass('btn-disabled');
                                $('.icon-checkbox').addClass('icon-checkbox-selected')
                                $('.cart-total i').eq(0).text(totalNum);
                                $('.cart-total i').eq(1).text(totalSum);
                                $('.total-price em').text(totalPrice)
                            }else{
                                sCase=false;
                                $('.no-select-tip').removeClass('active')
                                $('.btn-a')
                                .removeClass('btn-primary')
                                .addClass('btn-disabled');
                                $('.icon-checkbox').removeClass('icon-checkbox-selected')
                                $('.cart-total i').eq(0).text(totalNum);
                                $('.cart-total i').eq(1).text('0')
                                $('.total-price em').text('0')
                            }
                        })
                        
                        $('.item-row .icon-checkbox').click(count)
                    }
                }else{
                    //如果没有商品,table隐藏,div显示
                    $('.empty-cart-wrap').removeClass('not-empty');
                    $('.cart-wrap').removeClass('not-empty');                       
                }
            }
        })
    }
    function cart(){
        $.ajax({
            url:'../json/cart-menu.json',
            dataType:'json',
            async:false,
            cache:false,
            success:function(res){
                $.each(res,function(i,v){
                    $('.recommend-list').append(`
                    <li class="recommend-item" id="${v.id}">
                        <a href="../html/mi-detail.html">
                            <img src="${v.img}" alt="">
                            <p class="recommend-name">
                                ${v.title}
                            </p>
                            <p class="recommend-price">
                                ${v.price}
                            </p>
                            <p class="recommend-tips">
                                41.9万人好评
                            </p>
                        </a>
                        <div class="recommend-action">
                            <a href="javascript:void(0)" class="btn btn-small btn-line-primary">加入购物车</a>
                        </div>
                    </li>
                    `)
                })
            }
        })
    }

    // 点击+增加一个商品，点击-减少一个商品数量
    $('.item-table').eq(0).click(function(e){
        var target = e.target;
        e.stopPropagation();
        if($(target).hasClass('add')||$(target).hasClass('subtraction')){
            var name=target.className.trim().split(' ')[0]
            $.ajax({
                url:'../interface/updatewq.php',
                data:{
                    type:name,
                    id:$(target).parents('.item-row').attr('id')
                },
                success:function(res){
                    if(res.code){
                        showBody()
                    }
                },
                dataType:'json'
            })
        }else if($(target).hasClass('del')){
            $.ajax({
                url:'../interface/delwq.php',
                data:{
                    id:$(target).parents('.item-row').attr('id')
                },
                success:function(res){
                    if(res.code){
                        showBody()
                    }
                },
                dataType:'json'
            })
        }
    })
    
    //点击项目添加购物车
    $('.btn-line-primary').click(function(){
        console.log(1);
        var id = $(this).parent().parent().attr('id');
        var name = $(this).parent().siblings().children('.recommend-name').html().trim()
        var price = $(this).parent().siblings().children('.recommend-price').html().trim()
        var img = $(this).parent().siblings().children('img').attr('src').trim()
        console.log(id,name,price,img);
        $.ajax({
            url:'../interface/addwq.php',
            data:{
                id:id,
                name:name,
                price:price,
                img:img,
                num:1
            },
            dataType:'json',
            cache:false,
            success:function(){
                location.reload()
            }
        })
    }) 
})();