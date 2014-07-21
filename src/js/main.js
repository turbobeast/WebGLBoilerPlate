var glslify = require('glslify'),
ANIMATOR = require('./ANIMATOR'),
RESIZOR = require('./RESIZOR'),
UTILS = require('./GL_UTILS'),
Matrix4 = require('./CUON_Matrix4'),
shaders = glslify({
  vertex : '../shaders/vertex.glsl',
  fragment : '../shaders/fragment.glsl',
  sourceOnly : true
});

(function () {
  'use strict';

  var canvas = UTILS.getCanvas(),
  verts,
  gl;


  //must size the canvas before grabbing the context 
  //its crazy but its true! 
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight; 


  gl = UTILS.getContext(canvas);
  gl.program = UTILS.createProgram(gl, shaders.vertex, shaders.fragment );
  gl.useProgram(gl.program);



  var quad  = [-0.5,-0.5, 0.0, 42/255, 202/255, 151/255,
               -0.5, 0.5, 0.0, 210/255, 100/255, 170/255,
                0.5, -0.5, 0.0, 255/255, 186/255, 112/255,
                0.5, 0.5, 0.0, 112/255, 255/255, 226/255];
  // UTILS.initVertexBuffer(gl, quad, 3, 'aVertexPosition');

  // var sizes = [1.0,8.0,3.0,12.0];
  // UTILS.initVertexBuffer(gl, sizes, 1, 'aPointSize');
  // 
  UTILS.initVertexBufferMultipleAttributes(gl, [{
    name : 'aVertexPosition',
    dimensions : 3,
    stride : 6,
    offset : 0
  },{
    name : 'aColor',
    dimensions : 3,
    stride : 6,
    offset : 3
  }], quad);

  gl.clearColor(0.01,0.1,0.2,1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  var theta = Math.PI / 4;
  var transMatrix = new Matrix4();
  var uTransMatrix = gl.getUniformLocation(gl.program, 'uTransMatrix');
 // gl.uniformMatrix4fv(uTransMatrix, false, transMatrix.elements);

  //gl.drawArrays(gl.POINTS, 0, 4);

  ANIMATOR.onFrame(function () {
    gl.clear(gl.COLOR_BUFFER_BIT);
    transMatrix = transMatrix.rotate(0.6,0.1,0.1,1);
    gl.uniformMatrix4fv(uTransMatrix, false, transMatrix.elements);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    //gl.drawArrays(gl.POINTS, 0, 4);
  });


}());