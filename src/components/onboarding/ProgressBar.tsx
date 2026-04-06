import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  /** When true the active segment animates from 0→100% over `duration` ms */
  animated?: boolean
  /** Duration in ms for the active segment fill (default 5000) */
  duration?: number
  /** When true the active segment fill animation is frozen in place */
  paused?: boolean
}

export function ProgressBar({
  currentStep,
  totalSteps,
  animated = false,
  duration = 5000,
  paused = false,
}: ProgressBarProps) {
  // Force a re-mount of the active bar so the CSS animation restarts on step change
  const [filling, setFilling] = useState(false)

  useEffect(() => {
    if (!animated) return
    // Start with no animation, then on next frame start the fill
    setFilling(false)
    const raf = requestAnimationFrame(() => setFilling(true))
    return () => cancelAnimationFrame(raf)
  }, [currentStep, animated])

  return (
    <>
      <style>{`@keyframes pb-fill{from{width:0%}to{width:100%}}`}</style>
      <div className="flex items-center gap-1.5 px-4">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const isCompleted = i < currentStep
          const isActive = i === currentStep

          return (
            <div
              key={i}
              className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-lm-border/40"
            >
              <div
                className={cn(
                  'absolute inset-y-0 left-0 rounded-full bg-lm-green',
                  animated
                    ? ''
                    : 'transition-all duration-500 ease-out',
                  !animated && isCompleted && 'w-full',
                  !animated && isActive && 'w-1/2',
                  !animated && !isCompleted && !isActive && 'w-0',
                  animated && isCompleted && 'w-full',
                  animated && !isCompleted && !isActive && 'w-0',
                )}
                style={
                  animated && isActive && filling
                    ? {
                        animation: `pb-fill ${duration}ms linear forwards`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }
                    : animated && isActive
                      ? { width: '0%' }
                      : animated
                        ? { width: isCompleted ? '100%' : '0%' }
                        : undefined
                }
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
