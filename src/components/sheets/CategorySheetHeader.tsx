import { Star } from 'lucide-react'
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

interface CategorySheetHeaderProps {
  category: Category
}

export function CategorySheetHeader({ category }: CategorySheetHeaderProps) {
  const { title, image, status } = category
  const filled = filledStarCount[status]

  return (
    <div className="flex flex-col items-center gap-2.5 px-5">
      <div className="flex flex-col items-center gap-2.5">
        <div className="flex flex-col items-center">
          <div className="h-[100px] w-[95px] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-contain"
            />
          </div>
          <p className="text-center text-[18px] font-semibold leading-[1.2] text-lm-green-dark">
            {title}
          </p>
        </div>

        <div className="flex flex-col items-center gap-[2px]">
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
          <p className="text-center text-[14px] font-semibold leading-[1.2] text-[var(--lm-text-tertiary)]">
            {statusLabel[status]}
          </p>
        </div>
      </div>
    </div>
  )
}
