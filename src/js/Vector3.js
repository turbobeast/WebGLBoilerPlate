var Vector3 = function (x,y,z) {
  var v3 = {
    x : x,
    y : y,
    z : z
  };

  v3.multiply = function (scalar) {
      return Vector3(v3.x * scalar, v3.y * scalar, v3.z * scalar );
  };

  v3.mag = function () {
    return Math.sqrt( v3.x * v3.x + v3.y * v3.y + v3.z * v3.z );
  };

  v3.normalize = function () {
    var mags  = v3.mag();

    v3.x /= mags;
    v3.y /= mags;
    v3.z /= mags;

  };

  v3.dot = function (vec) {
    return v3.x * vec.x + v3.y * vec.y + v3.z * vec.z;
  };

  v3.angle = function (vec) {
      return acos( v3.dot(vec) );
  };

  v3.projection = function (vec) {
      var scalar = ( v3.dot(vec) ) / ( vec.dot(vec) );

      return vec.multiply(scalar);
  };

  v3.subtract = function (vec) {
      return Vector3(v3.x - vec.x, v3.y - vec.y, v3.z - vec.z );
  };


  v3.crossProduct = function (vec) {
      return Vector3( v3.y * vec.z - v3.z * vec.y,
                      v3.z * vec.x - v3.x * vec.z,
                      v3.x * vec.y - v3.y * vec.x);
  };

  v3.add = function (vec) {
    return Vector3(v3.x + vec.x, v3.y + vec.y, v3.z + vec.z );
  }

  v3.perpendicular = function (vec) {
        return v3.projection(vec).subtract(v3);
  };

  v3.axisAngleRotation = function (axis, theta) {

    //not sure if this will work...

    //first i need the vector projected onto the axis
    var proj = v3.projection(axis);
    //next i need the vector perpendicular to the axis of rotation
    var perps = v3.subtract(proj);
    //then i need the orthagonal vector (cross products )
    var cross = axis.crossProduct(v3);
    //then i rotate the perp vector... this is the part i am not sure about
    var rotatedPerps = perps.multiply(1 - Math.cos(theta)).add( cross.mult(Math.sin(theta)) ); //yikes

    //finally (if any of this works) i need to add the rotated perp to the projected vector
    v3 = proj.add(rotatedPerps);

  };


  v3.multiplyByMatrix = function (mat3) {

        //return a new VECTOR3
        var valX = 0,
        valY = 0,
        valZ = 0;

        valX = (m[0][0] * v3[0]) + (m[0][1] * v3[1]) + (m[0][2] * v3[2]);
        valY = (m[1][0] * v3[0]) + (m[1][1] * v3[1]) + (m[1][2] * v3[2]);
        valZ = (m[2][0] * v3[0]) + (m[2][1] * v3[1]) + (m[2][2] * v3[2]);

        return Vector3(valX,valY,valZ);

  };

  return v3;
}

module.exports = Vector3; 