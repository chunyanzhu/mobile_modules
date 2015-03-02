
/* 移动端弹层
 * @param 	options.content(str)			窗体内容
 * @param 	[options.class(str)]			窗体class
 * @param 	[options.affect(str)]			弹层效果
 * @param	[options.time(num)]				窗体自动关闭时间,null为不自动关闭
 * @param	[options.closeCallback(fn)]		窗体自动关闭后的回调
-------------------------------------------------------------------------
   @affect: ['fade', 'scale', 'updown', 'downup']后两个暂未实现，可以自行到less文件写相对应的样式
 */


var $ = require('Zepto');

var params = {
	content: 'this is a test',
	class: '__default',
	affect: 'scale',
	time: null,
	closeCallback: null,
	pre: 'xfis-'
};

function Dialog(options){
	if(!(this instanceof Dialog)){
		return new Dialog(options);
	}
	this.opt = $.extend({}, params, options);
	this.init();
};
Dialog.prototype = {
	constructor: Dialog,
	tpl: __inline('dialog.tpl'),
	init: function(){
		var me = this;
		me.open();
		me.opt.time && setTimeout(function(){
			me.close();
		}, me.opt.time);
		//点击窗体以外的地方，关闭弹层
		me.opt.$html.on('click', function(){
			me.close();
		});
		me.opt.$dialog.on('click', function(e){
			e.stopPropagation();
		});
	},
	open: function(){
		var opt = this.opt,
			html = this.tpl({
				data: {
					class: opt.class,
					content: opt.content
				}
			}),
			$html = $(html);
		//添加动画
		opt.$html = $html;
		opt.$dialog = $html.find('.xfis-dialog');
		opt.$dialog.addClass(opt.pre + opt.affect);
		//重置高度
		opt.$html.height(Math.max($(window).height(), $(document).height(), $('body').height()));
		opt.$dialog.css('top', $('body').scrollTop() + $(window).height()*0.2 + 'px');
		$('body').append($html);
	},
	close: function(){
		var opt = this.opt;
		var me = this;
		opt.$html.css('background', 'rgba(0, 0, 0, 0)');
		opt.$dialog.addClass(opt.pre + opt.affect + '-close');
		setTimeout(function(){
			opt.$html.remove();
			opt.closeCallback && opt.closeCallback();
		}, 300);
	}
};

module.exports = Dialog;