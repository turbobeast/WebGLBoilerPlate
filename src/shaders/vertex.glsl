attribute vec4 aVertexPosition;

void main () {
  gl_Position = aVertexPosition;
  gl_PointSize = 2.0;
}
