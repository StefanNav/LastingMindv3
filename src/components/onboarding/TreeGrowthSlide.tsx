import { useEffect, useRef, useMemo } from 'react'
import { useTreeMorph } from '@/hooks/useTreeMorph'

// Canvas dimensions — matches onboarding
const CW = 340
const CH = 327

// Sequential morph: small → medium → full tree
const TREE_IMAGES = [
  '/images/onboarding/tree 1.2.png',
  '/images/Tree 1.png',
  '/images/onboarding/Tree 2.2.png',
]

// Delay before each morph starts (ms)
const INITIAL_DELAY = 800
const INTER_MORPH_DELAY = 600

export function TreeGrowthSlide() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const paths = useMemo(() => TREE_IMAGES, [])
  const { morphTo, imagesLoaded } = useTreeMorph({
    canvasRef,
    imagePaths: paths,
    width: CW,
    height: CH,
  })

  // Chain morphs: stage 0 → 1, then 1 → 2
  useEffect(() => {
    if (!imagesLoaded) return
    let cancelled = false

    const t = setTimeout(() => {
      if (cancelled) return
      morphTo(1, () => {
        if (cancelled) return
        setTimeout(() => {
          if (cancelled) return
          morphTo(2)
        }, INTER_MORPH_DELAY)
      })
    }, INITIAL_DELAY)

    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [imagesLoaded, morphTo])

  return (
    <div className="flex h-full w-full items-end justify-center">
      <canvas
        ref={canvasRef}
        width={CW}
        height={CH}
        className="transition-opacity duration-500"
        style={{
          width: '100%',
          maxWidth: CW,
          height: 'auto',
          opacity: imagesLoaded ? 1 : 0,
        }}
      />
    </div>
  )
}
