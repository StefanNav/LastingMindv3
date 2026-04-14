import { motion } from 'framer-motion'
import { RewardPrimaryCTA } from './RewardCTAs'
import type { RewardCardItem } from '@/types'

interface RewardCardProps {
  headline: string
  subheadline: string
  categoryImage: string
  categoryLabel: string
  moduleTitle: string
  items: RewardCardItem[]
  itemCountLabel: string
  date: string
  onContinue: () => void
}

export function RewardCard({
  headline,
  subheadline,
  categoryImage,
  categoryLabel,
  moduleTitle,
  items,
  itemCountLabel,
  date,
  onContinue,
}: RewardCardProps) {
  return (
    <motion.div
      key="reward-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex h-full flex-col bg-[var(--lm-bg-primary)]"
      style={{
        backgroundImage: 'url(/images/bg-texture.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Header text */}
      <div className="flex flex-col gap-2 px-6 pt-[80px] text-center">
        <p className="font-display text-2xl font-semibold leading-tight text-foreground">
          {headline}
        </p>
        <p className="text-[15px] font-medium leading-snug text-muted-foreground">
          {subheadline}
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Card */}
      <div className="px-6" style={{ perspective: '1200px' }}>
        <div className="reward-card reward-card-float flex flex-col gap-[30px] items-center px-4 pb-5 pt-6">
          {/* Overlay layers */}
          <div className="reward-card-noise" />
          <div className="reward-card-glass" />
          <div className="reward-card-shimmer" />
          <div className="reward-card-shimmer-sharp" />

          {/* Category image + label + module title */}
          <div className="relative z-10 flex w-full flex-col items-center">
            <div className="flex flex-col items-center">
              <div className="h-[100px] w-[94px] overflow-hidden">
                <img
                  src={categoryImage}
                  alt={categoryLabel}
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="gold-emboss-warm text-[15px] font-semibold leading-tight">
                {categoryLabel}
              </p>
            </div>
            <div className="mt-3 flex w-full flex-col items-center gap-3">
              <p className="font-display text-2xl font-normal leading-tight text-foreground text-center">
                {moduleTitle}
              </p>
            </div>
          </div>

          {/* Generic item grid */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-4 w-full">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-2">
                <div className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-lm-green bg-background">
                  <p className="font-display text-[20px] font-bold leading-none text-lm-green">
                    {item.initial}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-[2px] text-center">
                  <p className="text-[16px] font-bold leading-none text-foreground">
                    {item.label}
                  </p>
                  {item.sublabel && (
                    <p className="text-[12px] font-medium leading-tight text-muted-foreground/60">
                      {item.sublabel}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="relative z-10 flex w-full items-center border-t border-[#d4a94a]/30 pt-4">
            <p className="gold-emboss-warm flex-1 text-[11px] font-medium uppercase tracking-wider opacity-70">{itemCountLabel}</p>
            <p className="gold-emboss-warm text-[12px] font-normal opacity-60">{date}</p>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Continue button */}
      <div className="px-4 pb-[30px] pt-4 mt-auto">
        <RewardPrimaryCTA label="Continue" onClick={onContinue} />
      </div>
    </motion.div>
  )
}
