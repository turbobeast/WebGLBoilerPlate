attribute vec4 aVertexPosition;
attribute vec3 aColor;
uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjMatrix;
varying vec3 vColor;

uniform mat4 uMVPMatrix;


void main () {

	gl_Position = uMVPMatrix * aVertexPosition;
	vColor = aColor;

}
