import { useRef, useEffect, useCallback } from 'react'

interface RecordingWavesProps {
  isPaused?: boolean
}

const BAR_W = 3
const BAR_GAP = 2.5
const BAR_STEP = BAR_W + BAR_GAP
const MIN_H = 2
const MAX_AMP = 0.72
const TICK_MS = 85

function nextAmplitude(prev: number): number {
  const raw = Math.random()
  const smoothed = prev * 0.3 + raw * 0.7
  const spiked = Math.random() > 0.82 ? smoothed * 1.5 : smoothed
  return Math.max(0.04, Math.min(spiked, 1))
}

function fillRoundedBar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  if (h < 1) {
    ctx.fillRect(x, y, w, Math.max(h, 0.5))
    return
  }
  r = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.lineTo(x + w, y + h - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h)
  ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath()
  ctx.fill()
}

interface Bar {
  target: number
  current: number
}

export function RecordingWaves({ isPaused = false }: RecordingWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const barsRef = useRef<Bar[]>([])
  const lastTickRef = useRef(0)
  const prevAmpRef = useRef(0.25)

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

    const draw = (now: number) => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      const cy = h * 0.5
      const maxH = cy * MAX_AMP

      if (!isPaused && now - lastTickRef.current >= TICK_MS) {
        const amp = nextAmplitude(prevAmpRef.current)
        prevAmpRef.current = amp
        barsRef.current.push({ target: amp, current: 0 })
        lastTickRef.current = now
      }

      // Lerp all bars toward their targets for smooth animation
      for (const bar of barsRef.current) {
        bar.current += (bar.target - bar.current) * 0.22
      }

      ctx.clearRect(0, 0, w, h)

      const bars = barsRef.current
      const px = w * 0.52

      const maxVisible = Math.ceil(px / BAR_STEP) + 1
      const start = Math.max(0, bars.length - maxVisible)
      const visible = bars.slice(start)

      for (let i = 0; i < visible.length; i++) {
        const bi = visible.length - 1 - i
        const x = px - (i + 1) * BAR_STEP
        if (x < -BAR_W) break

        const barH = Math.max(MIN_H, visible[bi].current * maxH)

        let a = 0.78
        if (x < 28) a *= Math.max(0, x / 28)

        ctx.fillStyle = `rgba(212, 0, 22, ${a})`
        fillRoundedBar(ctx, x, cy - barH - 0.5, BAR_W, barH, BAR_W / 2)
        fillRoundedBar(ctx, x, cy + 0.5, BAR_W, barH, BAR_W / 2)
      }

      const lineTop = cy - maxH - 10
      const lineBot = cy + maxH + 10
      ctx.fillStyle = 'rgba(212, 0, 22, 0.45)'
      ctx.fillRect(px - 0.5, lineTop, 1.5, lineBot - lineTop)

      ctx.beginPath()
      ctx.arc(px + 0.25, lineTop - 4, 3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(212, 0, 22, 0.7)'
      ctx.fill()

      ctx.strokeStyle = 'rgba(212, 0, 22, 0.08)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(0, cy)
      ctx.lineTo(px - 6, cy)
      ctx.stroke()

      rafRef.current = requestAnimationFrame(draw)
    }

    lastTickRef.current = performance.now()
    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isPaused])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[32%] overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full"
      />
    </div>
  )
}
