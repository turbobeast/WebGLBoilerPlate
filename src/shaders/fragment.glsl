precision mediump float;
varying vec3 vColor;
varying vec2 v_Texcoord;
uniform sampler2D u_Sampler; 

void main () {
	

	gl_FragColor = texture2D(u_Sampler, v_Texcoord);
	//gl_PointSize = 2.0;
}
