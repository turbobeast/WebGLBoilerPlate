var glslify = require('glslify'),
ANIMATOR = require('./ANIMATOR'),
RESIZOR = require('./RESIZOR'),
UTILS = require('./GL_UTILS'),
Matrix4 = require('./CUON_Matrix4'),
DRAGR = require('./DRAG_ROTATE'),
KEY_HANDLER = require('./KEY_HANDLER'),
SHAPES = require('./shapes/Shapes'),
shaders = glslify({
  vertex : '../shaders/vertex.glsl',
  fragment : '../shaders/fragment.color.glsl',
  sourceOnly : true
});

(function () {
  'use strict';

  var canvas = UTILS.getCanvas(),
  verts,
  dragr = DRAGR(),
  ratio = 1,
  gl;


  //must size the canvas before grabbing the context
  //its crazy but its true!
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ratio = (canvas.width / canvas.height);


  gl = UTILS.getContext(canvas);
  gl.program = UTILS.createProgram(gl, shaders.vertex, shaders.fragment );
  gl.useProgram(gl.program);



  var triangles = SHAPES.triangles;

  UTILS.initVertexBufferMultipleAttributes(gl, [{
    name : 'aVertexPosition',
    dimensions: 3,
    offset: 0
  },{
    name : 'aColor',
    dimensions : 3,
    offset : 3
  }], triangles);



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

  viewMatrix.setLookAt(0, 0, 5,
                       0, 0, -100,
                       0, 1, 0);

  var uViewMatrix = gl.getUniformLocation(gl.program, 'uViewMatrix');
  gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements);

  var projMatrix = new Matrix4();
  var uProjMatrix = gl.getUniformLocation(gl.program, 'uProjMatrix');
  gl.uniformMatrix4fv(uProjMatrix, false, projMatrix.elements);

  /**
   * setOrtho (LEFT, RIGHT, BOTTOM, TOP, NEAR, FAR);
   */

  projMatrix.setPerspective(40, ratio, 0.1, 1000 );



  gl.uniformMatrix4fv(uProjMatrix, false, projMatrix.elements);
  gl.uniformMatrix4fv(uTransMatrix, false, transMatrix.elements);
  gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements);

  console.log(triangles.length / 6);


  ANIMATOR.onFrame(function () {
    for(var i = 0; i < triangles.length; i += 6) {

      var zPos = triangles[i+2];
      if(zPos > 10) {
        zPos = -20;
      }
      zPos += 0.1;
      triangles[i +2 ] = zPos;
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(triangles));
    gl.drawArrays(gl.TRIANGLES, 0, 1440/ 6);
  });

  ANIMATOR.start();


}());
