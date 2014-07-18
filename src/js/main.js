var glslify = require('glslify'),
ANIMATOR = require('./ANIMATOR'),
RESIZOR = require('./RESIZOR'),
UTILS = require('./GL_UTILS'),
Matrix4 = require('./Matrix4'),
shaders = glslify({
  vertex : '../shaders/vertex.glsl',
  fragment : '../shaders/fragment.glsl',
  sourceOnly : true
});

(function () {
  'use strict';
  
  var canvas = UTILS.getCanvas(),
  verts,
  gl; //= UTILS.getContext(canvas);


  //must size the canvas before grabbing the context 
  //its crazy but its true! 
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight; 


  gl = UTILS.getContext(canvas);
  gl.program = UTILS.createProgram(gl, shaders.vertex, shaders.fragment );
  gl.useProgram(gl.program);




  // verts = [0.0, 0.5,
  //         -0.5, -0.5,
  //         0.5, -0.5];

  var quad  = [-0.5,-0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5];
  UTILS.initVertexBuffer(gl, quad, 2, 'aVertexPosition');

  gl.clearColor(0.0,0.0,0.0,1);
  gl.clear(gl.COLOR_BUFFER_BIT);


  // var uTranslation = gl.getUniformLocation(gl.program, 'uTranslation');
  // gl.uniform4f(uTranslation, Math.random() -0.5, Math.random() -0.5, Math.random() -0.5, 0.0);

  var theta = Math.PI / 4;

  // var cos = Math.cos(theta);
  // var sin = Math.sin(theta);

  // var rotationMatrix = new Float32Array([cos,sin,0,0,
  //                                       -sin, cos, 0,0,
  //                                       0,0,1,0,
  //                                       0,0,0,1]);

  var rotationMatrix = Matrix4().zRotation(theta).transpose();


  var uRotation = gl.getUniformLocation(gl.program, 'uRotation');
  gl.uniformMatrix4fv(uRotation, false, rotationMatrix.matrixArray);


 var transMatrix = Matrix4().translation(Math.random() -0.5,Math.random() -0.5,0);

 var transMatrix = Matrix4().scale(Math.random() -0.5,Math.random() -0.5);

  var uTransMatrix = gl.getUniformLocation(gl.program, 'uTransMatrix');
  gl.uniformMatrix4fv(uTransMatrix, false, transMatrix.matrixArray);


 // canvas.width = window.innerWidth;
  //canvas.height = window.innerHeight; 
  //gl.drawArrays(gl.LINE_LOOP, 0, 4);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  // ANIMATOR.onFrame(function () {
  //   console.log('hey');
  //   return;
  //   theta += 0.1;
  //   var cos = Math.cos(theta);
  //   var sin = Math.sin(theta);

  //   // var rotationMatrix = new Float32Array([cos,sin,0,0,
  //   //                                       -sin, cos, 0,0,
  //   //                                       0,0,1,0,
  //   //                                       0,0,0,1]);
  //   // });
  //   // 
  //   var rotationMatrix = new Matrix4().zRotation(theta);

  //   gl.uniformMatrix4fv(uRotation, false, rotationMatrix);
  //   gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);


}());
