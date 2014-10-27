var glslify = require('glslify'),
ANIMATOR = require('./ANIMATOR'),
RESIZOR = require('./RESIZOR'),
UTILS = require('./GL_UTILS'),
Matrix4 = require('./CUON_Matrix4'),
Matrix42 = require('./Matrix4'),
DRAGR = require('./DRAG_ROTATE'),
KEY_HANDLER = require('./KEY_HANDLER'),
SHAPES = require('./shapes/Shapes'),
shaders = glslify({
  vertex : '../shaders/vertex.shading.glsl',
  fragment : '../shaders/fragment.color.glsl',
  sourceOnly : true
});

(function () {
  'use strict';

  var canvas = UTILS.getCanvas(),
  verts,
  dragr = DRAGR(),
  ratio = 1,
  velocity = 0,
  accel = 0,
  friction = 0.97,
  gl;


  //must size the canvas before grabbing the context
  //its crazy but its true!
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ratio = (canvas.width / canvas.height);


  gl = UTILS.getContext(canvas);
  gl.program = UTILS.createProgram(gl, shaders.vertex, shaders.fragment );
  gl.useProgram(gl.program);



  var cube = SHAPES.cube;
  UTILS.initVertexBuffer(gl, cube.vertices, 3, 'aVertexPosition', 3, 0);
  UTILS.initVertexBuffer(gl, cube.colors, 3, 'aColor', 3, 0);
  UTILS.initVertexBuffer(gl, cube.normals, 3, 'aNormal', 3, 0);
  ///gl, verts, dimensions, pointerName, stride, offset
  UTILS.initIndexBuffer(gl, cube.indices);


  var uLightColor = gl.getUniformLocation(gl.program, 'uLightColor');
  gl.uniform3f(uLightColor, 1.0, 0.8, 0.8);
  var uLightDirection = gl.getUniformLocation(gl.program, 'uLightDirection');
  gl.uniform3fv(uLightDirection, [0.5, 3.0, 4.0]); 


  //gl.clearColor(1.0,1.0,0.16,1);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.POLYGON_OFFSET_FILL);
  gl.clearColor(20/255,19/255,43/255,1);
  gl.polygonOffset(1.0,1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  var theta = Math.PI / 4;

  var ortho = {
    left : -1.0,
    right : 1.0,
    bottom : -1.0,
    top : 1.0,
    near : -1.0,
    far : 1.0
  };


  var viewMatrix = new Matrix4();

  viewMatrix.setLookAt(0, 0, 5,
                       0, 0, -100,
                       0, 1, 0);

  var projMatrix = new Matrix4();
  var modelMatrix = new Matrix4();


  /**
   * setOrtho (LEFT, RIGHT, BOTTOM, TOP, NEAR, FAR);
   */

  projMatrix.setPerspective(40, ratio, 0.1, 1000 );


  var mvpMatrix = new Matrix4();
  mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);
  var uMVPMatrix = gl.getUniformLocation(gl.program, 'uMVPMatrix');
  gl.uniformMatrix4fv(uMVPMatrix, false, mvpMatrix.elements);




  var numIndices = cube.indices.length;


  ANIMATOR.onFrame(function () {

    modelMatrix = modelMatrix.rotate(0.6,0.1,1.1,1.0);
    mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);
    gl.uniformMatrix4fv(uMVPMatrix, false, mvpMatrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(triangles));
    gl.drawElements(gl.TRIANGLES, numIndices, gl.UNSIGNED_BYTE, 0);
  });

  ANIMATOR.start();


}());
