const container = document.getElementById("container");

// 旋转光圈动画
var circleContext = null,
	circleBg = null,
	circleIcon = null;

var createCircle = function(){
	var canvas = document.createElement("canvas");
	canvas.id = "canvas-" + new Date().getTime();
	canvas.width = 41;
	canvas.height = 110;
	
	circleContext = canvas.getContext("2d");

	circleBg = new Image();
	circleBg.src = "assets/images/circle1.png";

	circleIcon = new Image();
	circleIcon.src = "assets/images/circle2.png";

	circleBg.onload = function(){
		drawCircle();
	}
	container.appendChild(canvas);
}
createCircle();

// 绘制光圈画布
var drawCircle = function(){
	
	// 清除像素
	circleContext.clearRect(0, 0, 41, 110);
		
	// 写入背景，并保存状态
	circleContext.drawImage(circleBg, 2, 6, 37, 96);
	circleContext.save();
	circleContext.translate(20.5, 20.5);

	// 旋转画布
	const time = new Date();
	circleContext.rotate(Math.PI / 3 * time.getSeconds() + Math.PI / 3000 * time.getMilliseconds());
	circleContext.translate(-20.5, -20.5);
	// 写入圆环
	circleContext.drawImage(circleIcon, 0, 0, 41, 41);
	
	circleContext.restore(); // 之前保存的路径状态

	requestAnimationFrame(drawCircle);
}

var cylinderContext = null,
	cylinderBg = null,
	cylinderLine1 = null,
	cylinderLine2 = null;

// 圆柱体动画
var createCylinder = function(){
	var canvas = document.createElement("canvas");
	canvas.id = "canvas-" + new Date().getTime();
	canvas.width = 33;
	canvas.height = 90;
	
	cylinderContext = canvas.getContext("2d");
	
	cylinderBg = new Image();
	cylinderBg.src = "assets/images/cylinder1.png";

	cylinderLine1 = new Image();
	cylinderLine1.src = "assets/images/cylinder2.png";

	cylinderLine2 = new Image();
	cylinderLine2.src = "assets/images/cylinder3.png";

	cylinderBg.onload = function(){
		drawCylinder();
	}
	container.appendChild(canvas);
}
createCylinder();


var startPoint = 50, // 线条初始位置
	alpha = 1 // 初始透明度

// 绘制圆柱体画布
function drawCylinder(){
	cylinderContext.clearRect(0, 0, 33, 90);

	alpha -= 0.01;
	startPoint--;
	if(startPoint == -50){
		startPoint = 50;
		alpha = 1;
	}
	// 写入背景，并保存状态
	cylinderContext.drawImage(cylinderBg, 0, 0);

	cylinderContext.save();
	cylinderContext.drawImage(cylinderLine1,10,startPoint);
	cylinderContext.drawImage(cylinderLine2,20,startPoint + 15);
	
	var imgData = cylinderContext.getImageData(10, startPoint, 3, 49);
	for (var i = 0, len = imgData.data.length; i < len; i += 4) {
		// 改变每个像素的透明度
		imgData.data[i + 3] = imgData.data[i + 3] * alpha;
	}
	// 将获取的图片数据放回去。
	cylinderContext.putImageData(imgData, 10, startPoint);
	cylinderContext.restore(); // 之前保存的路径状态

	requestAnimationFrame(drawCylinder);
}