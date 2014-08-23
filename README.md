#lib.motion

## 最新版本

**1.0.4**

## 安装依赖

运行 `npm install`，来安装所需的依赖模块。关于NPM的知识，请参见[nodejs](http://nodejs.org/);

## 用Grunt打包

运行 `grunt`，来对项目进行打包。关于Grunt的知识，请参见[gruntjs](http://gruntjs.com/);

## 如何使用

	var motion = new lib.motion({
		v: 100, //初速度
		a: 5,	//加速度
		t: 10,	//时间，和距离参数二选一
		s: 1000, //举例，和时间参数二选一
	});

	motion.generateCubicBezier() //生成贝塞尔曲线