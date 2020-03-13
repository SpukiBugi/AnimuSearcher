export default `
void main() {
  // vec2 scale = vec2(1.0, 1.0);
  // gl_Position = vec4( scale * position.xy, 1.0, 1.0 );
  gl_Position = vec4( position, 1.0 );
}`