import { useState, useRef, useMemo, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThinkingDots } from '@/components/ui/ThinkingDots'
import { useTreeMorph } from '@/hooks/useTreeMorph'
import { containerVariants, dissolveVariants } from './animations'

// Canvas dimensions (same as NarrativePhase)
const CW = 340
const CH = 327

// Morph from sprout → full tree (same pixel-sweep as seed → sprout in NarrativePhase)
const MORPH_IMAGES = [
  '/images/onboarding/sprount-2.png',
  '/images/Tree 1.png',
]

// ---------------------------------------------------------------------------
// PostBirthdayPhase — loading → welcome text → tree morph, plant persistent
// ---------------------------------------------------------------------------

interface PostBirthdayPhaseProps {
  firstName: string
  onComplete: () => void
}

export function PostBirthdayPhase({ firstName, onComplete }: PostBirthdayPhaseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stage, setStage] = useState(0) // 0=loading, 1=welcome, 2=morph

  const paths = useMemo(() => MORPH_IMAGES, [])
  const { morphTo, imagesLoaded } = useTreeMorph({
    canvasRef,
    imagePaths: paths,
    width: CW,
    height: CH,
  })

  // Auto-advance: loading → welcome
  useEffect(() => {
    if (stage === 0) {
      const t = setTimeout(() => setStage(1), 2000)
      return () => clearTimeout(t)
    }
  }, [stage])

  // Auto-advance: welcome → morph (welcome text stays visible for 3s before morph starts)
  useEffect(() => {
    if (stage === 1) {
      const t = setTimeout(() => setStage(2), 3000)
      return () => clearTimeout(t)
    }
  }, [stage])

  // Start morph when entering stage 2
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (stage === 2 && imagesLoaded) {
      morphTo(1, () => {
        // After morph completes, wait a beat then advance
        setTimeout(() => onCompleteRef.current(), 800)
      })
    }
  }, [stage, imagesLoaded, morphTo])

  return (
    <div className="flex h-full flex-col">
      {/* ---- Content area (crossfades loading → welcome, welcome stays during morph) ---- */}
      <div className="flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          {stage === 0 ? (
            <motion.div
              key="loading"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex h-full flex-col"
            >
              <div className="flex h-full items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
                >
                  <ThinkingDots size="md" />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="welcome"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex h-full flex-col"
            >
              <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                <motion.h1
                  variants={dissolveVariants}
                  className="font-display text-[26px] font-semibold leading-[1.2] tracking-tight text-foreground"
                >
                  Welcome to your Lasting Mind, {firstName}
                </motion.h1>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---- Canvas — same pixel-sweep morph as NarrativePhase ---- */}
      <div className="relative flex items-end justify-center overflow-visible">
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

      {/* ---- Button spacer (no button in this phase) ---- */}
      <div className="px-4 pb-4 pt-2">
        <div className="h-[54px]" />
      </div>
    </div>
  )
}
