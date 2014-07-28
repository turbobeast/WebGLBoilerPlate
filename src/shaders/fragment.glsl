precision mediump float;
varying vec3 vColor;

uniform sampler2D u_Sampler; 
varying vec2 v_TexCoord;

void main () {
	

	gl_FragColor = texture2D(u_Sampler, v_TexCoord);
	//gl_PointSize = 2.0;
}
