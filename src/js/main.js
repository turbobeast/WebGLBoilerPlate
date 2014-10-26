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
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.POLYGON_OFFSET_FILL);
  gl.clearColor(200/255,197/255,43/255,1);
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

  KEY_HANDLER.on('up', function () {
    accel = 0.05;
  });

  KEY_HANDLER.off('up', function (){
    accel = 0;
  });

  KEY_HANDLER.off('down', function () {
    accel = 0;
  })

  KEY_HANDLER.on('down', function () {
    accel = -0.05;
  });

  function updateVelocity () {
    velocity += accel;
    velocity *= friction;
  }


  var modelZRotation = 0;


  var spinMat = Matrix42();
  var numVerts = 1440/6;

  ANIMATOR.onFrame(function () {
    // modelZRotation += 0.1;
    // modelMatrix.setRotate(modelZRotation, 0,0,1);
    // mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);
    // gl.uniformMatrix4fv(uMVPMatrix, false, mvpMatrix.elements);
    updateVelocity();



    for(var i = 0; i < triangles.length; i += 6) {


      var zPos = triangles[i+2];
      if(zPos > 10) zPos = -20;// wrap on the near plane
      if(zPos < -20) zPos = 10;// wrap on the far plane
      zPos += velocity;


      triangles[i +2 ] = zPos;
    }
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(triangles));
    gl.drawArrays(gl.TRIANGLES, 0, numVerts);
  });

  ANIMATOR.start();


}());
