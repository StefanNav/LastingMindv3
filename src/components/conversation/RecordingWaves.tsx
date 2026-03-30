import { useRef, useEffect, useCallback } from 'react'

interface RecordingWavesProps {
  isPaused?: boolean
}

const LAYERS = [
  {
    baseHeight: 0.22,
    amplitude: 70,
    speed: 0.0006,
    frequency: 0.003,
    colorStop1: 'rgba(42,82,20,0.92)',
    colorStop2: 'rgba(74,122,16,0.5)',
    strokeAlpha: 0.08,
    offset: 0,
  },
  {
    baseHeight: 0.38,
    amplitude: 60,
    speed: 0.0009,
    frequency: 0.004,
    colorStop1: 'rgba(61,154,30,0.85)',
    colorStop2: 'rgba(92,155,70,0.4)',
    strokeAlpha: 0.12,
    offset: 100,
  },
  {
    baseHeight: 0.54,
    amplitude: 50,
    speed: 0.0014,
    frequency: 0.005,
    colorStop1: 'rgba(78,128,54,0.9)',
    colorStop2: 'rgba(106,168,50,0.3)',
    strokeAlpha: 0.16,
    offset: 250,
  },
]

export function RecordingWaves({ isPaused = false }: RecordingWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const timeRef = useRef(0)
  const rafRef = useRef<number>(0)

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const rect = container.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
  }, [])

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [resize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.width / dpr
      const h = canvas.height / dpr

      ctx.clearRect(0, 0, w, h)

      LAYERS.forEach((layer) => {
        ctx.beginPath()
        ctx.moveTo(0, h)

        for (let x = 0; x <= w; x += 4) {
          const wave1 = Math.sin(x * layer.frequency + timeRef.current * layer.speed + layer.offset)
          const wave2 = Math.sin(x * layer.frequency * 0.5 - timeRef.current * (layer.speed * 0.8) + layer.offset * 2)
          const combined = wave1 * 0.7 + wave2 * 0.3
          const y = h * layer.baseHeight + combined * layer.amplitude
          ctx.lineTo(x, y)
        }

        ctx.lineTo(w, h)
        ctx.closePath()

        const grad = ctx.createLinearGradient(0, h * layer.baseHeight - layer.amplitude, 0, h)
        grad.addColorStop(0, layer.colorStop1)
        grad.addColorStop(1, layer.colorStop2)
        ctx.fillStyle = grad
        ctx.fill()

        ctx.lineWidth = 1
        ctx.strokeStyle = `rgba(226,242,179,${layer.strokeAlpha})`
        ctx.stroke()
      })

      if (!isPaused) {
        timeRef.current += 16
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isPaused])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[55%] overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
        }}
      />
    </div>
  )
}
