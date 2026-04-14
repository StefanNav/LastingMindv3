import type { CoreValuesCategory } from '@/types/coreValues'

interface CardFrontProps {
  card: CoreValuesCategory
}

export function CardFront({ card }: CardFrontProps) {
  return (
    <div
      className="flex h-[360px] w-[260px] flex-col overflow-hidden rounded-2xl border border-border bg-[var(--lm-bg-card)]"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)' }}
    >
      {/* Green header strip with card label */}
      <div className="flex h-[72px] shrink-0 items-center justify-center bg-lm-green px-4">
        <p className="text-center font-display text-[14px] font-semibold uppercase tracking-[1px] text-white/80">
          {card.cardLabel}
        </p>
      </div>

      {/* Card body — category name + question */}
      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-6">
        <p className="text-center text-[12px] font-bold uppercase tracking-[0.5px] text-lm-green">
          {card.categoryName}
        </p>
        <p className="text-center font-display text-[18px] font-normal leading-[1.4] text-foreground">
          {card.question}
        </p>
      </div>
    </div>
  )
}
