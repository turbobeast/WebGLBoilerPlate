var glslify = require('glslify'),
ANIMATOR = require('./ANIMATOR'),
RESIZOR = require('./RESIZOR'),
UTILS = require('./GL_UTILS'),
Matrix4 = require('./CUON_Matrix4'),
DRAGR = require('./DRAG_ROTATE'),
KEY_HANDLER = require('./KEY_HANDLER'),
SHAPES = require('./shapes/Shapes'),
shaders = glslify({
  vertex : '../shaders/texture.vertex.glsl',
  fragment : '../shaders/texture.fragment.glsl',
  sourceOnly : true
});

(function () {
  'use strict';

  var canvas = UTILS.getCanvas(),
  verts,
  dragr = DRAGR(),
  ratio = 1,
  camAccel = 0,
  camVelocity = 0,
  camFriction = 0.94,
  gl;


  //must size the canvas before grabbing the context
  //its crazy but its true!
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ratio = (canvas.width / canvas.height);


  gl = UTILS.getContext(canvas);
  gl.program = UTILS.createProgram(gl, shaders.vertex, shaders.fragment );
  gl.useProgram(gl.program);





  var quad  = SHAPES.quadTexCoord;

  UTILS.initVertexBufferMultipleAttributes(gl, [{
    name : 'aVertexPosition',
    dimensions : 3,
    stride : 5,
    offset : 0
  },{
    name : 'a_TexCoord',
    dimensions : 2,
    stride : 5,
    offset : 3
  }], quad);

  UTILS.initTexture(gl, 4, 'u_Sampler', 'images/pris.png', 0, ANIMATOR.start );



  //gl.clearColor(1.0,1.0,0.16,1);
  gl.clearColor(255/255,187/255,43/255,1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  var theta = Math.PI / 4;
  var transMatrix = new Matrix4();
  var uTransMatrix = gl.getUniformLocation(gl.program, 'uTransMatrix');

    var eye = {
    x : 0.0,
    y : 0.0,
    z : 1.5
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

  viewMatrix.setLookAt(0, 0, 1,
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
  //projMatrix.setOrtho(ortho.left, ortho.right, ortho.bottom, ortho.top, ortho.near, ortho.far);


  projMatrix.setPerspective(40, ratio, 0.1, 1000 );

  KEY_HANDLER.on('up', function () {
    camAccel = 0.05;
  });

  KEY_HANDLER.off('up', function () {
   camAccel = 0;
  });

  KEY_HANDLER.on('down', function () {
    camAccel = -0.05;
  });

  KEY_HANDLER.off('down', function () {
    camAccel = 0;
  });

  function updateVelocity () {
    camVelocity += camAccel;
    camVelocity *= camFriction;
    eye.z += camVelocity;
  }


  ANIMATOR.onFrame(function () {

    updateVelocity();

    gl.clear(gl.COLOR_BUFFER_BIT);
    transMatrix = transMatrix.rotate(0.6,0.1,1.1,1.0);
    // viewMatrix.setLookAt(0, 0, 1,
    //                      0, 0, 0,
    //                      0, 1, 0);
    gl.uniformMatrix4fv(uProjMatrix, false, projMatrix.elements);
    gl.uniformMatrix4fv(uTransMatrix, false, transMatrix.elements);
    gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    //gl.drawArrays(gl.POINTS, 0, 4);
  });

   //ANIMATOR.start();


}());
