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
                -0.5,0.5, 0.0]


module.exports = {
  quad : quad,
  quadTexCoord : quadTexCoord,
  triangle : triangle
};
