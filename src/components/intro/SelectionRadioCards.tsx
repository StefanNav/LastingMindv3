import { cn } from '@/lib/utils'
import type { Module2IntroOption } from '@/types'

interface SelectionRadioCardsProps {
  options: Module2IntroOption[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function SelectionRadioCards({ options, selectedId, onSelect }: SelectionRadioCardsProps) {
  return (
    <div className="flex w-full flex-col gap-2.5 overflow-clip rounded-[10px]">
      {options.map((option) => {
        const isSelected = selectedId === option.id
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-[10px] border p-2.5 text-left transition-colors',
              isSelected
                ? 'border-lm-green bg-[#e7ebd9]'
                : 'border-[#e7ebd9] bg-[#fffcf4]',
            )}
          >
            {/* Radio dot */}
            <div
              className={cn(
                'flex size-[13px] shrink-0 items-center justify-center rounded-full border',
                isSelected
                  ? 'border-lm-green'
                  : 'border-[#5d6056]',
              )}
            >
              {isSelected && (
                <div className="size-[7px] rounded-full bg-lm-green" />
              )}
            </div>

            {/* Content */}
            <div className="flex min-w-0 flex-1 flex-col leading-[1.2]">
              <p className="font-display text-[16px] font-medium text-foreground">
                {option.label}
              </p>
              {option.subtitle && (
                <p className="text-[14px] font-medium tracking-[0.5px] text-[var(--lm-text-secondary)]">
                  {option.subtitle}
                </p>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
