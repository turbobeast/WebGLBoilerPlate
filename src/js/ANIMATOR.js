var ANIMATOR = (function () {

	var animObj = {},
	listeners = [],
	started = false,
	animFrame = (function(){
          return  window.requestAnimationFrame       ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame    ||
                  window.oRequestAnimationFrame      ||
                  window.msRequestAnimationFrame     ||
                  function(/* function */ callback/*,  DOMElement  element */){
                    window.setTimeout(callback, 1000 / 60);
                  };
    }());


  animObj.onFrame = function (funk) {
    	if(typeof funk === 'function') {
    		listeners.push(funk);
    	}
 	};

  animObj.start = function () {
    looper();
  };


 	looper = function () {
 		for(var i = 0; i < listeners.length; i += 1) {
 			listeners[i]();
 		}

 		animFrame(looper);
 	};

    return animObj;

}());

module.exports = ANIMATOR;