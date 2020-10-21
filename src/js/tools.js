//获取id
function $id(id){
    return id=document.getElementById(id)
}
//滚动条兼容性
function getScroll(){
    return {
        "top":document.documentElement.scrollTop||document.body.scrollTop,
        "left":document.documentElement.scrollLeft||document.body.scrollLeft
    };
}

//获取样式
function getStyle(dom,styleName){
    return dom.currentStyle?dom.currentStyle[styleName]:getComputedStyle(dom)[styleName];
}
//动画
//传入参数，dom节点，json,fn。
function animate(dom,json,fn){
    clearInterval(dom.timer)
    dom.timer=setInterval(function(){
        //需要去判断如果哪个属性没有到达目标位置，就把flag变成false
        var flag=true;
        for(var attr in json){
            //1.获取当前位置
            if(attr=="opacity"){
                var current=parseInt(getStyle(dom,attr)*100)
            }else if(attr=="display"){
                var current=getStyle(dom,attr)
            }
            else{
                var current=parseInt(getStyle(dom,attr))
            }
            //2.计算速度
            if(attr=="display"){
                var target=json[attr];
            }else{
                var target=parseInt(json[attr]);
                var speed=target>current?Math.ceil((target-current)/8):Math.floor((target-current)/8)
            }
            //3.计算下一次位置
            if(attr=="zIndex"){
                var next=target;
            }else if(attr=="display"){
                var next=target
            }else{
                var next =current+speed;
            }
            //4.定位元素
            if(attr=="opacity"){
                dom.style.opacity=next/100;
            }else if(attr=="zIndex"){
                dom.style.zIndex=next;
            }else if(attr=="display"){
                dom.style.display=next;
            }else{
                dom.style[attr]=next+'px'
                //dom.style.x=next+“px”
            }
            if(next!=target){
                flag=false;
            }
        }
        //运动结束后，检查flag的值，是否为true
        if(flag){
            clearInterval(dom.timer);
            if(fn){
                fn()
            }
        }
    },50)
}
//1 编写函数，把当前时间格式化成 `YYYY-MM-DD HH-mm-ss `
function formatDate(times){
    //times是一个时间戳:指定时间距离格林威治时间的毫秒数
    var time = new Date;
    if(times){
        //如果进入此处,说明time有实参赋值,因为如果没有实参赋值,他是undefined
        //如果传入参数,表示不是当前时间,是你指定的时间
        time.setTime(times)
    }
    //年
    var year = time.getFullYear();
    //月
    var month = time.getMonth()+1;//month取值0-11之间,显示要变成1-12之间,所以+1
    //如果月份是一位数,前面要补0;
    month = month<10?"0"+month:month;
    //日
    var date = time.getDate();
    //如果日是一位数,前面要补0;
    date = date<10?"0"+date:date;
    //小时
    var hour = time.getHours();
    hour = hour<10?"0"+hour:hour;
    //分
    var minute = time.getMinutes();
    minute = minute<10?"0"+minute:minute;
    //秒
    var second = time.getSeconds();
    second = second<10?"0"+second:second;
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}
//冒泡排序
function bubbleSort(arr){
    //比较轮数
    for(var i=0;i<arr.length-1;i++){
    //比较次数
        for(var j=0;j<arr.length-(i+1);j++){
            if(arr[j]>arr[j+1]){
                var x=0;
                x=arr[j+1]
                arr[j+1]=arr[j]
                arr[j]=x;
            }
        }
    }return arr
}
//优化版冒泡排序(当乱序数组排列为正确顺序时，停止循环)
function superBubbleSort(arr){
    for(var i=0,count=0;i<arr.length-1;i++){
        for(var j=0;j<arr.length-1-i;j++){
            if(arr[j]>arr[j+1]){
                var x=arr[j+1];
                arr[j+1]=arr[j];
                arr[j]=x;
            }else{
                count++;
            }
            if(count==arr.length-1-i){
                return arr;
            }
        }count=0;
    }
}

