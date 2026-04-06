import { Star, LockKeyhole } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
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

interface CategoryNodeCardProps {
  category: Category
  onClick?: () => void
  overrideFilledStars?: number
  teaserStarIndex?: number
  earnedStarIndex?: number
  starSize?: number
  interactive?: boolean
  onStarEarned?: () => void
}

export function CategoryNodeCard({ category, onClick, overrideFilledStars, teaserStarIndex, earnedStarIndex, starSize = 20, interactive = true, onStarEarned }: CategoryNodeCardProps) {
  const { title, image, status, currentModule } = category
  const isLocked = status === 'locked'
  const filled = overrideFilledStars ?? filledStarCount[status]

  const displayLabel = currentModule && !isLocked
    ? `Continue Module ${currentModule}`
    : statusLabel[status]

  const labelColor = status === 'not_started' || currentModule
    ? 'text-[var(--lm-text-tertiary)]'
    : 'text-lm-gold-muted'

  return (
    <button
      type="button"
      onClick={interactive ? onClick : undefined}
      className={cn(
        'bg-lm-bg-card/30 flex flex-col items-center justify-center gap-2 rounded-[10px] px-5 py-4 shadow-card w-full',
        interactive && 'transition-transform active:scale-[0.97]',
        !interactive && 'cursor-default',
        isLocked && 'opacity-70',
      )}
    >
      {/* Category image */}
      <div
        className="relative overflow-hidden"
        style={{ height: category.imageHeight ?? 156, width: category.imageWidth ?? 147 }}
      >
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>

      {/* Title + status */}
      <div className="flex flex-col items-center gap-2">
        <p className="font-semibold text-[18px] leading-[1.2] text-lm-green-dark text-center">
          {title}
        </p>

        {isLocked ? (
          <div className="flex items-center justify-center rounded-full bg-[#e7ebd9] size-[52px]">
            <LockKeyhole className="size-[30px] text-lm-green-dark/60" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-[2px]">
            {/* Stars */}
            <div className="flex items-center gap-4">
              {Array.from({ length: STAR_COUNT }).map((_, i) => {
                const isFilled = i < filled
                const isTeaser = i === teaserStarIndex
                const isEarned = i === earnedStarIndex

                if (isEarned) {
                  const dur = 2.5
                  return (
                    <motion.div
                      key={`earned-${i}`}
                      className="relative flex items-center justify-center"
                      initial={{ scale: 1, rotate: 0 }}
                      animate={{ scale: [1, 1.35, 1], rotate: [0, 12, 0] }}
                      transition={{ duration: dur, times: [0, 0.5, 1], ease: 'easeInOut' }}
                      onAnimationComplete={onStarEarned}
                    >
                      {/* Glow burst */}
                      <motion.div
                        className="absolute rounded-full"
                        style={{
                          width: starSize * 2,
                          height: starSize * 2,
                          background: 'radial-gradient(circle, var(--lm-gold-star) 0%, transparent 70%)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.6, 0.3] }}
                        transition={{ duration: dur, times: [0, 0.45, 1], ease: 'easeInOut' }}
                      />
                      {/* Star fills from empty to gold */}
                      <motion.div
                        initial={{ color: 'var(--lm-text-tertiary)' }}
                        animate={{ color: 'var(--lm-gold-star)' }}
                        transition={{ duration: dur * 0.5, delay: dur * 0.2, ease: 'easeInOut' }}
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: dur * 0.3, delay: dur * 0.35 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Star
                            style={{ width: starSize, height: starSize }}
                            fill="var(--lm-gold-star)"
                            stroke="var(--lm-gold-star)"
                            strokeWidth={1.5}
                          />
                        </motion.div>
                        <Star
                          className="relative"
                          style={{ width: starSize, height: starSize }}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        />
                      </motion.div>
                    </motion.div>
                  )
                }

                if (isTeaser) {
                  // Pause idle (0→40%), then animate (40→80%), then settle back (80→100%)
                  const totalDuration = 4
                  return (
                    <motion.div
                      key={i}
                      className="relative flex items-center justify-center"
                      animate={{
                        scale:  [1, 1, 1.18, 1, 1],
                        rotate: [0, 0, 8,   -6, 0],
                      }}
                      transition={{
                        duration: totalDuration,
                        times:  [0, 0.4, 0.6, 0.8, 1],
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {/* Gold glow pulse — stays hidden during pause, pulses during animation */}
                      <motion.div
                        className="absolute rounded-full"
                        style={{
                          width: starSize * 1.4,
                          height: starSize * 1.4,
                          background: 'radial-gradient(circle, var(--lm-gold-star) 0%, transparent 70%)',
                        }}
                        animate={{ opacity: [0, 0, 0.45, 0.45, 0] }}
                        transition={{
                          duration: totalDuration,
                          times:  [0, 0.4, 0.6, 0.8, 1],
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      {/* Star stroke transitions from grey (idle) to gold (animated) */}
                      <motion.div
                        animate={{
                          color: [
                            'var(--lm-text-tertiary)',
                            'var(--lm-text-tertiary)',
                            'var(--lm-gold-star)',
                            'var(--lm-gold-star)',
                            'var(--lm-text-tertiary)',
                          ],
                        }}
                        transition={{
                          duration: totalDuration,
                          times: [0, 0.35, 0.45, 0.85, 1],
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <Star
                          className="relative"
                          style={{ width: starSize, height: starSize }}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        />
                      </motion.div>
                    </motion.div>
                  )
                }

                return (
                  <Star
                    key={i}
                    style={{ width: starSize, height: starSize }}
                    fill={isFilled ? 'var(--lm-gold-star)' : 'none'}
                    stroke={isFilled ? 'var(--lm-gold-star)' : 'var(--lm-text-tertiary)'}
                    strokeWidth={1.5}
                  />
                )
              })}
            </div>
            {/* Status label */}
            <p className={cn('font-medium text-[13px] leading-[1.2] text-center', labelColor)}>
              {displayLabel}
            </p>
          </div>
        )}
      </div>
    </button>
  )
}
