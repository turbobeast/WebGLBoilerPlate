var glslify = require('glslify'),
ANIMATOR = require('./ANIMATOR'),
RESIZOR = require('./RESIZOR'),
UTILS = require('./GL_UTILS'),
Matrix4 = require('./CUON_Matrix4'),
DRAGR = require('./DRAG_ROTATE'),
KEY_HANDLER = require('./KEY_HANDLER'),
shaders = glslify({
  vertex : '../shaders/vertex.glsl',
  fragment : '../shaders/fragment.glsl',
  sourceOnly : true
});

(function () {
  'use strict';

  var canvas = UTILS.getCanvas(),
  verts,
  dragr = DRAGR(),
  gl;


  //must size the canvas before grabbing the context 
  //its crazy but its true! 
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight; 


  gl = UTILS.getContext(canvas);
  gl.program = UTILS.createProgram(gl, shaders.vertex, shaders.fragment );
  gl.useProgram(gl.program);



  var quad  = [
                //first square
               0.0, 0.5, -0.4, 55/255, 184/255, 132/255,
               -0.5, -0.5, -0.4, 61/255, 208/255, 184/255, 
                0.5, -0.5, -0.4, 61/255, 149/255, 208/255,
              //  0.5, 0.5, -0.4, 61/255, 208/255, 97/255,
                //second square
                0.0, 0.5, 0.0, 208/255, 61/255, 142/255,
                -0.5, -0.5, 0.0, 112/255, 26/255, 95/255, 
                0.5, -0.5, 0.0, 172/255, 12/255, 74/255
              //  0.5, 0.5, 0.0, 233/255, 94/255, 228/255
               ];


  
       
  //UTILS.initVertexBuffer(gl, quad, 3, 'aVertexPosition');

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



  gl.clearColor(0.01,0.07,0.16,1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  var theta = Math.PI / 4;
  var transMatrix = new Matrix4();
  var uTransMatrix = gl.getUniformLocation(gl.program, 'uTransMatrix');

    var eye = {
    x : 0.20,
    y : 0.25,
    z : 0.25
  };

  var ortho = {
    left : -1.0,
    right : 1.0,
    bottom : -1.0,
    top : 1.0,
    near : -1.0,
    far : 1.0
  };


  var viewMatrix = new Matrix4();
  viewMatrix.setLookAt(eye.x, eye.y, eye.z,
                          0, 0, 0,
                          0, 1, 0);

  var uViewMatrix = gl.getUniformLocation(gl.program, 'uViewMatrix');
  gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements);

  var projMatrix = new Matrix4();
  var uProjMatrix = gl.getUniformLocation(gl.program, 'uProjMatrix');
  gl.uniformMatrix4fv(uProjMatrix, false, projMatrix.elements);

  /**
   * setOrtho (LEFT, RIGHT, BOTTOM, TOP, NEAR, FAR);
   */
  projMatrix.setOrtho(ortho.left, ortho.right, ortho.bottom, ortho.top, ortho.near, ortho.far);

  dragr.addRotationObject(eye);
  dragr.init();

  KEY_HANDLER.on('up', function () {
    ortho.far += 0.01;
  });

  KEY_HANDLER.on('down', function () {
    ortho.near -= 0.01;
  });


  ANIMATOR.onFrame(function () {
    gl.clear(gl.COLOR_BUFFER_BIT);
  //transMatrix = transMatrix.rotate(0.6,0.1,1.1,1.0);
    viewMatrix.setLookAt(eye.x, eye.y, eye.z,
                          0, 0, 0,
                          0, 1, 0);
   // gl.uniformMatrix4fv(uProjMatrix, false, projMatrix.elements);
    projMatrix.setOrtho(ortho.left, ortho.right, ortho.bottom, ortho.top, ortho.near, ortho.far);
    gl.uniformMatrix4fv(uProjMatrix, false, projMatrix.elements);
    gl.uniformMatrix4fv(uTransMatrix, false, transMatrix.elements);
    gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    //gl.drawArrays(gl.POINTS, 0, 4);
  });

   ANIMATOR.start();


}());