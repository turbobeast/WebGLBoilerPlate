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