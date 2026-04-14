import { useNavigate } from 'react-router-dom'
import type { CategoryContentSummary } from '@/types'

interface CategoryZeroStateProps {
  summary: CategoryContentSummary
}

export function CategoryZeroState({ summary }: CategoryZeroStateProps) {
  const navigate = useNavigate()

  // Foundation categories navigate to /intro/:id, legacy modules to /legacy/:id
  const isLegacy = summary.categoryId.startsWith('mod-')
  const handleStart = () => {
    if (isLegacy) {
      navigate(`/legacy/${summary.categoryId}`)
    } else {
      navigate(`/intro/${summary.categoryId}`)
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
      {/* Category image */}
      <div className="flex h-[140px] w-[140px] items-center justify-center">
        <img
          src={summary.categoryImage}
          alt={summary.categoryLabel}
          className="max-h-[140px] w-auto object-contain opacity-40"
        />
      </div>

      {/* Copy */}
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Nothing here yet
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Complete modules in {summary.categoryLabel} to see your reward cards and everything you've shared.
        </p>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={handleStart}
        className="mt-2 rounded-lg bg-lm-green px-8 py-3 text-sm font-semibold text-white transition-transform active:scale-[0.97]"
      >
        Start {summary.categoryLabel}
      </button>
    </div>
  )
}
