attribute vec4 aVertexPosition;
attribute vec3 aColor;
uniform mat4 uTransMatrix;
varying vec3 vColor;

attribute vec2 a_TexCoord;
varying vec2 v_TexCoord; 
void main () {

	gl_Position = uTransMatrix * aVertexPosition;// + uTranslation;

	v_TexCoord = a_TexCoord;
	vColor = aColor;
 
}
