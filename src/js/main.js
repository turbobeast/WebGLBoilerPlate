var glslify = require('glslify'),
ANIMATOR = require('./ANIMATOR'),
RESIZOR = require('./RESIZOR'),
UTILS = require('./GL_UTILS'),
shaders = glslify({
  vertex : '../shaders/vertex.glsl',
  fragment : '../shaders/fragment.glsl',
  sourceOnly : true
});

(function () {
  'use strict';
  
  var canvas = UTILS.getCanvas(),
  gl; //= UTILS.getContext(canvas);

 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight; 

  gl = UTILS.getContext(canvas);
  gl.program = UTILS.createProgram(gl, shaders.vertex, shaders.fragment );

  gl.useProgram(gl.program);

  function initVertexBuffers () {
    var vertices,
    buffer,
    aPosition;

    vertices = new Float32Array([0.0, 0.5,
                                    -0.5, -0.5,
                                    0.5, -0.5]);

    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer); //bind the buffer object to a target
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); //write data to the buffer

    aPosition = gl.getAttribLocation(gl.program, 'aVertexPosition');
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(aPosition);

    return vertices; 
  }

  initVertexBuffers();

  gl.clearColor(0.0,0.0,0.0,1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);



  //gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  //gl.ARRAY_BUFFER is for vertex data
  //gl.ELEMENT_ARRAY_BUFFER is for index values that point to vertex data


  //gl.createBuffer() //create a buffer
  //gl.bindBuffer() //bind the buffer object to a target
  //gl.bufferData() //write data to the buffer
  //gl.vertexAttribPointer //assign buffer to an attribute
  //gl.enableVertexAttribArray //enable assignment



}());
