attribute vec4 aVertexPosition;
uniform vec4 uTranslation;
uniform mat4 uTransMatrix;
uniform mat4 uRotation;
varying float barf;
void main () {
  gl_Position = uTransMatrix * aVertexPosition;// + uTranslation;

  barf = aVertexPosition.y;//cos(aVertexPosition.x);
 
}
