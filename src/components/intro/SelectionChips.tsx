import { cn } from '@/lib/utils'
import type { Module2IntroOption } from '@/types'

interface SelectionChipsProps {
  options: Module2IntroOption[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function SelectionChips({ options, selectedId, onSelect }: SelectionChipsProps) {
  return (
    <div className="w-full p-2.5">
      <div className="flex flex-wrap items-center justify-center gap-[15px]">
        {options.map((option) => {
          const isSelected = selectedId === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={cn(
                'flex items-center justify-center rounded-full border px-5 py-2.5 transition-colors',
                isSelected
                  ? 'border-lm-green bg-primary/10 text-lm-green'
                  : 'border-border bg-background text-muted-foreground',
              )}
            >
              <span className="whitespace-nowrap text-center text-[16px] font-bold leading-none">
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
