import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  /** When true the active segment animates from 0→100% over `duration` ms */
  animated?: boolean
  /** Duration in ms for the active segment fill (default 5000) */
  duration?: number
}

export function ProgressBar({
  currentStep,
  totalSteps,
  animated = false,
  duration = 5000,
}: ProgressBarProps) {
  // Force a re-mount of the active bar so the CSS transition restarts on step change
  const [filling, setFilling] = useState(false)

  useEffect(() => {
    if (!animated) return
    // Start at 0 width, then on next frame expand to full
    setFilling(false)
    const raf = requestAnimationFrame(() => setFilling(true))
    return () => cancelAnimationFrame(raf)
  }, [currentStep, animated])

  return (
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
                  ? '' // animated mode: active uses inline style transition; completed/future snap instantly
                  : 'transition-all duration-500 ease-out',
                !animated && isCompleted && 'w-full',
                !animated && isActive && 'w-1/2',
                !animated && !isCompleted && !isActive && 'w-0',
                animated && isCompleted && 'w-full',
                animated && !isCompleted && !isActive && 'w-0',
              )}
              style={
                animated
                  ? isActive
                    ? {
                        width: filling ? '100%' : '0%',
                        transition: filling
                          ? `width ${duration}ms linear`
                          : 'none',
                      }
                    : {
                        width: isCompleted ? '100%' : '0%',
                        transition: 'none',
                      }
                  : undefined
              }
            />
          </div>
        )
      })}
    </div>
  )
}
