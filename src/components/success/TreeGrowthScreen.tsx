import { useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTreeMorph } from '@/hooks/useTreeMorph'

// Canvas dimensions — matches onboarding
const CW = 340
const CH = 327

interface TreeGrowthScreenProps {
  headline?: string
  imagePaths: string[]
  morphDelay?: number
  onComplete: () => void
}

export function TreeGrowthScreen({
  headline,
  imagePaths,
  morphDelay = 1200,
  onComplete,
}: TreeGrowthScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const paths = useMemo(() => imagePaths, [imagePaths])
  const { morphTo, imagesLoaded } = useTreeMorph({
    canvasRef,
    imagePaths: paths,
    width: CW,
    height: CH,
  })

  // Once images are loaded, wait a beat then morph to stage 1
  useEffect(() => {
    if (!imagesLoaded) return
    const t = setTimeout(() => {
      morphTo(1, () => {
        // After morph completes, wait a beat then advance
        setTimeout(() => onCompleteRef.current(), 800)
      })
    }, morphDelay)
    return () => clearTimeout(t)
  }, [imagesLoaded, morphTo, morphDelay])

  return (
    <motion.div
      key="tree-growth"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="flex h-full flex-col bg-[var(--lm-bg-primary)]"
      style={{
        backgroundImage: 'url(/images/bg-texture.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Headline — stays static while tree morphs */}
      {headline && (
        <div className="px-4 pt-[80px]">
          <p className="font-display text-[26px] font-semibold leading-[1.2] text-foreground text-center">
            {headline}
          </p>
        </div>
      )}

      {/* Canvas — pixel-sweep morph */}
      <div className="flex flex-1 items-center justify-center overflow-visible">
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

      {/* Bottom spacer */}
      <div className="h-[40px] shrink-0" />
    </motion.div>
  )
}
