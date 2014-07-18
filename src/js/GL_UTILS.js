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