import { useEffect, useRef } from 'react'
import { Mesh, Program, Renderer, Triangle, Vec2 } from 'ogl'

// 渲染结构沿用 React Bits DarkVeil，片元着色器改为 Stopmoke 的低对比烟雾。
// https://reactbits.dev/backgrounds/dark-veil
const vertex = `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragment = `
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 uResolution;
uniform float uTime;

float hash(vec2 point) {
  return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 point) {
  vec2 cell = floor(point);
  vec2 local = fract(point);
  vec2 blend = local * local * (3.0 - 2.0 * local);

  float a = hash(cell);
  float b = hash(cell + vec2(1.0, 0.0));
  float c = hash(cell + vec2(0.0, 1.0));
  float d = hash(cell + vec2(1.0, 1.0));

  return mix(mix(a, b, blend.x), mix(c, d, blend.x), blend.y);
}

float fbm(vec2 point) {
  float value = 0.0;
  float amplitude = 0.54;
  mat2 rotation = mat2(0.82, -0.57, 0.57, 0.82);

  for (int octave = 0; octave < 5; octave++) {
    value += amplitude * noise(point);
    point = rotation * point * 2.03 + 8.7;
    amplitude *= 0.5;
  }

  return value;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
  float time = uTime * 0.075;

  vec2 drift = vec2(time, -time * 0.34);
  float broad = fbm(vec2(uv.x * 1.15, uv.y * 1.45) + drift);
  float curl = fbm(vec2(uv.x * 2.25 - broad * 0.48, uv.y * 2.0 + broad * 0.3) - drift * 0.7);
  float strands = fbm(vec2(uv.x * 3.1 + curl * 0.62, uv.y * 2.45 - broad * 0.4) + drift * 0.36);

  float density = broad * 0.5 + curl * 0.34 + strands * 0.2;
  density += 0.055 * sin((uv.x + uv.y * 0.38) * 8.0 - time * 8.0);
  density = smoothstep(0.42, 0.82, density);

  float edgeFade = 1.0 - smoothstep(0.22, 1.42, length(uv * vec2(0.72, 0.94)));
  float lowerFade = smoothstep(-0.82, 0.28, uv.y);
  float alpha = density * edgeFade * mix(0.62, 1.0, lowerFade) * 0.72;

  vec3 charcoal = vec3(0.42, 0.40, 0.37);
  vec3 ember = vec3(0.54, 0.28, 0.16);
  float warmth = smoothstep(0.62, 0.92, density + uv.x * 0.08);
  vec3 color = mix(charcoal, ember, warmth * 0.34);

  gl_FragColor = vec4(color, alpha);
}
`

export default function SmokeVeil() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const contextAttributes = { alpha: true, premultipliedAlpha: false }
    const availableContext =
      canvas.getContext('webgl2', contextAttributes) ?? canvas.getContext('webgl', contextAttributes)
    if (!availableContext) return

    const renderer = new Renderer({
      alpha: true,
      canvas,
      dpr: Math.min(window.devicePixelRatio, 1.25),
      premultipliedAlpha: false,
      webgl: availableContext instanceof WebGL2RenderingContext ? 2 : 1,
    })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)

    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      uniforms: {
        uResolution: { value: new Vec2(1, 1) },
        uTime: { value: 0 },
      },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const start = performance.now()
    let frame = 0
    let inView = true
    let documentVisible = !document.hidden

    const resize = () => {
      const width = Math.max(parent.clientWidth, 1)
      const height = Math.max(parent.clientHeight, 1)
      renderer.setSize(width * 0.65, height * 0.65)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      program.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height)
      renderer.render({ scene: mesh })
    }

    const draw = (now: number) => {
      if (inView && documentVisible && !reduceMotion.matches) {
        program.uniforms.uTime.value = (now - start) / 1000
        renderer.render({ scene: mesh })
      }
      frame = requestAnimationFrame(draw)
    }

    const handleVisibility = () => {
      documentVisible = !document.hidden
    }
    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
    })

    resizeObserver.observe(parent)
    intersectionObserver.observe(parent)
    document.addEventListener('visibilitychange', handleVisibility)
    resize()
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
      mesh.geometry.remove()
      program.remove()
    }
  }, [])

  return <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
}
