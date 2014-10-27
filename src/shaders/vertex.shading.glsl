attribute vec4 aVertexPosition;
attribute vec3 aColor;
attribute vec4 aNormal;
varying vec3 vColor;

uniform mat4 uMVPMatrix;
uniform vec3 uLightColor;
uniform vec3 uLightDirection;



void main () {

	gl_Position = uMVPMatrix * aVertexPosition;

	vec3 normal = normalize(aNormal.xyz);
	float nDotL = max(dot(uLightDirection, normal), 0.0);
	vec3 diffuse = uLightColor * aColor.rbg * nDotL;
	vColor = diffuse;

}
