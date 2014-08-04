attribute vec4 aVertexPosition;
attribute vec3 aColor;
uniform mat4 uTransMatrix;
uniform mat4 uViewMatrix;
varying vec3 vColor;


void main () {

	gl_Position = uViewMatrix * uTransMatrix * aVertexPosition;// + uTranslation;
	vColor = aColor;
 
}
