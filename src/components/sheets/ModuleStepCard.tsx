import { Clock, Check, LockKeyhole } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CategoryModule } from '@/types'

interface ModuleStepCardProps {
  module: CategoryModule
  stepLabel: string
  onBegin?: () => void
}

export function ModuleStepCard({ module, stepLabel, onBegin }: ModuleStepCardProps) {
  const isActive = !module.completed && !module.locked
  const isCompleted = module.completed
  const isLocked = module.locked

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[14px] font-semibold leading-[1.2] text-[var(--lm-text-secondary)]">
        {stepLabel}
      </p>

      <div
        className={cn(
          'flex flex-col gap-4 rounded-[10px] p-3',
          isActive && 'bg-lm-bg-card shadow-[0px_3px_6px_0px_rgba(0,0,0,0.16)]',
          isCompleted && 'border border-[#e7ebd9] bg-white opacity-70',
          isLocked && 'border border-[#e7ebd9] bg-white opacity-50',
        )}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            {isCompleted ? (
              <div className="flex size-[13px] items-center justify-center rounded-full border-[0.5px] border-lm-green bg-[#e7ebd9]">
                <Check className="size-[10px] text-lm-green" strokeWidth={2.5} />
              </div>
            ) : isLocked ? (
              <div className="flex size-4 items-center justify-center rounded-full border-[0.75px] border-[var(--lm-text-secondary)]">
                <LockKeyhole className="size-[10px] text-[var(--lm-text-secondary)]" />
              </div>
            ) : (
              <div className="size-3 rounded-full border border-lm-green" />
            )}

            {isCompleted ? (
              <p className="flex-1 text-[14px] font-medium leading-[1.2] tracking-[0.5px] text-lm-green">
                Module Complete
              </p>
            ) : (
              <p className="flex-1 font-display text-[18px] font-medium leading-[1.2] text-foreground">
                {module.title}
              </p>
            )}

            {!isCompleted && (
              <div className="flex items-center gap-1">
                <Clock className="size-4 text-[var(--lm-text-secondary)]" />
                <p className="text-[14px] leading-[1.2] tracking-[0.5px] text-[var(--lm-text-secondary)]">
                  {module.duration}
                </p>
              </div>
            )}
          </div>

          {isCompleted ? (
            <p className="font-display text-[18px] font-medium leading-[1.2] text-foreground">
              {module.title}
            </p>
          ) : (
            <p className="text-[14px] font-medium leading-[1.2] tracking-[0.5px] text-[var(--lm-text-secondary)]">
              {module.description}
            </p>
          )}
        </div>

        {isActive && (
          <button
            type="button"
            onClick={onBegin}
            className="flex w-full items-center justify-center rounded-[4px] bg-lm-green px-10 py-2.5"
          >
            <p className="text-[16px] leading-[1.2] text-white">
              Lets Begin
            </p>
          </button>
        )}
      </div>
    </div>
  )
}
