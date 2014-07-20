var Vector3 = require('./Vector3');

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
		//STUPID COLUMN MAJOR 
		matrixArray : new Float32Array([a1,b1,c1,d1,
										a2,b2,c2,d2,
										a3,b3,c3,d3,
										a4,b4,c4,d4])
	};

	/**
	 * creates and returns a new Matrix4 with same values
	 * have to do it like a transpose because values are passsed 
	 * in like row major then used like column MAJOR
	 * @return {Matrix4} the cloned Matrix
	 */
	mat.clone = function () {

		var m = mat.matrixArray;

		return Matrix4( m[0],m[4],m[8],m[12],
						m[1],m[5],m[9],m[13],
						m[2],m[6],m[10],m[14],
						m[3],m[7],m[11],m[15] );
	};

	/**
	 * multiplies one matrix by another
	 * @param  {Matrix4} matri the second matrix
	 * @return {Matrix4} this Matrix4
	 */
	mat.multiply = function (matri) {
		

		var m = mat.matrixArray,
		b = mat.clone().matrixArray;
		c = matri.matrixArray;



		m[0]  = b[0] * c[0]  + b[4] * c[1]  + b[8] * c[2]  + b[12] * c[3];
		m[4]  = b[0] * c[4]  + b[4] * c[5]  + b[8] * c[6]  + b[12] * c[7];
		m[8]  = b[0] * c[8]  + b[4] * c[9]  + b[8] * c[10] + b[12] * c[11];
		m[12] = b[0] * c[12] + b[4] * c[13] + b[8] * c[14] + b[12] * c[15];

		m[1]  = b[1] * c[0]  + b[5] * c[1]  + b[9] * c[2]  + b[13] * c[3];
		m[5]  = b[1] * c[4]  + b[5] * c[5]  + b[9] * c[6]  + b[13] * c[7];
		m[8]  = b[1] * c[8]  + b[5] * c[9]  + b[9] * c[10] + b[13] * c[11];
		m[13] = b[1] * c[12] + b[5] * c[13] + b[9] * c[14] + b[13] * c[15];

		m[2]  = b[2] * c[0]  + b[6] * c[1]  + b[10] * c[2]  + b[14] * c[3];
		m[6]  = b[2] * c[4]  + b[6] * c[5]  + b[10] * c[6]  + b[14] * c[7];
		m[10] = b[2] * c[8]  + b[6] * c[9]  + b[10] * c[10] + b[14] * c[11];
		m[14] = b[2] * c[12] + b[6] * c[13] + b[10] * c[14] + b[14] * c[15];

		m[3]  = b[3] * c[0]  + b[7] * c[1]  + b[11] * c[2]  + b[15] * c[3];
		m[7]  = b[3] * c[4]  + b[7] * c[5]  + b[11] * c[6]  + b[15] * c[7];
		m[11] = b[3] * c[8]  + b[7] * c[9]  + b[11] * c[10] + b[15] * c[11];
		m[15] = b[3] * c[12] + b[7] * c[13] + b[11] * c[14] + b[15] * c[15];

		return mat; 


	};

	/**
	 * sets matrix to identity matrix
	 * @return {Matrix4} this Matrix
	 */
	mat.identity = function () {
		mat.matrixArray = new Float32Array([1,0,0,0,
											0,1,0,0,
											0,0,1,0,
											0,0,0,1]);

		return mat;
	};


	/**
	 * takes in a 4 unit vector and multiplies it by thsi matrix
	 * @param  {Array} v the vector
	 * @return {Flaot32Array} the modified vector
	 */
	mat.multiplyVector = function (v) {

		var m = mat.matrixArray, vector, x, y, z, w;

		x = (m[0] * v[0])  + (m[1] * v[1])  + (m[2] * v[2])  + (m[3]);
		y = (m[4] * v[0])  + (m[5] * v[1])  + (m[6] * v[2])  + (m[7]);
		z = (m[8] * v[0])  + (m[9] * v[1])  + (m[10] * v[2]) + (m[11]);
		w = (m[12] * v[0]) + (m[13] * v[1]) + (m[14] * v[2]) + (m[15]);

		return new Float32Array([x,y,z,w]);

	};

	/**
	 * creates a z-roation matrix
	 * @param  {Number} theta the angle of rotation
	 * @return {Matrix4} this Matrix
	 */
	mat.zRotation = function (theta) {
		
		var cos = Math.cos(theta),
		sin = Math.sin(theta);
		mat.matrixArray = new Float32Array([cos,-sin,0, 0,
											sin,cos, 0, 0,
											  0,  0, 1, 0,
											  0,  0, 0, 1]);

		return mat;
	};	

	/**
	 * creates a x-rotation matrix
	 * @param  {Number} theta the angle of rotation in radians
	 * @return {Matrix4} this matrix
	 */
	mat.xRotation = function (theta) {
		var cos = Math.cos(theta),
		sin = Math.sin(theta);
		mat.matrixArray = new Float32Array([1,  0,   0,0,
											0,cos,-sin,0,
											0,sin, cos,0,
											0,  0,   0,1]);

		return mat;
	};

	
	/**
	 * creates a y-rotation matrix
	 * @param  {Number} theta the angle of rotation in radians
	 * @return {Matrix4} this Matrix
	 */
	mat.yRotation = function (theta) {

		var cos = Math.cos(theta),
		sin = Math.sin(theta);
		mat.matrixArray = new Float32Array([ cos,0,sin,0,
											   0,1,  0,0,
											-sin,0,cos,0,
											   0,0,  0,1]);

		return mat;
	};


	/**
	 * [axisAngleRotation description]
	 * @param  {[type]} axis  [description]
	 * @param  {[type]} theta [description]
	 * @return {[type]}       [description]
	 */
	mat.axisAngleRotation = function (axis,theta) {
		var cos = Math.cos(theta),
		sin = Math.sin(theta),
		m, nc, xy, yz, zx, xs, ys, zs;

		if(axis.mag() != 1) {
			axis.normalize();
		}

		nc = 1 - cos;
	    xy = axis.x * axis.y;
	    yz = axis.y * axis.z;
	    zx = axis.z * axis.x;
	    xs = axis.x * sin;
	    ys = axis.y * sin;
	    zs = axis.z * sin;


	    m = mat.matrixArray;

	    m[ 0] = axis.x*axis.x*nc + cos;
	    m[ 1] = xy *nc + zs;
	    m[ 2] = zx *nc - ys;
	    m[ 3] = 0;

	    m[ 4] = xy *nc - zs;
	    m[ 5] = axis.y*axis.y*nc + cos;
	    m[ 6] = yz *nc + xs;
	    m[ 7] = 0;

	    m[ 8] = zx *nc + ys;
	    m[ 9] = yz *nc - xs;
	    m[10] = axis.z*axis.z*nc + cos;
	    m[11] = 0;

	    m[12] = 0;
	    m[13] = 0;
	    m[14] = 0;
	    m[15] = 1;


	    return mat; 
	};

	/**
	 * creates new rotation matrix and mulitplies this matrix by it
	 * @param  {Number} theta the angle of rotation in radians
	 * @return {Matrix4} this Matrix
	 */
	mat.rotateX = function (theta) {
		var rMat = Matrix4().xRotation(theta);
		mat.multiply(rMat);
		return mat; 
	};

	/**
	 * creates new rotation matrix and mulitplies this matrix by it
	 * @param  {Number} theta the angle of rotation in radians
	 * @return {Matrix4} this Matrix
	 */
	mat.rotateY = function (theta) {
		var rMat = Matrix4().yRotation(theta);
		mat.multiply(rMat);
		return mat; 
	};

	/**
	 * creates new rotation matrix and mulitplies this matrix by it
	 * @param  {Number} theta the angle of rotation in radians
	 * @return {Matrix4} this Matrix
	 */
	mat.rotateZ = function (theta) {
		var rMat = Matrix4().zRotation(theta);
		mat.multiply(rMat);
		return mat; 
	};


	mat.translation = function (tx,ty,tz) {
		mat.matrixArray = new Float32Array([1,0,0,0,
											0,1,0,0,
											0,0,1,0,
											tx,ty,tz,1]);

		return mat;//.matrixArray;
	};

	mat.translate = function (tx,ty,tz) {

		var m = mat.matrixArray;

		m[12] = (m[0] * tx) + (m[4] * ty) + (m[8] * tz); 
		m[13] = (m[1] * tx) + (m[5] * ty) + (m[9] * tz);
		m[14] = (m[2] * tx) + (m[6] * ty) + (m[10] * tz);
		m[15] = (m[3] * tx) + (m[7] * ty) + (m[11] * tz);

		return mat;

	};

	mat.setScale = function (sx,sy,sz) {
		var sx = sx || 1,
		sy = sy || sx,
		sz = sz || sx; 

		mat.matrixArray = new Float32Array([sx,0,0,0,
											0,sy,0,0,
											0,0,sz,0,
											0,0,0,1]);

		return mat; 
	};

	mat.scale = function (sx,sy,sz) {

		var m = mat.matrixArray;

		m[0] *= sx;
		m[1] *= sx;
		m[2] *= sx;
		m[3] *= sx;

		m[4] *= sy;
		m[5] *= sy;
		m[6] *= sy;
		m[7] *= sy;

		m[8] *= sz;
		m[9] *= sz;
		m[10] *= sz;
		m[11] *= sz;

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