var RESIZOR = (function () {
	'use strict';
	var sizor = {
		width : window.innerWidth,
		height : window.innerHeight
	},
	heavyDuty,
	relay,
	handlers = [],
	onciez = [],
	resizeTimer = null;

	var eventListener = (function(){
		if(typeof document.addEventListener === 'function') {
			return function (evName, cback) {
				this.addEventListener(evName, cback, false);
			};
		}
		if(typeof document.attachEvent === 'function') {
			return function (evName, cback) {
				this.attachEvent('on' + evName, eback);
			}
		}
		return function (evName, cback) {
			this['on' + evName] = cback;
		}
	}());

	heavyDuty = function () {
		resizeTimer = null;

		var i = 0,
		width = window.innerWidth,
		height = window.innerHeight;

		sizor.width = width;
		sizor.height = height;

		for(i = 0; i < handlers.length; i += 1) {
			handlers[i](width, height);
		}

		for(i = 0; i < onciez.length; i += 1) {
			onciez[i](width, height);
		}

		onciez = [];
	};

	relay = function (e) {

		if(e) { e.preventDefault(); }
		if(resizeTimer !== null) {
			clearTimeout(resizeTimer);
		}
		resizeTimer = setTimeout(heavyDuty, 200);
	};

	sizor.onResize = function (funk) {
		if(typeof funk === 'function') {
			handlers.push(funk);
		}
	};

	sizor.once = function (funk) {
		if(typeof funk === 'function') {
			onciez.push(funk);
		}
	};

	// sizor.init = function () {
	// 	heavyDuty();

	eventListener.apply(window, ['resize', relay]);

	//};

	return sizor;

}());

module.exports = RESIZOR;