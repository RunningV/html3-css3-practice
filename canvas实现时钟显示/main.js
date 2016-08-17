var cvs = null;
var ctx = null;
var cw = 500;
var ch = 500;
var PI = Math.PI;

window.onload = function() {
	/*获取画布*/
	cvs = document.getElementById('canvas');
	ctx = cvs.getContext('2d');
	/*重新定义画布中心为原点*/
	ctx.translate(250,250);
	/*1.表盘初始化*/
	drawPan();
	/*2.刻度初始化*/
	drawLines(60, 2, 15, '#95a5a6');
	drawLines(12, 5, 20, '#2c3e50');
	/*3.表针初始化*/
	initPing();
	/*4.指针转动动画，每1s重绘一次指针*/
	setInterval(function(){
            //获取当前h、m、s值
            var now = new Date(),
                hour = now.getHours()%12,//biao表盘12进制
                min = now.getMinutes(),
                sec = now.getSeconds();

            //hms值转化为对应弧度
            var secAngle = sec*2*PI/60 - PI/2,  // s*6-90
                minAngle = min*2*PI/60 + sec*2*PI/3600 - PI/2,  // m*6+s*0.1-90
                hourAngle = hour*2*PI/12 + min*2*PI/12/60 - PI/2;  // h*30+m*0.5 - 90

            //每次调用重绘表盘
            drawPan();
            drawLines(60,2,15,"#95A5A6");
            drawLines(12,5,20,"#2C3E50");

            //重绘指针位置
            hourMove(hourAngle);
            minuteMove(minAngle);
            secondMove(secAngle);
    },1000);
}

/*绘制表盘*/
function drawPan() {
	ctx.clearRect(-250,-250,500,500);
	ctx.beginPath();
	ctx.arc(0,0,250,0,2*PI,0);
	ctx.fillStyle = '#2ecc71';
	ctx.fill();

	ctx.beginPath();
	ctx.arc(0,0,10,0,2*PI,0);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#ecf0f1';
	ctx.stroke();
}
/*表盘刻度（刻度个数，刻度宽度，刻度长度，刻度颜色）*/
function drawLines(num,width,length,color){
    var angle = 0;
    ctx.beginPath();
    for(var i=0;i<num;i++){
        ctx.moveTo(cw/2*Math.cos(angle),cw/2*Math.sin(angle));
        ctx.lineTo((cw/2-length)*Math.cos(angle),(cw/2-length)*Math.sin(angle));
        angle += 2*PI/num;
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}
/*表针初始化函数*/
function initPing(){
    var now = new Date(),
        hour = now.getHours()%12,
        min = now.getMinutes(),
        sec = now.getSeconds();

    var secAngle = sec*2*PI/60 - PI/2,  // s*6-90
        minAngle = min*2*PI/60 + sec*2*PI/3600 - PI/2,  // m*6+s*0.1-90
        hourAngle = hour*2*PI/12 + min*2*PI/12/60 - PI/2;  // h*30+m*0.5 - 90
    //时针初始化
    ctx.beginPath();
    ctx.strokeStyle = "#9B59B6";
    ctx.lineWidth = 5;
    ctx.moveTo(13*Math.cos(hourAngle),13*Math.sin(hourAngle));
    ctx.lineTo(80*Math.cos(hourAngle),80*Math.sin(hourAngle));
    ctx.stroke();
    //分针初始化
    ctx.beginPath();
    ctx.strokeStyle = "#2980B9";
    ctx.lineWidth = 4;
    ctx.moveTo(13*Math.cos(minAngle),13*Math.sin(minAngle));
    ctx.lineTo(120*Math.cos(minAngle),120*Math.sin(minAngle));
    ctx.stroke();
    ctx.stroke();
    //秒针初始化
    ctx.beginPath();
    ctx.strokeStyle = "#DFDFDF";
    ctx.lineWidth = 3;
    ctx.moveTo(13*Math.cos(secAngle),13*Math.sin(secAngle));
    ctx.lineTo(150*Math.cos(secAngle),150*Math.sin(secAngle));
    ctx.stroke();
}
function secondMove(angle){//秒针当前位置函数
    ctx.beginPath();
    ctx.strokeStyle = "#DFDFDF";
    ctx.lineWidth = 3;
    ctx.moveTo(13*Math.cos(angle),13*Math.sin(angle));
    ctx.lineTo(150*Math.cos(angle),150*Math.sin(angle));
    ctx.stroke();
}
function minuteMove(angle){//分针当前位置函数
    ctx.beginPath();
    ctx.strokeStyle = "#2980B9";
    ctx.lineWidth = 4;
    ctx.moveTo(13*Math.cos(angle),13*Math.sin(angle));
    ctx.lineTo(120*Math.cos(angle),120*Math.sin(angle));
    ctx.stroke();
}
function hourMove(angle){//时针当前位置函数
    ctx.beginPath();
    ctx.strokeStyle = "#9B59B6";
    ctx.lineWidth = 5;
    ctx.moveTo(13*Math.cos(angle),13*Math.sin(angle));
    ctx.lineTo(80*Math.cos(angle),80*Math.sin(angle));
    ctx.stroke();
}
/*
* 难点分析
* 1.获得当前hms后如何转化为度数
* *s:60s转2PI，则当前秒转弧度为s*2*PI/60,因为画布是从PI/2开始画的，
* 所以减去s*2*PI/60-PI/2即为当前秒针的弧度
* *m:60m转2PI,则当前分转化为弧度为m*2*PI/60，再加上s转化的度数为:每60s转动1m的角度为2*PI/60
* 则s秒对应的分针度数为s*2*PI/60/60,则总的分针弧度为m*2*PI/60+s*2*PI/3600-PI/2
* *h:12h转2PI,则h转化为弧度为h*2*PI/12,再加m转化为度数：每60m转动1h的角度为2*PI/12;
* 则加上分针总的弧度为：h*2*PI/12+m*2*PI/12/60-PI/2,秒针忽略不计
* */
