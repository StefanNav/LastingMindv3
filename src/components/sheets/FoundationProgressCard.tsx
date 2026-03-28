import { Star } from 'lucide-react'
import { useApp } from '@/app/AppProvider'

const FOUNDATION_STAR_COUNT = 6

interface FoundationProgressCardProps {
  onContinue?: () => void
}

export function FoundationProgressCard({ onContinue }: FoundationProgressCardProps) {
  const { foundationStars: filledStars } = useApp()
  return (
    <div className="px-4">
      <div className="flex flex-col items-center gap-2.5 rounded-[10px] bg-lm-bg-card p-3 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.16)]">
        <div className="flex w-full flex-col items-center">
          <p className="text-center font-display text-[18px] font-medium leading-[1.2] text-foreground">
            Foundation Progress
          </p>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-4">
            {Array.from({ length: FOUNDATION_STAR_COUNT }).map((_, i) => (
              <Star
                key={i}
                className="size-5"
                fill={i < filledStars ? 'var(--lm-gold-star)' : 'none'}
                stroke={i < filledStars ? 'var(--lm-gold-star)' : 'var(--lm-text-tertiary)'}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <p className="text-center text-[14px] font-semibold leading-[1.2] text-[var(--lm-text-tertiary)]">
            Earn a star for each foundation category to unlock
          </p>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="flex w-full items-center justify-center rounded-[4px] bg-lm-green px-10 py-2.5"
        >
          <p className="text-[16px] leading-[1.2] text-white">
            Continue your Foundation
          </p>
        </button>
      </div>
    </div>
  )
}
