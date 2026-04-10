import { useEffect, useRef, useMemo } from 'react'
import { useTreeMorph } from '@/hooks/useTreeMorph'

// Canvas dimensions — matches onboarding
const CW = 340
const CH = 327

// Morph: TreeStage2 → TreeStage3
const TREE_IMAGES = [
  '/images/TreeStage2_V2.png',
  '/images/treeFinal.png',
]

// Delay before morph starts (ms)
const INITIAL_DELAY = 800

export function TreeGrowthSlide() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const paths = useMemo(() => TREE_IMAGES, [])
  const { morphTo, imagesLoaded } = useTreeMorph({
    canvasRef,
    imagePaths: paths,
    width: CW,
    height: CH,
  })

  // Morph from stage 0 → 1
  useEffect(() => {
    if (!imagesLoaded) return
    const t = setTimeout(() => morphTo(1), INITIAL_DELAY)
    return () => clearTimeout(t)
  }, [imagesLoaded, morphTo])

  return (
    <div className="flex h-full w-full items-center justify-center">
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
