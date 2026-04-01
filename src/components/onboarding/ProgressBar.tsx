import { cn } from '@/lib/utils'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-1.5 px-4">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-lm-border/40"
        >
          <div
            className={cn(
              'absolute inset-y-0 left-0 rounded-full bg-lm-green transition-all duration-500 ease-out',
              i < currentStep ? 'w-full' : i === currentStep ? 'w-1/2' : 'w-0',
            )}
          />
        </div>
      ))}
    </div>
  )
}
