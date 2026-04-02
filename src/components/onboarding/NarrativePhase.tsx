import { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useTreeMorph } from '@/hooks/useTreeMorph'
import { containerVariants, dissolveVariants } from './animations'
// import { ShimmerInput } from './ShimmerInput' // kept for future use

// ---------------------------------------------------------------------------
// Spark particles — rise upward from the seed/tree during morph
// ---------------------------------------------------------------------------

const SPARK_COLORS = ['#5A9A38', '#8CC858', '#C49428', '#3A7030', '#78B848', '#A8D870']
const SPARK_COUNT = 14
const SPARK_TRAVEL_MS = 500 // time for sparks to reach the text area

function SparkParticles({ trigger }: { trigger: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (trigger === 0) return
    const el = containerRef.current
    if (!el) return

    for (let i = 0; i < SPARK_COUNT; i++) {
      const sp = document.createElement('div')
      const size = 2 + Math.random() * 3
      const color = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)]
      sp.style.cssText =
        `position:absolute;border-radius:50%;pointer-events:none;` +
        `left:${30 + Math.random() * 280}px;bottom:${20 + Math.random() * 100}px;` +
        `width:${size}px;height:${size}px;background:${color};`

      el.appendChild(sp)

      const tx = (Math.random() - 0.5) * 80
      const ty = 350 + Math.random() * 200 // rise far past text, dissolve at title top

      const anim = sp.animate(
        [
          { opacity: 0, transform: 'translate(0,0) scale(0)' },
          { opacity: 0.9, transform: `translate(${tx * 0.1}px,${-ty * 0.1}px) scale(1)`, offset: 0.08 },
          { opacity: 0.85, transform: `translate(${tx * 0.4}px,${-ty * 0.4}px) scale(0.85)`, offset: 0.4 },
          { opacity: 0.7, transform: `translate(${tx * 0.7}px,${-ty * 0.7}px) scale(0.6)`, offset: 0.7 },
          { opacity: 0.3, transform: `translate(${tx * 0.9}px,${-ty * 0.9}px) scale(0.3)`, offset: 0.88 },
          { opacity: 0, transform: `translate(${tx}px,${-ty}px) scale(0)` },
        ],
        {
          duration: 1800 + Math.random() * 500,
          delay: Math.random() * 250,
          easing: 'ease-out',
        },
      )
      anim.onfinish = () => sp.remove()
    }
  }, [trigger])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 10 }}
    />
  )
}

// ---------------------------------------------------------------------------
// Stage content — text + button labels for the 5 narrative screens
// ---------------------------------------------------------------------------

interface StageContent {
  heading: string
  subtitle: string
  buttonLabel: string
}

const STAGES: StageContent[] = [
  {
    heading: 'Every legacy starts as a seed',
    subtitle:
      'Lasting Mind helps you build something your loved ones can return to for years to come.',
    buttonLabel: "Let's Begin",
  },
  {
    heading: 'The people you love want to know you',
    subtitle:
      "Not just who you are today, but who you've been and what shaped you.",
    buttonLabel: 'Continue',
  },
  {
    heading: 'We help bring your story to life',
    subtitle:
      'Through guided reflections we capture your life chapters for your loved ones.',
    buttonLabel: 'Continue',
  },
  {
    heading: 'What you build here will grow',
    subtitle:
      'Over time, your stories become something your loved ones can return to.',
    buttonLabel: 'Continue',
  },
  {
    heading: 'Your story is ready to take root',
    subtitle:
      'This is the first step in shaping something that reflects you.',
    buttonLabel: 'Continue',
  },
]

const IMAGE_PATHS = [
  '/images/onboarding/seed-1.png',
  '/images/onboarding/seed-2.png',
  '/images/onboarding/seed-3.png',
  '/images/onboarding/sprout-1.png',
  '/images/onboarding/sprount-2.png',
]

// Canvas render dimensions (aspect ratio close to the source images)
const CW = 340
const CH = 327

// ---------------------------------------------------------------------------
// Text animation — fast exit, staggered bottom-up enter
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface NarrativePhaseProps {
  onComplete: (firstName: string, lastName: string) => void
  initialFirstName?: string
  initialLastName?: string
}

