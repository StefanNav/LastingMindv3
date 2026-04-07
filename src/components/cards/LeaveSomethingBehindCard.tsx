import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LeaveSomethingBehindCardProps {
  onClick?: () => void
}

export function LeaveSomethingBehindCard({ onClick }: LeaveSomethingBehindCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-4 rounded-[10px] px-5 py-4 text-left',
        'border border-dashed border-lm-border',
        'bg-lm-bg-card/20 shadow-card backdrop-blur-sm',
        'transition-transform active:scale-[0.97]',
      )}
    >
      {/* Plus icon */}
      <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-lm-green/10">
        <Plus className="size-7 text-lm-green" />
      </div>

      {/* Text block */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-[15px] font-semibold leading-tight text-lm-green-dark">
          Leave Something Behind
        </p>
        <p className="text-[13px] leading-snug text-[var(--lm-text-secondary)]">
          Letters, voice messages, stories and more
        </p>
      </div>
    </button>
  )
}
