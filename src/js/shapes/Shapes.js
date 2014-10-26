var quad = [-0.5,-0.5, 0.0,
            -0.5, 0.5, 0.0,
             0.5, -0.5, 0.0,
             0.5, 0.5, 0.0 ];

var quadTexCoord = [-0.5,-0.5, 0.0, 0.0, 1.0,
                    -0.5, 0.5, 0.0, 0.0, 0.0,
                     0.5, -0.5, 0.0, 1.0, 1.0,
                     0.5, 0.5, 0.0, 1.0, 0.0 ];

var triangle = [0.0,-0.5,0.0,
                0.5,0.5, 0.0,
                -0.5,0.5, 0.0];


var colors =[
[31/255,220/255,138/255],
[18/255,48/255,160/255],
[127/255,10/255,176/255],
[225/255,125/255,51/255]];


var sixTriangles = [
    0.75, 1.0, -4.0, 0.0, 0.0, 0.4,
    0.25, -1.0, -4.0, 0.0, 0.0, 0.4,
    1.25, -1.0, -4.0, 0.0, 0.4, 0.4,

    0.75, 1.0, -2.0, 1.0, 1.0, 0.4,
    0.25, -1.0, -2.0, 1.0, 1.0, 0.4,
    1.25, -1.0, -2.0, 1.0, 0.4, 0.4,
    //
    0.75, 1.0, 0.0, 0.4, 0.4, 1.0,
    0.25, -1.0, 0.0, 0.4, 0.4, 1.0,
    1.25, -1.0, 0.0, 1.0, 0.4, 0.4,


    -0.75, 1.0, -4.0, 0.4, 1.0, 0.4,
    -0.25, -1.0, -4.0, 0.4, 1.0, 0.4,
    -1.25, -1.0, -4.0, 1.0, 0.4, 0.4,

    -0.75, 1.0, -2.0, 1.0, 1.0, 0.4,
    -0.25, -1.0, -2.0, 1.0, 1.0, 0.4,
    -1.25, -1.0, -2.0, 1.0, 0.4, 0.4,

    -0.75, 1.0, 0.0, 0.4, 0.4, 1.0,
    -0.25, -1.0, 0.0, 0.4, 0.4, 1.0,
    -1.25, -1.0, 0.0, 1.0, 0.4, 0.4
];

var triangles = [];


for(var i = 0; i < 40; i += 1) {

  var zPos = i -40;

  var color = colors[Math.floor(Math.random() * colors.length)];

  triangles.push(0.75, 1.0, zPos, color[0], color[1], color[2]);
  triangles.push(0.25, -1.0, zPos, color[0], color[1], color[2]);
  triangles.push(1.25, -1.0, zPos, color[0], color[1], color[2]);

  var color2 = colors[Math.floor(Math.random() * colors.length)];

  triangles.push(-0.75, 1.0, zPos, color2[0], color2[1], color2[2]);
  triangles.push(-0.25, -1.0, zPos, color2[0], color2[1], color2[2]);
  triangles.push(-1.25, -1.0, zPos, color2[0], color2[1], color2[2]);


}



 // Create a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3
  var cubeVerticesColors = [
    // Vertex coordinates and color
     1.0,  1.0,  1.0,     1.0,  1.0,  1.0,  // v0 White
    -1.0,  1.0,  1.0,     1.0,  0.0,  1.0,  // v1 Magenta
    -1.0, -1.0,  1.0,     1.0,  0.0,  0.0,  // v2 Red
     1.0, -1.0,  1.0,     1.0,  1.0,  0.0,  // v3 Yellow
     1.0, -1.0, -1.0,     0.0,  1.0,  0.0,  // v4 Green
     1.0,  1.0, -1.0,     0.0,  1.0,  1.0,  // v5 Cyan
    -1.0,  1.0, -1.0,     0.0,  0.0,  1.0,  // v6 Blue
    -1.0, -1.0, -1.0,     0.0,  0.0,  0.0   // v7 Black
  ];

  // Indices of the vertices
  var cubeIndices = [
    0, 1, 2,   0, 2, 3,    // front
    0, 3, 4,   0, 4, 5,    // right
    0, 5, 6,   0, 6, 1,    // up
    1, 6, 7,   1, 7, 2,    // left
    7, 4, 3,   7, 3, 2,    // down
    4, 7, 6,   4, 6, 5     // back
 ];

module.exports = {
  quad : quad,
  quadTexCoord : quadTexCoord,
  triangle : triangle,
  triangles : triangles,
  sixTriangles: sixTriangles,
  cube : {
    vertices : cubeVerticesColors,
    indices : cubeIndices
  }
};
