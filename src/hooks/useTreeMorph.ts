import { useRef, useCallback, useState, useEffect } from 'react'

// ---------------------------------------------------------------------------
// Canvas pixel-morph hook — sweeps upward like organic growth
// ---------------------------------------------------------------------------

const MORPH_MS = 5500
const FEATHER = 44
const GLOW_R = 14
const GLOW_G = 32

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t)
}

export interface UseTreeMorphOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  imagePaths: string[]
  width: number
  height: number
}

export function useTreeMorph({
  canvasRef,
  imagePaths,
  width,
  height,
}: UseTreeMorphOptions) {
  const stagePxRef = useRef<Uint8ClampedArray[]>([])
  const sharedRef = useRef<ImageData | null>(null)
  const waveRef = useRef<Float32Array | null>(null)
  const [currentStage, setCurrentStage] = useState(0)
  const [isMorphing, setIsMorphing] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const busyRef = useRef(false)
  const currentRef = useRef(0)
  const rafIdRef = useRef(0)
  const targetPxRef = useRef<Uint8ClampedArray | null>(null)
  const targetIdxRef = useRef(0)
  const onCompleteRef = useRef<(() => void) | null>(null)

  // Pre-compute the wave table for the organic wobbly edge
  useEffect(() => {
    const wave = new Float32Array(width)
    for (let x = 0; x < width; x++) {
      wave[x] =
        Math.sin(x * 0.062) * 5.5 +
        Math.sin(x * 0.138) * 3.0 +
        Math.sin(x * 0.031) * 2.5
    }
    waveRef.current = wave
  }, [width])

  // Load all images into pixel arrays
  useEffect(() => {
    let cancelled = false

    async function load() {
      const off = document.createElement('canvas')
      off.width = width
      off.height = height
      const oc = off.getContext('2d', { willReadFrequently: true })
      if (!oc) return

      const pixels: Uint8ClampedArray[] = []

      for (const src of imagePaths) {
        await new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => {
            oc.clearRect(0, 0, width, height)
            const sc = Math.min(width / img.width, height / img.height)
            const dw = img.width * sc
            const dh = img.height * sc
            // Anchor image to bottom-center
            oc.drawImage(
              img,
              (width - dw) / 2,
              height - dh,
              dw,
              dh,
            )
            pixels.push(
              new Uint8ClampedArray(oc.getImageData(0, 0, width, height).data),
            )
            resolve()
          }
          img.onerror = () => resolve() // skip broken images gracefully
          img.src = src
        })
      }

      if (cancelled) return
      stagePxRef.current = pixels
      sharedRef.current = new ImageData(width, height)

      // Draw initial stage
      const canvas = canvasRef.current
      if (canvas && pixels.length > 0) {
        const ctx = canvas.getContext('2d', { alpha: true })
        if (ctx) {
          const initData = new ImageData(
            new Uint8ClampedArray(pixels[0]),
            width,
            height,
          )
          ctx.clearRect(0, 0, width, height)
          ctx.putImageData(initData, 0, 0)
        }
      }

      setImagesLoaded(true)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [canvasRef, imagePaths, width, height])

  // Per-frame pixel blend
  const renderFrame = useCallback(
    (
      fromPx: Uint8ClampedArray,
      toPx: Uint8ClampedArray,
      revealPct: number,
    ) => {
      const shared = sharedRef.current
      const wave = waveRef.current
      if (!shared || !wave) return

      const buf = shared.data
      const CW = width
      const CH = height
      const revealY = CH * (1 - easeOutCubic(revealPct))

      for (let y = 0; y < CH; y++) {
        const row = y * CW * 4
        for (let x = 0; x < CW; x++) {
          const ry = revealY + wave[x]
          let t: number
          if (y > ry + FEATHER) {
            t = 1
          } else if (y < ry - FEATHER) {
            t = 0
          } else {
            t = smoothstep((y - (ry - FEATHER)) / (FEATHER * 2))
          }

          const i = row + x * 4
          let r = fromPx[i] + (toPx[i] - fromPx[i]) * t
          let g = fromPx[i + 1] + (toPx[i + 1] - fromPx[i + 1]) * t
          let b = fromPx[i + 2] + (toPx[i + 2] - fromPx[i + 2]) * t
          let a = fromPx[i + 3] + (toPx[i + 3] - fromPx[i + 3]) * t

          const dist = Math.abs(y - ry)
          if (dist < GLOW_R && a > 10) {
            const gv = (1 - dist / GLOW_R) * GLOW_G * (a / 255)
            r += gv * 0.2
            g += gv
            b += gv * 0.15
          }

          buf[i] = Math.max(0, Math.min(255, r))
          buf[i + 1] = Math.max(0, Math.min(255, g))
          buf[i + 2] = Math.max(0, Math.min(255, b))
          buf[i + 3] = Math.max(0, Math.min(255, a))
        }
      }

      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d', { alpha: true })
      if (!ctx) return
      ctx.clearRect(0, 0, CW, CH)
      ctx.putImageData(shared, 0, 0)
    },
    [canvasRef, width, height],
  )

  // Draw a single stage's pixels directly (no morph)
  const drawStage = useCallback(
    (idx: number) => {
      const pixels = stagePxRef.current
      if (idx < 0 || idx >= pixels.length) return
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d', { alpha: true })
      if (!ctx) return
      const data = new ImageData(new Uint8ClampedArray(pixels[idx]), width, height)
      ctx.clearRect(0, 0, width, height)
      ctx.putImageData(data, 0, 0)
    },
    [canvasRef, width, height],
  )

  const morphTo = useCallback(
    (nextIdx: number, onComplete?: () => void): boolean => {
      const pixels = stagePxRef.current
      if (nextIdx < 0 || nextIdx >= pixels.length) return false

      // If already animating, cancel current and jump to its target
      if (busyRef.current) {
        cancelAnimationFrame(rafIdRef.current)
        const skipToIdx = targetIdxRef.current
        currentRef.current = skipToIdx
        drawStage(skipToIdx)
        // Fire the interrupted morph's callback immediately
        onCompleteRef.current?.()
      }

      busyRef.current = true
      targetPxRef.current = pixels[nextIdx]
      targetIdxRef.current = nextIdx
      onCompleteRef.current = onComplete ?? null
      setIsMorphing(true)

      const from = pixels[currentRef.current]
      const to = pixels[nextIdx]
      const t0 = performance.now()

      function frame(now: number) {
        const p = Math.min((now - t0) / MORPH_MS, 1)
        renderFrame(from, to, p)
        if (p < 1) {
          rafIdRef.current = requestAnimationFrame(frame)
        } else {
          // Draw the final target directly to ensure 100% clean replacement
          drawStage(nextIdx)
          currentRef.current = nextIdx
          busyRef.current = false
          setCurrentStage(nextIdx)
          setIsMorphing(false)
          onCompleteRef.current?.()
          onCompleteRef.current = null
        }
      }

      rafIdRef.current = requestAnimationFrame(frame)
      setCurrentStage(nextIdx)
      return true
    },
    [renderFrame, drawStage],
  )

  return { morphTo, currentStage, isMorphing, imagesLoaded }
}
