attribute vec4 aVertexPosition;
attribute vec3 aColor;
uniform mat4 uTransMatrix;
varying vec3 vColor;
void main () {

	gl_Position = uTransMatrix * aVertexPosition;// + uTranslation;

	vColor = aColor;
 
}
