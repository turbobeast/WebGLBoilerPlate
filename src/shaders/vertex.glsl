attribute vec4 aVertexPosition;
uniform vec4 uTranslation;
uniform mat4 uTransMatrix;
uniform mat4 uRotation;
void main () {
  gl_Position = uRotation * uTransMatrix * aVertexPosition;// + uTranslation;
 
}
