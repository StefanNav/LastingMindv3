import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useApp } from '@/app/AppProvider'
import { RewardPrimaryCTA } from './RewardCTAs'
import type { CategoryStatus } from '@/types'

const STAR_COUNT = 3

const statusLabelMap: Record<CategoryStatus, string> = {
  locked: '',
  not_started: 'Not Started',
  started: 'Started',
  growing: 'Growing',
  budding: 'Budding',
  flourishing: 'Flourishing',
}

function statusColorClass(status: CategoryStatus): string {
  if (status === 'not_started') return 'text-muted-foreground'
  if (status === 'started') return 'text-lm-green'
  return 'text-lm-gold'
}

function deriveStatus(baseStatus: CategoryStatus, mod1Done: boolean, stars: number): CategoryStatus {
  if (stars >= 3) return 'flourishing'
  if (stars >= 2) return 'budding'
  if (stars >= 1) return 'growing'
  if (mod1Done) return 'started'
  // Fall back to the static demo status (covers pre-existing states)
  if (baseStatus === 'growing' || baseStatus === 'budding' || baseStatus === 'flourishing' || baseStatus === 'started') {
    return baseStatus
  }
  return baseStatus
}

interface FoundationMapScreenProps {
  headline: string
  subheadline: string
  earnedCategoryId?: string
  onContinue: () => void
}

export function FoundationMapScreen({
  headline,
  subheadline,
  earnedCategoryId,
  onContinue,
}: FoundationMapScreenProps) {
  const { homePhases, module1Completions, module2Runs } = useApp()

  // Foundation is always the first phase
  const foundationCategories = homePhases[0]?.categories ?? []

  return (
    <motion.div
      key="foundation-map"
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
        <p className="mt-3 text-[15px] font-medium leading-snug text-muted-foreground text-center">
          {subheadline}
        </p>
      </div>

      {/* Foundation divider */}
      <div className="flex items-center gap-3 px-6 pt-8">
        <div className="h-px flex-1 bg-lm-gold/30" />
        <p className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-lm-gold">
          Foundation
        </p>
        <div className="h-px flex-1 bg-lm-gold/30" />
      </div>

      {/* 3×2 category grid */}
      <div className="flex flex-wrap justify-center gap-x-[30px] gap-y-4 px-4 pt-6">
        {foundationCategories.map((cat, idx) => {
          const mod1Done = module1Completions[cat.id] ?? false
          const runs = module2Runs[cat.id] ?? 0
          const stars = Math.floor(runs / 2)
          const effectiveStatus = deriveStatus(cat.status, mod1Done, stars)
          const label = statusLabelMap[effectiveStatus]
          const labelColor = statusColorClass(effectiveStatus)
          const isEarned = cat.id === earnedCategoryId

          // Filled stars: derive from effective status
          const filledFromStatus: Record<CategoryStatus, number> = {
            locked: 0, not_started: 0, started: 0, growing: 1, budding: 2, flourishing: 3,
          }
          const filled = filledFromStatus[effectiveStatus]

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + idx * 0.06 }}
              className={`flex w-[124px] flex-col items-center gap-3 rounded-[10px] border p-3 ${
                isEarned
                  ? 'border-lm-gold bg-lm-bg-card/70'
                  : 'border-border/50 bg-lm-bg-card/40'
              }`}
            >
              <p className="text-[13px] font-bold leading-tight text-foreground text-center">
                {cat.title}
              </p>
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
              <p className={`text-[11px] font-medium leading-tight text-center ${labelColor}`}>
                {label}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Continue button */}
      <div className="px-4 pb-[30px] pt-4">
        <RewardPrimaryCTA label="Continue" onClick={onContinue} />
      </div>
    </motion.div>
  )
}
