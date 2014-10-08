attribute vec4 aVertexPosition;

uniform mat4 uTransMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjMatrix;


attribute vec2 a_TexCoord;
varying vec2 v_TexCoord;



void main () {

	gl_Position = uProjMatrix * uViewMatrix * uTransMatrix * aVertexPosition;// + uTranslation;

	v_TexCoord = a_TexCoord;
 
}
