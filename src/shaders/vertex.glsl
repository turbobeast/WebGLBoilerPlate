attribute vec4 aVertexPosition;
attribute vec3 aColor;
varying vec3 vColor;

uniform mat4 uMVPMatrix;


void main () {

	gl_Position = uMVPMatrix * aVertexPosition;
	vColor = aColor;

}
