(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = noop

function noop() {
  throw new Error(
      'You should bundle your code ' +
      'using `glslify` as a transform.'
  )
}

},{}],2:[function(require,module,exports){
module.exports = programify

function programify(vertex, fragment, uniforms, attributes) {
  return {
    vertex: vertex, 
    fragment: fragment,
    uniforms: uniforms, 
    attributes: attributes
  };
}

},{}],3:[function(require,module,exports){
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

    	if(!started) {
    		started = true;
    		looper();
    	}
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
},{}],4:[function(require,module,exports){
var GL_UTILS = (function (){
	'use strict';
	var utils = {};

	utils.getCanvas = function () {

		var canvas = document.createElement('canvas'),
		container = document.getElementsByTagName('body')[0];

		container.appendChild(canvas);

		return canvas; 
	};

	utils.createProgram = function (gl, vShader, fShader) {
		var vertexShader,
		fragmentShader,
		program;

		vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, vShader);
		fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, fShader);


		program = gl.createProgram();

		gl.attachShader(program, vertexShader);
  		gl.attachShader(program, fragmentShader);

  		gl.linkProgram(program);

  		if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {

  			console.error(gl.getProgramInfoLog(program));
  			gl.deleteProgram(program);
  			gl.deleteShader(vertexShader);
  			gl.deleteShader(fragmentShader);

  			return null;
  		}

  		return program; 


	};

	utils.createShader = function (gl, type, src) {
		var shader = gl.createShader(type);

		if(shader === null) {
			console.error('unable to create shader');
			return null;
		}

		gl.shaderSource(shader, src);

		gl.compileShader(shader);

		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error(gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);

			return null;
		}

		return shader; 
	};

	utils.getContext = function (canvas) {
		var potentialContextNames = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"],
		context,
		i = 0;

		for (i = 0; i < potentialContextNames.length; ++i) {
			try {
				context = canvas.getContext(potentialContextNames[i]);
			} catch(e) {}
			if (context) {
				break;
			}
		}

		return context; 
	};

	utils.initVertexBuffer = function (gl, verts, dimensions, pointerName) {
		 var vertices,
	    buffer,
	    aPosition;

	    vertices = new Float32Array(verts);

	    buffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, buffer); //bind the buffer object to a target
	    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); //write data to the buffer

	    aPosition = gl.getAttribLocation(gl.program, pointerName);
	    gl.vertexAttribPointer(aPosition, dimensions, gl.FLOAT, false, 0, 0);

	    gl.enableVertexAttribArray(aPosition);

	    //return vertices; 
	};

	return utils;

}());

module.exports = GL_UTILS; 
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
var glslify = require("glslify"), ANIMATOR = require("./ANIMATOR"), RESIZOR = require("./RESIZOR"), UTILS = require("./GL_UTILS"), shaders = require("glslify/simple-adapter.js")("\n#define GLSLIFY 1\n\nattribute vec4 aVertexPosition;\nvoid main() {\n  gl_Position = aVertexPosition;\n  gl_PointSize = 2.0;\n}", "\n#define GLSLIFY 1\n\nprecision mediump float;\nvoid main() {\n  gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);\n}", [], [{"name":"aVertexPosition","type":"vec4"}]);

(function() {
    "use strict";
    var canvas = UTILS.getCanvas(), gl;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl = UTILS.getContext(canvas);
    gl.program = UTILS.createProgram(gl, shaders.vertex, shaders.fragment);
    gl.useProgram(gl.program);

    function initVertexBuffers() {
        var vertices, buffer, aPosition;
        vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);
        buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        aPosition = gl.getAttribLocation(gl.program, "aVertexPosition");
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aPosition);
        return vertices;
    }

    initVertexBuffers();
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
})();
},{"./ANIMATOR":3,"./GL_UTILS":4,"./RESIZOR":5,"glslify":1,"glslify/simple-adapter.js":2}]},{},[6])