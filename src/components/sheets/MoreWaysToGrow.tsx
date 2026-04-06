import { ChevronRight } from 'lucide-react'
import type { GrowthAction } from '@/types'

interface MoreWaysToGrowProps {
  actions: GrowthAction[]
  onAction?: (actionId: string) => void
}

export function MoreWaysToGrow({ actions, onAction }: MoreWaysToGrowProps) {
  return (
    <div className="border-t border-border px-4 pb-2.5 pt-4">
      <p className="text-[14px] font-semibold leading-[1.2] text-[var(--lm-text-secondary)]">
        More Ways to Grow
      </p>
      <div className="flex flex-col">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onAction?.(action.id)}
            className="flex items-start gap-[46px] border-b border-border pb-2.5 pt-4"
          >
            <p className="flex-1 text-left text-sm font-semibold leading-[1.2] text-foreground">
              {action.label}
            </p>
            <ChevronRight className="size-6 shrink-0 text-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}
