attribute vec4 aVertexPosition;
attribute vec3 aColor;
uniform mat4 uTransMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjMatrix;
varying vec3 vColor;


void main () {

	gl_Position = uProjMatrix * uViewMatrix * uTransMatrix * aVertexPosition;// + uTranslation;
	vColor = aColor;
 
}
