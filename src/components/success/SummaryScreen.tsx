import { motion } from 'framer-motion'
import { ModuleStepCard } from '@/components/sheets/ModuleStepCard'
import type { CategoryModule } from '@/types'

interface SummaryScreenProps {
  headline: string
  treeImage: string
  completedModule: CategoryModule
  nextModule: CategoryModule
  categoryLabel: string
  onStartNext: () => void
  onDone: () => void
}

export function SummaryScreen({
  headline,
  treeImage,
  completedModule,
  nextModule,
  categoryLabel,
  onStartNext,
  onDone,
}: SummaryScreenProps) {
  return (
    <motion.div
      key="summary"
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
      <div className="px-4 pt-[80px]">
        <p className="font-display text-[26px] font-semibold leading-[1.2] text-foreground text-center">
          {headline}
        </p>
      </div>

      {/* Tree image */}
      <div className="flex items-start justify-center pt-4">
        <div className="h-[248px] w-full max-w-[403px] overflow-hidden">
          <img
            src={treeImage}
            alt="Your growing tree"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Module cards */}
      <div className="flex flex-col gap-5 px-4 pt-4">
        <ModuleStepCard
          module={completedModule}
          stepLabel="Step 1 of 2"
        />
        <ModuleStepCard
          module={nextModule}
          stepLabel={`Up Next in ${categoryLabel}`}
          ctaLabel="Start This Module"
          onBegin={onStartNext}
        />
      </div>

      {/* Done for now button */}
      <div className="border-t border-black/25 bg-[var(--lm-bg-primary)] px-4 py-[30px] mt-auto">
        <button
          type="button"
          onClick={onDone}
          className="flex w-full items-center justify-center rounded-[10px] bg-[#dce6ba] p-2.5"
        >
          <span className="text-[14px] font-semibold leading-[1.2] text-[var(--lm-text-body-alt)]">
            Done for now
          </span>
        </button>
      </div>
    </motion.div>
  )
}