//降序
function chooseSortDesc(arr){
    //比较的次数
    for(var i=0;i<arr.length-1;i++){
        //比较的名次
        for(var j=i+1;j<arr.length;j++){
            if(arr[i]<arr[j]){
                var x=0
                x=arr[j]
                arr[j]=arr[i]
                arr[i]=x
            }
        }
    }return arr;
}

//升序
function chooseSortAsc(arr){
    //比较的次数
    for(var i=0;i<arr.length-1;i++){
        //比较的名次
        for(var j=i+1;j<arr.length;j++){
            if(arr[i]<arr[j]){
                var x=0
                x=arr[j]
                arr[j]=arr[i]
                arr[i]=x
            }
        }
    }return arr;
}
//字符串敏感词过滤
function strFilter(str){
    var newStr=str
    var sensitiveWord=[/SM/ig,/NM/ig]
    for(var i=0;i<sensitiveWord.length;i++){
        newStr=newStr.replace(sensitiveWord[i],'*')
    }return newStr;
}
//统计字符串中重复字符的个数，并去重
function removeStr(str){
    var obj={}
    var temp=''
    for(var i=0;i<str.length;i++){
        if(obj[str[i]]===undefined){//记录obj内未出现的arr[i]
            obj[str[i]]=1;
        }else{
            obj[str[i]]++//将arr[i]的出现次数记录
        }
    }console.log(obj)
    for(var j in obj){
        temp+=j
    }
    return temp;
}
//统计字符串中每个字符出现的个数
function countStr(str){
    var obj = {}
    var temp=''
    for(var i=0;i<str.length;i++){
        if(obj[str[i]]===undefined){
            obj[str[i]]=1
        }else{
            obj[str[i]]++
        }
    }
    for(var j in obj){
        temp+=j+':'+obj[j]+'\t'
    }return temp;
}
//判断字符串是否为回文字符串
function isPalindrome(str){
    var arr=str.split('');
    var newStr=arr.reverse();
    var isYes;
    if(newStr.join("")===str){
        isYes=true;
    }else{
        isYes=false;
    }
    return isYes;
}
//生成一个n到m之间的随机整数
function rand(n,m){
    var num =n+parseInt(Math.random()*(m-n+1));
    return num;
}
//编写函数has() 判断数组中是否存在某这个元素，返回布尔类型
function has(arr,data){
    for(var i=0;i<arr.length;i++){
         if(arr[i]===data){
             return true;
         }
    }return false;
}
//把当前时间格式化成 YYYY-MM-DD HH-mm-ss
//自定义时间格式
function myTime() {
    var myDate= new Date()
    var oYear=myDate.getFullYear()
    var oMonth=myDate.getMonth()
    var oDate=myDate.getDate()
    var oDay=myDate.getDay()
    var oHours=myDate.getHours()
    var oMinutes=myDate.getMinutes()
    var oSeconds=myDate.getSeconds()
    myDate=oYear+'年'+oMonth+'月'+oDate+'日'+' '+'星期'+numTransChinese(oDay)+' '+oHours+':'+oMinutes+':'+oSeconds
    return myDate;
}
//星期汉字转换
function numTransChinese(num){
    var Trans=['天','一','二','三','四','五','六']
    var str=Trans[num]
    return str
}
//年份转中文
function yearToChinese(num){
    var str=''
    var word=['〇','一','二','三','四','五','六','七','八','九']
    var arr=num.toString().split('')
    for(var i=0;i<arr.length;i++){
        str+=word[arr[i]]
    }return str;
}
//数字转中文
function numToChinese(num){
    var str=''
    var word=['〇','一','二','三','四','五','六','七','八','九']
    var weiArr=['','十','百','千','万']
    var arr=num.toString().split('').reverse()
    for(var i=0;i<arr.length;i++){
        str=word[arr[i]]+weiArr[i]+str
    }
    return str;
}
//获得一个十六进制的随机颜色的字符串(例如：#20CD4F)
function randColor(){
    var result='#'
    for(var i=0;i<6;i++){
        result+=rand(0,15).toString(16)//把十进制转成16进制
    }
    return result;
}
