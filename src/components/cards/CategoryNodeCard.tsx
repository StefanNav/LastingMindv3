import { Star, LockKeyhole } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Category, CategoryStatus } from '@/types'

const STAR_COUNT = 3

const filledStarCount: Record<CategoryStatus, number> = {
  locked: 0,
  not_started: 0,
  started: 0,
  growing: 1,
  budding: 2,
  flourishing: 3,
}

const statusLabel: Record<CategoryStatus, string> = {
  locked: '',
  not_started: 'Not Started',
  started: 'Started',
  growing: 'Growing',
  budding: 'Budding',
  flourishing: 'Flourishing',
}

interface CategoryNodeCardProps {
  category: Category
  onClick?: () => void
}

export function CategoryNodeCard({ category, onClick }: CategoryNodeCardProps) {
  const { title, image, status, currentModule } = category
  const isLocked = status === 'locked'
  const filled = filledStarCount[status]

  const displayLabel = currentModule && !isLocked
    ? `Continue Module ${currentModule}`
    : statusLabel[status]

  const labelColor = status === 'not_started' || currentModule
    ? 'text-[var(--lm-text-tertiary)]'
    : 'text-lm-gold-muted'

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'bg-lm-bg-card flex flex-col items-center justify-center gap-2 rounded-[10px] px-5 py-4 shadow-card w-full',
        'transition-transform active:scale-[0.97]',
        isLocked && 'opacity-70',
      )}
    >
      {/* Category image */}
      <div
        className="relative overflow-hidden"
        style={{ height: category.imageHeight ?? 156, width: category.imageWidth ?? 147 }}
      >
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>

      {/* Title + status */}
      <div className="flex flex-col items-center gap-2">
        <p className="font-bold text-[20px] leading-[1.2] text-lm-green-dark text-center">
          {title}
        </p>

        {isLocked ? (
          <div className="flex items-center justify-center rounded-full bg-[#e7ebd9] size-[52px]">
            <LockKeyhole className="size-[30px] text-lm-green-dark/60" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-[2px]">
            {/* Stars */}
            <div className="flex items-center gap-4">
              {Array.from({ length: STAR_COUNT }).map((_, i) => (
                <Star
                  key={i}
                  className="size-5"
                  fill={i < filled ? 'var(--lm-gold-star)' : 'none'}
                  stroke={i < filled ? 'var(--lm-gold-star)' : 'var(--lm-text-tertiary)'}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            {/* Status label */}
            <p className={cn('font-bold text-[14px] leading-[1.2] text-center', labelColor)}>
              {displayLabel}
            </p>
          </div>
        )}
      </div>
    </button>
  )
}
