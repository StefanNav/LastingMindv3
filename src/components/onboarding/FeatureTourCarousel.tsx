import { useState, useEffect, useCallback, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

  // Auto-advance timer
  useEffect(() => {
    const timer = setTimeout(goForward, duration)
    return () => clearTimeout(timer)
  }, [currentIndex, duration, goForward])

  const slide = slides[currentIndex]

  return (
    <div className="flex h-full flex-col">
      {/* Progress bar */}
      <div className="pt-14">
        <ProgressBar
          currentStep={currentIndex}
          totalSteps={slides.length}
          animated
          duration={duration}
        />
      </div>

      {/* Heading — stays outside AnimatePresence so it transitions with content */}
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
            <div className="mt-4 px-4 text-center">
              <h1 className="font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-foreground text-center">
                {slide.heading}
              </h1>
            </div>

            {/* Content */}
            <div className="flex flex-1 items-center justify-center overflow-hidden px-4">
              {slide.content}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Invisible tap zones */}
        <div className="absolute inset-0 z-10 flex">
          {/* Left 30% — go back */}
          <button
            type="button"
            className="h-full w-[30%] cursor-default"
            onClick={goBack}
            aria-label="Previous slide"
          />
          {/* Right 70% — go forward */}
          <button
            type="button"
            className="h-full w-[70%] cursor-default"
            onClick={goForward}
            aria-label="Next slide"
          />
        </div>
      </div>
    </div>
  )
}
