precision mediump float;
varying vec3 vColor;
float poop;
float goof;

void main () {
	

	poop = cos(gl_FragCoord.x );
	goof = sin(gl_FragCoord.y );
	gl_FragColor = vec4(vColor.x * poop, vColor.y * goof, vColor.z , 1.0);
	//gl_PointSize = 2.0;
}
