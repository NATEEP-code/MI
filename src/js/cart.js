(function(){

    // 一打开购物车页面，展示购物车里面的商品
    showBody();
    function showBody(){
        $.ajax({
            url:'../interface/showlist.php',
            dataType:'json',
            cache:false,
            success:function(res){
                if(res.code){
                    var arr = res.data;
                    if(res.data){
                        $('.empty-cart-wrap').addClass('not-empty');
                        $('.cart-wrap').addClass('not-empty');
                        $('.item-table').empty();
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
                                    <div class="col col-total">${(item.product_price).split('元')[0]*(item.product_num)+'元'}</div>
                                    <div class="col col-action">
                                        <a href="javascript:void(0)" class="del iconfont">&#xe62d;</a>
                                    </div>
                                </div>`
                            )
                        });
                        var sCase=false;
                        function count(){
                            sCase=!sCase;
                            $(this).toggleClass('icon-checkbox-selected');
                            $('.no-select-tip').toggleClass('active')
                            $('.btn-a')
                            .toggleClass('btn-primary')
                            .toggleClass('btn-disabled');
                            
                            if(sCase){
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
                                $('.cart-total i').eq(1).text('0')
                                $('.total-price em').text('0')
                            }
                        }
                        $('.list-head .icon-checkbox').click(function(){
                            // $(this).toggleClass('icon-checkbox-selected');
                            sCase = !sCase;
                            var totalSum = '';
                            var totalNum = '';
                            var totalPrice = '';
                            if($('.item-row .icon-checkbox').hasClass('.icon-checkbox-selected')){
                                $('.icon-checkbox').removeClass('icon-checkbox-selected');
                            }
                            $('.icon-checkbox').toggleClass('icon-checkbox-selected');
                            $('.no-select-tip').toggleClass('active')
                            $('.btn-a')
                            .toggleClass('btn-primary')
                            .toggleClass('btn-disabled');
                            $('.change-goods-num input').each(function(i,v){
                                totalSum+=$(v).val()
                                return totalSum;
                            })
                            $('.item-row .col-total').each(function(i,v){
                                totalPrice+=$(v).text().split('元')[0];
                                return totalPrice;
                            })
                            totalNum = $('.item-row').length;
                            if(sCase){
                                $('.cart-total i').eq(0).text(totalNum);
                                $('.cart-total i').eq(1).text(totalSum);
                                $('.total-price em').text(totalPrice)
                            }else{
                                $('.cart-total i').eq(0).text(totalNum);
                                $('.cart-total i').eq(1).text('0')
                                $('.total-price em').text('0')
                            }
                        })
                        $('.icon-checkbox').each(function(i,v){
                            if(i>0){
                                $(v).click(count);
                            }
                        });
                    }
                }else{
                    //如果没有商品,table隐藏,div显示
                    $('.empty-cart-wrap').removeClass('not-empty');
                    $('.cart-wrap').removeClass('not-empty');                       
                }
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
})();