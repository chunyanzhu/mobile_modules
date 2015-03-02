
/* 正/倒计时
 * @param 	[cfg.toatl(num)]				需要计时多少秒
 * @param 	[cfg.step(num)]					计时步长(单位是s)
 * @param 	[cfg.toward(num)]				正向(1)倒向(-1)
 * @param 	[cfg.callback(fn)]				计时结束后的回调
 * @param 	[cfg.intervalCallback(fn)]		每1s触发的回调
 */
'use strict';
var $ = require('Zepto');
var config = {
	total: 60,
	step: 1,
	toward: 1,
	callback: null,
	intervalCallback: null,
	//当前
	cur: 0
};

function Count(cfg){
	if(!(this instanceof Count)){
		return new Count(cfg);
	}
	this.opt = $.extend({}, config, cfg);
	this.init();
};
Count.prototype.init = function(){
	var opt = this.opt;
	//正向
	if(opt.toward > 0){
		opt.cur = 0;
	}
	//反向
	else{
		opt.cur = opt.total;
	}

	this.countdown();
};
Count.prototype.countdown = function(){
	var opt = this.opt;
	clearTimeout(opt.timer);
	(function auto(){
		opt.timer = setTimeout(function(){
			//正向
			if(opt.toward > 0){
				opt.cur += opt.step;
				if(opt.cur >= opt.total){
					opt.callback && opt.callback(opt.cur);
					return false;
				}
			}
			//反向
			else{
				opt.cur -= opt.step;
				if(opt.cur <= 0){
					opt.callback && opt.callback(opt.cur);
					return false;
				}
			}

			opt.intervalCallback && opt.intervalCallback(opt.cur);
			auto();

		}, 1000);
	})();
};
Count.prototype.stop = function(){
	clearTimeout(this.opt.timer);
};
Count.prototype.continue = function(){
	this.countdown();
};
Count.prototype.reset = function(){
	this.init();
};

if(typeof module === 'object' && module && typeof module.exports === 'object'){
	module.exports = Count;
}
else{
	window.countdown = Count;
}