import { motion } from 'framer-motion'
import { CategoryNodeCard } from '@/components/cards/CategoryNodeCard'
import { ModuleStepCard } from '@/components/sheets/ModuleStepCard'
import { RewardSecondaryCTA } from './RewardCTAs'
import type { Category, CategoryModule } from '@/types'

interface StarTeaserScreenProps {
  headline: string
  category: Category
  nextModule: CategoryModule
  categoryLabel: string
  ctaLabel: string
  onStartNext: () => void
  onDone: () => void
}

export function StarTeaserScreen({
  headline,
  category,
  nextModule,
  categoryLabel,
  ctaLabel,
  onStartNext,
  onDone,
}: StarTeaserScreenProps) {
  return (
    <motion.div
      key="star-teaser"
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
      {/* Headline */}
      <div className="px-6 pt-[80px]">
        <p className="font-display text-2xl font-semibold leading-tight text-foreground text-center">
          {headline}
        </p>
      </div>

      {/* Spacer — equal distance above and below card */}
      <div className="flex-1" />

      {/* Category status card */}
      <div className="flex justify-center px-7">
        <div className="w-full max-w-[346px]">
          <CategoryNodeCard
            category={category}
            teaserStarIndex={0}
            starSize={28}
            interactive={false}
          />
        </div>
      </div>

      {/* Spacer — equal distance above and below card */}
      <div className="flex-1" />

      {/* Up Next module card */}
      <div className="px-4">
        <ModuleStepCard
          module={nextModule}
          stepLabel={`Up Next in ${categoryLabel}`}
          ctaLabel={ctaLabel}
          onBegin={onStartNext}
        />
      </div>

      {/* Done for now button */}
      <div className="px-4 pb-[30px] pt-4">
        <RewardSecondaryCTA onClick={onDone} />
      </div>
    </motion.div>
  )
}
