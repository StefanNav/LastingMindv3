import { motion } from 'framer-motion'
import { Check, Clock } from 'lucide-react'
import { RewardSecondaryCTA } from './RewardCTAs'

interface CompletedModuleItem {
  title: string
  status: string
}

interface SuggestedModule {
  categoryId: string
  moduleId: string
  title: string
  description: string
  duration: string
}

interface NextStepScreenProps {
  headline: string
  treeImage: string
  completedModules: CompletedModuleItem[]
  suggestedModule?: SuggestedModule
  progressNote: string
  onStartModule: (categoryId: string, moduleId: string) => void
  onDone: () => void
}

export function NextStepScreen({
  headline,
  treeImage,
  completedModules,
  suggestedModule,
  progressNote,
  onStartModule,
  onDone,
}: NextStepScreenProps) {
  return (
    <motion.div
      key="next-step"
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

      {/* Tree image */}
      <div className="flex items-start justify-center pt-4">
        <div className="h-[245px] w-full max-w-[402px] overflow-hidden">
          <img
            src={treeImage}
            alt="Your growing tree"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Your Progress card */}
      <div className="flex flex-col gap-2 px-4 pt-4">
        <div className="flex flex-col gap-4 rounded-[10px] bg-lm-bg-card/40 p-3 shadow-card backdrop-blur-sm">
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-semibold leading-tight text-muted-foreground">
              Your Progress
            </p>
            <div className="flex flex-col gap-2.5">
              {completedModules.map((mod) => (
                <div key={mod.title} className="flex items-center gap-1">
                  <div className="flex size-4 shrink-0 items-center justify-center rounded-full border-[0.5px] border-lm-green bg-[#e7ebd9]">
                    <Check className="size-3 text-lm-green" strokeWidth={2.5} />
                  </div>
                  <p className="flex-1 text-[15px] font-semibold leading-tight text-foreground">
                    {mod.title}
                  </p>
                  <p className="text-[13px] font-medium leading-tight text-lm-green">
                    {mod.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[13px] font-semibold leading-tight text-lm-gold-muted text-center">
            {progressNote}
          </p>
        </div>
      </div>

      {/* Suggested next module */}
      {suggestedModule && (
        <div className="flex flex-col gap-2 px-4 pt-4">
          <p className="text-[13px] font-semibold leading-tight text-muted-foreground">
            Suggested
          </p>
          <div className="flex flex-col gap-4 rounded-[10px] bg-lm-bg-card/40 p-3 shadow-card backdrop-blur-sm">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <div className="size-4 shrink-0 rounded-full border border-lm-green" />
                <p className="flex-1 font-display text-[15px] font-semibold leading-tight text-foreground">
                  {suggestedModule.title}
                </p>
                <div className="flex items-center gap-1">
                  <Clock className="size-4 text-[var(--lm-text-secondary)]" />
                  <p className="text-[13px] leading-tight text-muted-foreground">
                    {suggestedModule.duration}
                  </p>
                </div>
              </div>
              <p className="text-[13px] font-medium leading-snug text-muted-foreground">
                {suggestedModule.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onStartModule(suggestedModule.categoryId, suggestedModule.moduleId)}
              className="flex w-full items-center justify-center rounded-lg bg-lm-green px-4 py-3 transition-transform active:scale-[0.97]"
            >
              <span className="text-sm font-semibold text-white">
                Start This Module
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Done for now button */}
      <div className="px-4 pb-[30px] pt-4">
        <RewardSecondaryCTA onClick={onDone} />
      </div>
    </motion.div>
  )
}
