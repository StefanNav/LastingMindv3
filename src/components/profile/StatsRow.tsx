import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MemoryProfileData, ProfileCategoryStatus } from '@/types'

interface StatsRowProps {
  profile: MemoryProfileData
}

const TOTAL_PHASES = 4
const STARS_PER_CATEGORY = 3

const PHASE_LABELS = [
  { name: 'Foundation', desc: 'Build your identity across 6 categories' },
  { name: 'Tell Your Story', desc: 'Define life chapters and share your wisdom' },
  { name: 'Leave Your Legacy', desc: 'Write letters, record messages, shape your memoir' },
  { name: 'Keep Growing', desc: 'Open-ended journaling and reflection' },
]

interface StarCategory {
  name: string
  starsEarned: number
  status: string
}

const PHASE2_CATEGORIES = ['Life Chapters', 'Wisdom & Advice', 'Greatest Memories']

function statusToStars(status: ProfileCategoryStatus): number {
  if (status === 'complete') return 3
  if (status === 'in_progress') return 1
  return 0
}

function statusLabel(status: ProfileCategoryStatus): string {
  if (status === 'complete') return 'Complete'
  if (status === 'in_progress') return 'Started'
  return 'Not Started'
}

function phaseOpacity(index: number) {
  return 0.3 + ((index + 1) / TOTAL_PHASES) * 0.7
}

