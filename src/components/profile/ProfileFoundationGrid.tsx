import { cn } from '@/lib/utils'
import type { ProfileFoundationCategory } from '@/types'

interface ProfileFoundationGridProps {
  categories: ProfileFoundationCategory[]
  onCategoryTap?: (categoryId: string) => void
}

const statusText = (cat: ProfileFoundationCategory): string => {
  if (cat.status === 'complete' && cat.deliverableName) return cat.deliverableName
  if (cat.status === 'in_progress') return 'In progress'
  return 'Not started'
}

const statusColor = (cat: ProfileFoundationCategory): string => {
  if (cat.status === 'complete') return 'text-lm-gold-muted'
  return 'text-[var(--lm-text-tertiary)]'
}

export function ProfileFoundationGrid({ categories, onCategoryTap }: ProfileFoundationGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {categories.map((cat) => (
        <button
          key={cat.categoryId}
          type="button"
          onClick={() => onCategoryTap?.(cat.categoryId)}
          className={cn(
            'flex flex-col items-center gap-1.5 rounded-[10px] bg-lm-bg-card/40 px-2 py-3 shadow-card backdrop-blur-sm',
            'transition-transform active:scale-[0.97]',
          )}
        >
          {/* Category image — scaled to fit compact card */}
          <div className="flex h-[60px] w-full items-center justify-center overflow-hidden">
            <img
              src={cat.imageAsset}
              alt={cat.name}
              className="max-h-[60px] w-auto object-contain"
            />
          </div>

          {/* Name */}
          <p className="text-[13px] font-bold leading-tight text-lm-green-dark text-center">
            {cat.name}
          </p>

          {/* Status */}
          <p className={cn('text-[10px] font-semibold leading-tight text-center', statusColor(cat))}>
            {statusText(cat)}
          </p>
        </button>
      ))}
    </div>
  )
}
