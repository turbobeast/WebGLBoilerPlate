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

	/**
	 * creates a canvas element and appends it to the body
	 * @return {HTML Canvas Element}
	 */
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

		//gl.createBuffer() //create a buffer
		//gl.bindBuffer() //bind the buffer object to a target
		//gl.bufferData() //write data to the buffer
		//gl.vertexAttribPointer //assign buffer to an attribute
		//gl.enableVertexAttribArray //enable assignment
		
		var vertices,
	    buffer,
	    aPosition;

	    vertices = new Float32Array(verts);

	    buffer = gl.createBuffer();

	    //gl.ARRAY_BUFFER is for vertex data
  		//gl.ELEMENT_ARRAY_BUFFER is for index values that point to vertex data
	    gl.bindBuffer(gl.ARRAY_BUFFER, buffer); //bind the buffer object to a target
	    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); //write data to the buffer

	    aPosition = gl.getAttribLocation(gl.program, pointerName); //location of attribute (pointer) by name
	    gl.vertexAttribPointer(aPosition, dimensions, gl.FLOAT, false, 0, 0); //set the buffer object bound to ARRAY_BUFFER to the attribute
	    gl.enableVertexAttribArray(aPosition); //enable the previous assignment 

	    //return vertices; 
	};

	return utils;

}());

module.exports = GL_UTILS; 
},{}],5:[function(require,module,exports){
var Matrix4 = function (a1,a2,a3,a4,b1,b2,b3,b4,c1,c2,c3,c4,d1,d2,d3,d4) {

	var a1 = a1 || 1,
	a2 = a2 || 0,
	a3 = a3 || 0,
	a4 = a4 || 0,
	b1 = b1 || 0,
	b2 = b2 || 1,
	b3 = b3 || 0,
	b4 = b4 || 0,
	c1 = c1 || 0,
	c2 = c2 || 0,
	c3 = c3 || 1,
	c4 = c4 || 0,
	d1 = d1 || 0,
	d2 = d2 || 0,
	d3 = d3 || 0,
	d4 = d4 || 1;

		
	var mat = {
		matrixArray : new Float32Array([a1,a2,a3,a4,b1,b2,b3,b4,c1,c2,c3,c4,d1,d2,d3,d4])
	};

	mat.identity = function () {
		mat.matrixArray = new Float32Array([1,0,0,0,
											0,1,0,0,
											0,0,1,0,
											0,0,0,1]);

		return mat;//.matrixArray;
	};


	mat.multiplyVector = function (v) {

		var m = mat.matrixArray, vector, x, y, z, w;

		x = (m[0] * v[0])  + (m[1] * v[1])  + (m[2] * v[2])  + (m[3]);
		y = (m[4] * v[0])  + (m[5] * v[1])  + (m[6] * v[2])  + (m[7]);
		z = (m[8] * v[0])  + (m[9] * v[1])  + (m[10] * v[2]) + (m[11]);
		w = (m[12] * v[0]) + (m[13] * v[1]) + (m[14] * v[2]) + (m[15]);

		return new Float32Array([x,y,z,w]);

	};

	mat.zRotation = function (theta) {
		console.log('z rotation');
		var cos = Math.cos(theta),
		sin = Math.sin(theta);
		mat.matrixArray = new Float32Array([cos,-sin,0, 0,
											sin,cos, 0, 0,
											  0,  0, 1, 0,
											  0,  0, 0, 1]);

		return mat;//.matrixArray;
	};	

	mat.xRotation = function (theta) {
		var cos = Math.cos(theta),
		sin = Math.sin(theta);
		mat.matrixArray = new Float32Array([1,0,0,0,
											0,1,0,0,
											0,0,1,0,
											0,0,0,1]);

		return mat;//.matrixArray;
	};


	mat.yRotation = function (theta) {

		var cos = Math.cos(theta),
		sin = Math.sin(theta);
		mat.matrixArray = new Float32Array([1,0,0,0,
											0,1,0,0,
											0,0,1,0,
											0,0,0,1]);

		return mat;//.matrixArray;
	};

	mat.translation = function (tx,ty,tz) {
		mat.matrixArray = new Float32Array([1,0,0,0,
											0,1,0,0,
											0,0,1,0,
											tx,ty,tz,1]);

		return mat;//.matrixArray;
	};

	mat.scale = function (sx,sy,sz) {
		var sx = sx || 1,
		sy = sy || sx,
		sz = sz || sx; 

		mat.matrixArray = new Float32Array([sx,0,0,0,
											0,sy,0,0,
											0,0,sz,0,
											0,0,0,1]);

		return mat; 
	};

	mat.transpose = function () {

		var m = mat.matrixArray;
		mat.matrixArray = new Float32Array([m[0],m[4],m[8],m[12],
											m[1],m[5],m[9],m[13],
											m[2],m[6],m[10],m[14],
											m[3],m[7],m[11],m[15]
											]);

		return mat; 
		
	};



	return mat;

};

module.exports = Matrix4; 
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
var glslify = require("glslify"), ANIMATOR = require("./ANIMATOR"), RESIZOR = require("./RESIZOR"), UTILS = require("./GL_UTILS"), Matrix4 = require("./Matrix4"), shaders = require("glslify/simple-adapter.js")("\n#define GLSLIFY 1\n\nattribute vec4 aVertexPosition;\nuniform vec4 uTranslation;\nuniform mat4 uTransMatrix;\nuniform mat4 uRotation;\nvoid main() {\n  gl_Position = uRotation * uTransMatrix * aVertexPosition;\n}", "\n#define GLSLIFY 1\n\nprecision mediump float;\nvoid main() {\n  gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);\n}", [{"name":"uTranslation","type":"vec4"},{"name":"uTransMatrix","type":"mat4"},{"name":"uRotation","type":"mat4"}], [{"name":"aVertexPosition","type":"vec4"}]);

(function() {
    "use strict";
    var canvas = UTILS.getCanvas(), verts, gl;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl = UTILS.getContext(canvas);
    gl.program = UTILS.createProgram(gl, shaders.vertex, shaders.fragment);
    gl.useProgram(gl.program);
    var quad = [-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5];
    UTILS.initVertexBuffer(gl, quad, 2, "aVertexPosition");
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    var theta = Math.PI / 4;
    var rotationMatrix = Matrix4().zRotation(theta).transpose();
    var uRotation = gl.getUniformLocation(gl.program, "uRotation");
    gl.uniformMatrix4fv(uRotation, false, rotationMatrix.matrixArray);
    var transMatrix = Matrix4().translation(Math.random() - 0.5, Math.random() - 0.5, 0);
    var transMatrix = Matrix4().scale(Math.random() - 0.5, Math.random() - 0.5);
    var uTransMatrix = gl.getUniformLocation(gl.program, "uTransMatrix");
    gl.uniformMatrix4fv(uTransMatrix, false, transMatrix.matrixArray);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
})();
},{"./ANIMATOR":3,"./GL_UTILS":4,"./Matrix4":5,"./RESIZOR":6,"glslify":1,"glslify/simple-adapter.js":2}]},{},[7])