export function NarrativePhase({
  onComplete,
  initialFirstName = '',
  initialLastName = '',
}: NarrativePhaseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stage, _setStage] = useState(0)
  const stageRef = useRef(0)
  const setStage = useCallback((next: number) => {
    stageRef.current = next
    _setStage(next)
  }, [])
  const [firstName, setFirstName] = useState(initialFirstName)
  const [lastName, setLastName] = useState(initialLastName)
  const [showNameInputs, setShowNameInputs] = useState(false)
  const [pulseTarget, setPulseTarget] = useState<'first' | 'last' | 'none'>('first')

  const paths = useMemo(() => IMAGE_PATHS, [])

  const { morphTo, isMorphing, imagesLoaded } = useTreeMorph({
    canvasRef,
    imagePaths: paths,
    width: CW,
    height: CH,
  })

  const content = STAGES[stage]
  const isNameStage = stage === 4
  const canContinue = !isNameStage || (firstName.trim().length > 0 && lastName.trim().length > 0)

  // Show name inputs after title dissolve completes on stage 4
  useEffect(() => {
    if (isNameStage) {
      const t = setTimeout(() => setShowNameInputs(true), 2200)
      return () => clearTimeout(t)
    } else {
      setShowNameInputs(false)
    }
  }, [isNameStage])

  // Listen for back button in status bar (testing utility)
  useEffect(() => {
    const handler = () => {
      if (isMorphing) return
      const prev = stageRef.current
      const next = Math.max(0, prev - 1)
      if (next !== prev) {
        morphTo(next, () => setStage(next))
      }
    }
    window.addEventListener('onboarding-back', handler)
    return () => window.removeEventListener('onboarding-back', handler)
  }, [isMorphing, morphTo])

  const [sparkTrigger, setSparkTrigger] = useState(0)
  const textTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleContinue = useCallback(() => {
    if (isNameStage) {
      onComplete(firstName.trim(), lastName.trim())
      return
    }

    const next = stageRef.current + 1
    // Fire sparks immediately
    setSparkTrigger((n) => n + 1)
    // Start the canvas morph
    morphTo(next)
    // Transition text after sparks reach the text area
    if (textTimerRef.current) clearTimeout(textTimerRef.current)
    textTimerRef.current = setTimeout(() => setStage(next), SPARK_TRAVEL_MS)
  }, [isNameStage, morphTo, onComplete, firstName, lastName, setStage])

  return (
    <div className="flex h-full flex-col">
      {/* ---- Text area (crossfade) ---- */}
      <div className="flex flex-1 flex-col justify-end px-4 pb-4 pt-14 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={isNameStage ? { staggerChildren: 0.18, staggerDirection: -1, delayChildren: 0.6 } : undefined}
          >
            <motion.h1
              variants={dissolveVariants}
              className="font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-foreground text-center"
            >
              {content.heading}
            </motion.h1>
            <motion.p
              variants={dissolveVariants}
              className="mt-4 font-sans text-[15px] leading-relaxed text-[var(--lm-text-secondary)]"
            >
              {content.subtitle}
            </motion.p>
            {/* ---- Name inputs (inside AnimatePresence so they don't cause layout shift during exit) ---- */}
            {isNameStage && (
              <motion.div
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={showNameInputs
                  ? { opacity: 1, filter: 'blur(0px)' }
                  : { opacity: 0, filter: 'blur(4px)' }
                }
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-6"
                style={{ pointerEvents: showNameInputs ? 'auto' : 'none' }}
              >
                <p className="mb-1.5 text-left font-sans text-[15px] font-medium text-foreground">
                  What's your name?
                </p>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={() => setPulseTarget('none')}
                    onBlur={() => {
                      if (!firstName.trim()) setPulseTarget('first')
                      else setPulseTarget(lastName.trim() ? 'none' : 'last')
                    }}
                    className={`h-[42px] w-full rounded-lg border border-lm-border bg-background px-3 font-sans text-[15px] text-foreground outline-none placeholder:text-[var(--lm-text-secondary)] focus:border-lm-green focus:ring-1 focus:ring-lm-green/30${pulseTarget === 'first' && showNameInputs ? ' animate-pulse-glow' : ''}`}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onFocus={() => setPulseTarget('none')}
                    onBlur={() => {
                      if (!lastName.trim()) setPulseTarget('last')
                      else setPulseTarget('none')
                    }}
                    className={`h-[42px] w-full rounded-lg border border-lm-border bg-background px-3 font-sans text-[15px] text-foreground outline-none placeholder:text-[var(--lm-text-secondary)] focus:border-lm-green focus:ring-1 focus:ring-lm-green/30${pulseTarget === 'last' && showNameInputs ? ' animate-pulse-glow' : ''}`}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---- Canvas + sparks (persistent, bottom-anchored) ---- */}
      <div
        className="relative flex items-end justify-center overflow-visible"
      >
        <SparkParticles trigger={sparkTrigger} />
        <canvas
          ref={canvasRef}
          width={CW}
          height={CH}
          className="transition-opacity duration-500"
          style={{
            width: '100%',
            maxWidth: CW,
            height: 'auto',
            transformOrigin: 'bottom center',
            opacity: imagesLoaded ? 1 : 0,
          }}
        />
      </div>

      {/* ---- Button (always present, never unmounts) ---- */}
      <div className="px-4 pb-4 pt-2">
        <Button
          onClick={handleContinue}
          disabled={!canContinue || (!imagesLoaded && stage === 0)}
          className="h-[54px] w-full rounded-xl bg-lm-green text-[16px] font-semibold text-white active:scale-[0.97] active:brightness-90 transition-transform disabled:opacity-40"
        >
          {content.buttonLabel}
        </Button>
      </div>
    </div>
  )
}
