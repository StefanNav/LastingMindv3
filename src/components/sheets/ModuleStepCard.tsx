import { Clock, Check, LockKeyhole } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CategoryModule } from '@/types'

interface ModuleStepCardProps {
  module: CategoryModule
  stepLabel: string
  ctaLabel?: string
  onBegin?: () => void
}

export function ModuleStepCard({ module, stepLabel, ctaLabel, onBegin }: ModuleStepCardProps) {
  const isActive = !module.completed && !module.locked
  const isCompleted = module.completed
  const isLocked = module.locked

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[14px] font-semibold leading-[1.2] text-muted-foreground">
        {stepLabel}
      </p>

      <div
        className={cn(
          'flex flex-col gap-4 rounded-[10px] p-3',
          isActive && 'bg-lm-bg-card shadow-[0px_3px_6px_0px_rgba(0,0,0,0.16)] backdrop-blur-sm',
          isCompleted && 'border border-border bg-white opacity-70',
          isLocked && 'border border-border bg-white opacity-50',
        )}
      >
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1">
            {isCompleted ? (
              <div className="flex size-[13px] items-center justify-center rounded-full border-[0.5px] border-lm-green bg-primary/10">
                <Check className="size-[10px] text-lm-green" strokeWidth={2.5} />
              </div>
            ) : isLocked ? (
              <div className="flex size-4 items-center justify-center rounded-full border-[0.75px] border-muted-foreground">
                <LockKeyhole className="size-[10px] text-muted-foreground" />
              </div>
            ) : (
              <div className="size-3 rounded-full border border-lm-green" />
            )}

            {isCompleted ? (
              <p className="flex-1 text-[14px] font-medium leading-[1.2] tracking-[0.5px] text-lm-green">
                Module Complete
              </p>
            ) : (
              <p className="flex-1 text-[16px] font-semibold leading-[1.35] text-foreground">
                {module.title}
              </p>
            )}

            {!isCompleted && (
              <div className="flex items-center gap-1">
                <Clock className="size-4 text-muted-foreground" />
                <p className="text-[14px] leading-[1.2] tracking-[0.5px] text-muted-foreground">
                  {module.duration}
                </p>
              </div>
            )}
          </div>

          {isCompleted ? (
            <p className="text-[16px] font-semibold leading-[1.2] text-foreground">
              {module.title}
            </p>
          ) : (
            <p className="text-[14px] font-medium leading-[1.4] tracking-[0.5px] text-muted-foreground">
              {module.description}
            </p>
          )}
        </div>

        {isActive && (
          <button
            type="button"
            onClick={onBegin}
            className="flex w-full items-center justify-center rounded-lg bg-lm-green px-4 py-3"
          >
            <p className="text-sm font-semibold text-white">
              {ctaLabel ?? 'Lets Begin'}
            </p>
          </button>
        )}
      </div>
    </div>
  )
}
