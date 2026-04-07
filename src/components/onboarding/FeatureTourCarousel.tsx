import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { ProgressBar } from './ProgressBar'
import { horizontalSlideVariants } from './animations'

interface CarouselSlide {
  id: string
  heading: string
  content: ReactNode
}

interface FeatureTourCarouselProps {
  slides: CarouselSlide[]
  /** Auto-advance duration per slide in ms (default 5000) */
  duration?: number
  onComplete: () => void
}

export function FeatureTourCarousel({
  slides,
  duration = 5000,
  onComplete,
}: FeatureTourCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [paused, setPaused] = useState(false)

  // Track elapsed time so we can resume with the remaining duration
  const elapsedRef = useRef(0)
  const startRef = useRef(Date.now())
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goForward = useCallback(() => {
    if (currentIndex >= slides.length - 1) {
      onComplete()
      return
    }
    setDirection(1)
    setCurrentIndex((i) => i + 1)
  }, [currentIndex, slides.length, onComplete])

  const goBack = useCallback(() => {
    if (currentIndex <= 0) return
    setDirection(-1)
    setCurrentIndex((i) => i - 1)
  }, [currentIndex])

  const goToStart = useCallback(() => {
    if (currentIndex <= 0) return
    setDirection(-1)
    setCurrentIndex(0)
  }, [currentIndex])

  // Reset elapsed tracking when slide changes
  useEffect(() => {
    elapsedRef.current = 0
    startRef.current = Date.now()
  }, [currentIndex])

  // Auto-advance timer — restarts on resume, clears on pause
  useEffect(() => {
    if (paused) {
      // Snapshot how far we got
      elapsedRef.current += Date.now() - startRef.current
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }
    const remaining = Math.max(0, duration - elapsedRef.current)
    startRef.current = Date.now()
    timerRef.current = setTimeout(goForward, remaining)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [paused, currentIndex, duration, goForward])

  // Press-and-hold handlers — distinguish tap (< 200ms) from hold
  const HOLD_THRESHOLD = 200
  const downAtRef = useRef(0)
  const wasHoldRef = useRef(false)

  const handlePointerDown = useCallback(() => {
    downAtRef.current = Date.now()
    wasHoldRef.current = false
    setPaused(true)
  }, [])

  const handlePointerUp = useCallback(() => {
    wasHoldRef.current = Date.now() - downAtRef.current >= HOLD_THRESHOLD
    setPaused(false)
  }, [])

  const handleTapBack = useCallback(() => {
    if (wasHoldRef.current) return
    goBack()
  }, [goBack])

  const handleTapForward = useCallback(() => {
    if (wasHoldRef.current) return
    goForward()
  }, [goForward])

  const slide = slides[currentIndex]

  return (
    <div className="flex h-full flex-col">
      {/* Back button + Progress bar */}
      <div className="flex items-center gap-2 pt-14 px-4">
        <button
          type="button"
          onClick={goToStart}
          className={`flex items-center justify-center size-8 rounded-full transition-opacity ${
            currentIndex > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Back to start"
        >
          <ChevronLeft className="size-5 text-foreground" />
        </button>
        <div className="flex-1">
          <ProgressBar
            currentStep={currentIndex}
            totalSteps={slides.length}
            animated
            duration={duration}
            paused={paused}
          />
        </div>
      </div>

      {/* Slide content area */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={horizontalSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex flex-col"
          >
            {/* Heading */}
            <div className="mt-8 px-6 text-center">
              <h1 className="font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-foreground text-center">
                {slide.heading}
              </h1>
            </div>

            {/* Content */}
            <div className="flex flex-1 items-center justify-center overflow-hidden px-6 pb-6">
              {slide.content}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Invisible tap zones — press-and-hold pauses, tap navigates */}
        <div className="absolute inset-0 z-10 flex">
          {/* Left 30% — go back */}
          <button
            type="button"
            className="h-full w-[30%] cursor-default"
            onClick={handleTapBack}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            aria-label="Previous slide"
          />
          {/* Right 70% — go forward */}
          <button
            type="button"
            className="h-full w-[70%] cursor-default"
            onClick={handleTapForward}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            aria-label="Next slide"
          />
        </div>
      </div>
    </div>
  )
}