function StarDisplay({ earned, total }: { earned: number; total: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          className="size-4"
          fill={i < earned ? 'var(--lm-gold-star)' : 'none'}
          stroke={i < earned ? 'var(--lm-gold-star)' : 'var(--lm-text-tertiary)'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

export function StatsRow({ profile }: StatsRowProps) {
  const { stats } = profile
  const [showPhaseModal, setShowPhaseModal] = useState(false)
  const [showStarsModal, setShowStarsModal] = useState(false)
  const [activePhaseTab, setActivePhaseTab] = useState(0)

  const phaseTabs = useMemo(() => {
    const foundation: StarCategory[] = profile.foundationCategories.map((c) => ({
      name: c.name,
      starsEarned: statusToStars(c.status),
      status: statusLabel(c.status),
    }))

    const lifeStory: StarCategory[] = PHASE2_CATEGORIES.map((name) => {
      if (!profile.phase1Complete) return { name, starsEarned: 0, status: 'Locked' }
      if (name === 'Life Chapters' && profile.lifeChapters.length > 0)
        return { name, starsEarned: 1, status: 'Started' }
      return { name, starsEarned: 0, status: 'Not Started' }
    })

    const legacy: StarCategory[] = profile.legacyModules.map((m) => ({
      name: m.name,
      starsEarned: profile.phase1Complete ? statusToStars(m.status) : 0,
      status: profile.phase1Complete ? statusLabel(m.status) : 'Locked',
    }))

    return [
      { label: 'Foundation', categories: foundation, locked: false },
      { label: 'Life Story', categories: lifeStory, locked: !profile.phase1Complete },
      { label: 'Legacy', categories: legacy, locked: !profile.phase1Complete },
      { label: 'Keep Growing', categories: [] as StarCategory[], locked: false },
    ]
  }, [profile])

  const totalStars = phaseTabs.reduce(
    (sum, tab) => sum + tab.categories.reduce((s, c) => s + c.starsEarned, 0),
    0,
  )

  return (
    <>
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center rounded-[10px] bg-lm-bg-card/40 px-5 py-3 shadow-card backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <p className="text-sm font-bold text-foreground">{stats.totalEntries}</p>
          <p className="text-[11px] text-muted-foreground">entries</p>
        </div>

        <div className="h-6 w-px bg-border" />

        <button
          type="button"
          onClick={() => setShowStarsModal(true)}
          className="flex flex-col items-center"
        >
          <p className="flex items-center gap-1 text-sm font-bold text-foreground">
            <Star className="size-3.5" fill="var(--lm-gold-star)" stroke="var(--lm-gold-star)" strokeWidth={1.5} /> {totalStars}
          </p>
          <p className="text-[11px] text-muted-foreground">stars</p>
        </button>

        <div className="h-6 w-px bg-border" />

        <button
          type="button"
          onClick={() => setShowPhaseModal(true)}
          className="flex flex-col items-center gap-1"
        >
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_PHASES }).map((_, i) => {
              const isComplete = i < stats.phasesComplete
              return (
                <div
                  key={i}
                  className={`size-2.5 rounded-full ${isComplete ? '' : 'bg-foreground/15'}`}
                  style={isComplete ? { backgroundColor: `rgba(76, 127, 83, ${phaseOpacity(i)})` } : undefined}
                />
              )
            })}
          </div>
          <p className="text-[11px] text-muted-foreground">phases</p>
        </button>
      </div>

      {/* ── Stars modal ── */}
      <AnimatePresence>
        {showStarsModal && (
          <>
            <motion.div
              key="stars-backdrop"
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStarsModal(false)}
            />
            <motion.div
              key="stars-modal"
              className="fixed inset-x-4 top-1/2 z-50 h-[520px] max-h-[80vh] -translate-y-1/2 overflow-y-auto rounded-[14px] bg-[var(--lm-bg-primary)] p-5 shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-foreground">Your Stars</h3>
                <button type="button" onClick={() => setShowStarsModal(false)}>
                  <X className="size-5 text-muted-foreground" />
                </button>
              </div>

              {/* Explanation */}
              <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                Stars are earned as you complete key modules and add more entries over time. Each star deepens your LastingMind, helping it reflect more of your voice, memories, and perspective so the people you love can feel closer to who you are.
              </p>

              {/* Phase tabs */}
              <div className="mb-4 flex gap-1 rounded-[8px] bg-foreground/[0.04] p-1">
                {phaseTabs.map((tab, i) => (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => setActivePhaseTab(i)}
                    className={cn(
                      'flex-1 rounded-[6px] px-2 py-1.5 text-[11px] font-semibold transition-colors',
                      activePhaseTab === i
                        ? 'bg-white text-foreground shadow-sm'
                        : 'text-muted-foreground',
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Active tab content */}
              {activePhaseTab === 3 ? (
                /* Keep Growing — no stars */
                <div className="flex flex-col items-center gap-2 rounded-[10px] bg-foreground/[0.02] px-4 py-6">
                  <p className="text-center text-sm font-medium text-foreground">Open-ended</p>
                  <p className="text-center text-xs leading-snug text-muted-foreground">
                    Keep Growing has no star limit. Journal freely, answer audience questions, and continue adding depth to your legacy.
                  </p>
                </div>
              ) : phaseTabs[activePhaseTab].locked ? (
                /* Locked phase */
                <div className="flex flex-col items-center gap-2 rounded-[10px] bg-foreground/[0.02] px-4 py-6">
                  <Lock className="size-5 text-muted-foreground/50" />
                  <p className="text-center text-xs leading-snug text-muted-foreground">
                    Complete all 6 Foundation categories to unlock this phase.
                  </p>
                </div>
              ) : (
                /* Category grid */
                <div className="grid grid-cols-2 gap-3">
                  {phaseTabs[activePhaseTab].categories.map((cat) => (
                    <div
                      key={cat.name}
                      className="flex flex-col items-center gap-1.5 rounded-[10px] border border-border/50 bg-lm-bg-card/30 px-3 py-3"
                    >
                      <p className="text-[13px] font-bold text-foreground">{cat.name}</p>
                      <StarDisplay earned={cat.starsEarned} total={STARS_PER_CATEGORY} />
                      <p className={cn(
                        'text-[11px] font-medium',
                        cat.status === 'Complete' ? 'text-lm-green'
                          : cat.status === 'Started' ? 'text-lm-gold'
                          : 'text-muted-foreground',
                      )}>
                        {cat.status}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Legend */}
              <div className="mt-4 rounded-[8px] bg-foreground/[0.03] px-4 py-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Legend</p>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="flex gap-0.5">{Array.from({ length: 3 }).map((_, i) => <Star key={i} className="size-3.5" fill="var(--lm-gold-star)" stroke="var(--lm-gold-star)" strokeWidth={1.5} />)}</span>
                    <span className="text-[11px] text-muted-foreground">Complete — full depth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex gap-0.5"><Star className="size-3.5" fill="var(--lm-gold-star)" stroke="var(--lm-gold-star)" strokeWidth={1.5} /><Star className="size-3.5" fill="none" stroke="var(--lm-text-tertiary)" strokeWidth={1.5} /><Star className="size-3.5" fill="none" stroke="var(--lm-text-tertiary)" strokeWidth={1.5} /></span>
                    <span className="text-[11px] text-muted-foreground">Started — keep going</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex gap-0.5">{Array.from({ length: 3 }).map((_, i) => <Star key={i} className="size-3.5" fill="none" stroke="var(--lm-text-tertiary)" strokeWidth={1.5} />)}</span>
                    <span className="text-[11px] text-muted-foreground">Not yet started</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Phase modal ── */}
      <AnimatePresence>
        {showPhaseModal && (
          <>
            <motion.div
              key="phase-backdrop"
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPhaseModal(false)}
            />
            <motion.div
              key="phase-modal"
              className="fixed inset-x-6 top-1/2 z-50 -translate-y-1/2 rounded-[14px] bg-[var(--lm-bg-primary)] p-5 shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-foreground">Your Phases</h3>
                <button type="button" onClick={() => setShowPhaseModal(false)}>
                  <X className="size-5 text-muted-foreground" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {PHASE_LABELS.map((phase, i) => {
                  const isComplete = i < stats.phasesComplete
                  return (
                    <div key={phase.name} className="flex items-start gap-3">
                      <div
                        className={`mt-1 size-3 shrink-0 rounded-full ${isComplete ? '' : 'bg-foreground/15'}`}
                        style={isComplete ? { backgroundColor: `rgba(76, 127, 83, ${phaseOpacity(i)})` } : undefined}
                      />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Phase {i + 1}: {phase.name}
                          {isComplete && <span className="ml-1.5 text-xs text-lm-green">Complete</span>}
                        </p>
                        <p className="text-xs leading-snug text-muted-foreground">{phase.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 rounded-[8px] bg-foreground/[0.03] px-4 py-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Legend</p>
                <div className="flex flex-col gap-1.5">
                  {[
                    { opacity: 0.25, label: 'Getting started', range: '1–3 stars' },
                    { opacity: 0.45, label: 'Building momentum', range: '4–6 stars' },
                    { opacity: 0.65, label: 'Making progress', range: '7–10 stars' },
                    { opacity: 0.82, label: 'Going deep', range: '11–14 stars' },
                    { opacity: 1, label: 'Flourishing', range: '15–18 stars' },
                  ].map((tier) => (
                    <div key={tier.label} className="flex items-center gap-2">
                      <div
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: `rgba(76, 127, 83, ${tier.opacity})` }}
                      />
                      <span className="text-[11px] text-muted-foreground">{tier.label} · {tier.range}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <div className="size-2.5 shrink-0 rounded-full bg-foreground/15" />
                    <span className="text-[11px] text-muted-foreground">Not yet started</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
