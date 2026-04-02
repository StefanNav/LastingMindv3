import { useRef, useEffect, useCallback, forwardRef } from 'react'

// ---------------------------------------------------------------------------
// ShimmerInput — input with a traveling green shimmer on border + placeholder
// ---------------------------------------------------------------------------

const SHIMMER_GREEN = '#32751e'
const SHIMMER_GREEN_GLOW = 'rgba(50, 117, 30, 0.45)'
const DEFAULT_PLACEHOLDER_COLOR = '#7b7b7b'
const SWEEP_DURATION_MS = 2500
const PAUSE_DURATION_MS = 2000
const SHIMMER_WIDTH = 0.28 // fraction of total width that the highlight covers
const BORDER_THICKNESS = 1.5 // px

interface ShimmerInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  shimmer?: boolean
}

export const ShimmerInput = forwardRef<HTMLInputElement, ShimmerInputProps>(
  function ShimmerInput({ shimmer = false, value, placeholder, className, ...rest }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const borderRef = useRef<HTMLDivElement>(null)
    const rafRef = useRef<number>(0)
    const startRef = useRef<number>(0)
    const pauseStartRef = useRef<number>(0)
    const phaseRef = useRef<'sweep' | 'pause'>('sweep')

    // Measure character span positions once and cache them
    const charPositionsRef = useRef<{ center: number }[]>([])

    const measureChars = useCallback(() => {
      const overlay = overlayRef.current
      if (!overlay) return
      const spans = overlay.querySelectorAll<HTMLSpanElement>('[data-char]')
      const containerWidth = overlay.offsetWidth
      if (containerWidth === 0) return
      const positions: { center: number }[] = []
      spans.forEach((span) => {
        const left = span.offsetLeft
        const width = span.offsetWidth
        positions.push({ center: (left + width / 2) / containerWidth })
      })
      charPositionsRef.current = positions
    }, [])

    // Animation loop
    const animate = useCallback((timestamp: number) => {
      if (phaseRef.current === 'pause') {
        if (timestamp - pauseStartRef.current >= PAUSE_DURATION_MS) {
          phaseRef.current = 'sweep'
          startRef.current = timestamp
        } else {
          rafRef.current = requestAnimationFrame(animate)
          return
        }
      }

      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / SWEEP_DURATION_MS, 1)

      // --- Update border overlay ---
      const borderEl = borderRef.current
      if (borderEl) {
        const pos = -0.1 + progress * 1.2
        const gradientPos = pos * 100
        const halfW = (SHIMMER_WIDTH * 100) / 2
        borderEl.style.opacity = '1'
        borderEl.style.background = `linear-gradient(90deg,
          transparent ${gradientPos - halfW}%,
          ${SHIMMER_GREEN_GLOW} ${gradientPos - halfW * 0.3}%,
          ${SHIMMER_GREEN} ${gradientPos}%,
          ${SHIMMER_GREEN_GLOW} ${gradientPos + halfW * 0.3}%,
          transparent ${gradientPos + halfW}%
        )`
      }

      // --- Update placeholder characters ---
      const overlay = overlayRef.current
      if (overlay) {
        const spans = overlay.querySelectorAll<HTMLSpanElement>('[data-char]')
        const positions = charPositionsRef.current

        spans.forEach((span, i) => {
          const charCenter = positions[i]?.center ?? i / spans.length
          const dist = Math.abs(progress - charCenter)
          const halfWindow = SHIMMER_WIDTH / 2
          if (dist < halfWindow) {
            const intensity = 1 - dist / halfWindow
            span.style.color = lerpColor(
              DEFAULT_PLACEHOLDER_COLOR,
              SHIMMER_GREEN,
              intensity,
            )
          } else {
            span.style.color = DEFAULT_PLACEHOLDER_COLOR
          }
        })
      }

      if (progress >= 1) {
        // Reset chars to default
        overlayRef.current
          ?.querySelectorAll<HTMLSpanElement>('[data-char]')
          .forEach((s) => (s.style.color = DEFAULT_PLACEHOLDER_COLOR))
        if (borderEl) borderEl.style.opacity = '0'
        phaseRef.current = 'pause'
        pauseStartRef.current = timestamp
      }

      rafRef.current = requestAnimationFrame(animate)
    }, [])

    // Start / stop animation based on shimmer prop
    useEffect(() => {
      if (shimmer && !value) {
        measureChars()
        phaseRef.current = 'sweep'
        startRef.current = performance.now()
        rafRef.current = requestAnimationFrame(animate)
      } else {
        cancelAnimationFrame(rafRef.current)
        overlayRef.current
          ?.querySelectorAll<HTMLSpanElement>('[data-char]')
          .forEach((s) => (s.style.color = DEFAULT_PLACEHOLDER_COLOR))
        if (borderRef.current) borderRef.current.style.opacity = '0'
      }
      return () => cancelAnimationFrame(rafRef.current)
    }, [shimmer, value, animate, measureChars])

    // Re-measure on resize
    useEffect(() => {
      if (!shimmer) return
      const ro = new ResizeObserver(() => measureChars())
      const el = overlayRef.current
      if (el) ro.observe(el)
      return () => ro.disconnect()
    }, [shimmer, measureChars])

    const isShimmerActive = shimmer && !value
    const showCharOverlay = isShimmerActive && placeholder

    return (
      <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
        {/* Border shimmer — single overlay masked to only show the border ring */}
        <div
          ref={borderRef}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '0.5rem',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            zIndex: 4,
            // Mask: full rectangle minus an inset rectangle = border ring only
            WebkitMaskImage:
              'linear-gradient(#000 0 0), linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            WebkitMaskSize: `100% 100%, calc(100% - ${BORDER_THICKNESS * 2}px) calc(100% - ${BORDER_THICKNESS * 2}px)`,
            WebkitMaskPosition: `0 0, ${BORDER_THICKNESS}px ${BORDER_THICKNESS}px`,
            WebkitMaskRepeat: 'no-repeat',
          }}
        />

        {/* Real input — always full width */}
        <input
          ref={ref}
          type="text"
          value={value}
          placeholder={isShimmerActive ? '' : placeholder}
          className={className}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            ...(isShimmerActive ? { background: 'transparent' } : {}),
          }}
          {...rest}
        />

        {/* Character-by-character placeholder overlay */}
        {showCharOverlay && (
          <div
            ref={overlayRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              paddingLeft: '0.75rem',
              paddingRight: '0.75rem',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            {placeholder.split('').map((char, i) => (
              <span
                key={i}
                data-char=""
                style={{
                  fontFamily: 'inherit',
                  fontSize: '15px',
                  color: DEFAULT_PLACEHOLDER_COLOR,
                  transition: 'color 0.08s ease',
                  whiteSpace: 'pre',
                }}
              >
                {char}
              </span>
            ))}
          </div>
        )}
      </div>
    )
  },
)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function lerpColor(a: string, b: string, t: number): string {
  const ar = parseInt(a.slice(1, 3), 16)
  const ag = parseInt(a.slice(3, 5), 16)
  const ab = parseInt(a.slice(5, 7), 16)
  const br = parseInt(b.slice(1, 3), 16)
  const bg = parseInt(b.slice(3, 5), 16)
  const bb = parseInt(b.slice(5, 7), 16)
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const bv = Math.round(ab + (bb - ab) * t)
  return `rgb(${r},${g},${bv})`
}
