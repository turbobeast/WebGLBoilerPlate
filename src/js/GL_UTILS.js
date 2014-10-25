var GL_UTILS = (function (){
	'use strict';
	var utils = {},
	textureUnits;

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

  		textureUnits = [gl.TEXTURE0, gl.TEXTURE1, gl.TEXTURE2, gl.TEXTURE3, gl.TEXTURE4, gl.TEXTURE5, gl.TEXTURE6, gl.TEXTURE7];

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

	utils.initVertexBuffer = function (gl, verts, dimensions, pointerName, stride, offset) {

		//gl.createBuffer() //create a buffer
		//gl.bindBuffer() //bind the buffer object to a target
		//gl.bufferData() //write data to the buffer
		//gl.vertexAttribPointer //assign buffer to an attribute
		//gl.enableVertexAttribArray //enable assignment

		var vertices,
	    buffer,
	    attribute;

	    vertices = new Float32Array(verts);

	    buffer = gl.createBuffer();

	    //gl.ARRAY_BUFFER is for vertex data
  		//gl.ELEMENT_ARRAY_BUFFER is for index values that point to vertex data
	    gl.bindBuffer(gl.ARRAY_BUFFER, buffer); //bind the buffer object to a target
	    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); //write data to the buffer

	    attribute = gl.getAttribLocation(gl.program, pointerName); //location of attribute (pointer) by name


	    /*
	    gl.vertexAttribPointer([attribute],
	    					   [dimensions],
	    					   [data type],
	    					   [normalize],
	    					   [stride], //how many bytes until a new set of vertices starts
	    					   [offset]); //offset where to count relevant data for this attribute
	     */
	    gl.vertexAttribPointer(attribute, dimensions, gl.FLOAT, false, 0, 0); //set the buffer object bound to ARRAY_BUFFER to the attribute
	    gl.enableVertexAttribArray(attribute); //enable the previous assignment


	};

	/**
	 * creates texture using gl context
	 * @param  {gl} gl          wenGL context
	 * @param  {n} n           the number of vertices texture is mapped to
	 * @param  {String} uniformName the name of the Sampler2D uniform in the frag shader
	 * @param  {String} srcPath     path to the image asset
	 * @return {null}
	 */
	utils.initTexture = function (gl, n, uniformName, srcPath, textureNum, onload) {

		var texture, u_Sampler, image;

		texture = gl.createTexture();

		if(!texture) {
			return console.error('failed to create texture');
		}

		u_Sampler = gl.getUniformLocation(gl.program, uniformName);
		image = new Image();

		image.onload = function () {
			if(typeof onload === 'function') {
				onload();
			}
			utils.loadTexture(gl,n,texture,u_Sampler, image, textureNum);
		};

		image.src = srcPath;

	};

	/**
	 * loads the texture into the gl context
	 * @param  {gl} gl webGL the context
	 * @param  {Number} n the number of vertices texture is mapped to
	 * @param  {WegGLTExture} texture  the texture generated from gl.createTexture
	 * @param  {u_Sampler} u_Sampler the location of sampler2D uniform in fragment shader
	 * @param  {HTMLImageElement} image  the image element
	 * @return {null}
	 */
	utils.loadTexture = function (gl, n, texture, u_Sampler, image, texNum) {

		//gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);//flip y axis
		gl.activeTexture(textureUnits[texNum]);
		gl.bindTexture(gl.TEXTURE_2D, texture);

		// set the texture parameters
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

		// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
		//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);

		// set the texture image
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

		//set the texture unit 0 to the sampler
		gl.uniform1i(u_Sampler, texNum);
	};

	/**
	 * initializes a vertex buffer,
	 * handles case where buffer data contains
	 * data for more than one attribute
	 * @param  {WebGLContext} gl the webgl context object
	 * @param  {Array} attribs an array of simple objects containing name, dimension, stride and offset keys
	 * @param  {Array} vertData the array of floats for the buffer data
	 * @return {null}
	 */
	utils.initVertexBufferMultipleAttributes = function (gl, attribs, vertData) {


		var FSIZE,
		vertices,
	    buffer,
	    attribInfo,
	    attribute,
	    i = 0;

	    vertices = new Float32Array(vertData);
	    FSIZE = vertices.BYTES_PER_ELEMENT;
	    buffer = gl.createBuffer();

	    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);


		var stride = 0;

		for(i = 0; i < attribs.length; i += 1) { stride += attribs[0].dimensions; }

		if(vertData.length % stride !== 0) {
			return console.error('wrong number of elements in vertex array');
		}

	    //connect this buffer data to shader attribute
	    for(i = 0; i < attribs.length; ++i) {

	    	attribInfo = attribs[i];
	    	attribute = gl.getAttribLocation(gl.program, attribInfo.name);
	    	gl.vertexAttribPointer(attribute, attribInfo.dimensions, gl.FLOAT, false, stride * FSIZE, attribInfo.offset * FSIZE);
	    	gl.enableVertexAttribArray(attribute);
	    }
	};

	return utils;

}());

module.exports = GL_UTILS;
