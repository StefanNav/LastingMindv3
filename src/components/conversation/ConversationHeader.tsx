import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

interface ConversationHeaderProps {
  moduleTitle: string
  rightLabel: string
  progressPercent: number
  onBack: () => void
  showProgress?: boolean
  variant?: 'default' | 'summary'
  backgroundImage?: string
  showOverlay?: boolean
}

export function ConversationHeader({
  moduleTitle,
  rightLabel,
  progressPercent,
  onBack,
  showProgress = true,
  variant = 'default',
  backgroundImage,
  showOverlay,
}: ConversationHeaderProps) {
  const isSummary = variant === 'summary'

  return (
    <div className={`absolute inset-x-0 top-0 z-20 flex flex-col items-center overflow-hidden border-b border-black/16 pb-[12px] pt-[62px] ${isSummary ? 'gap-[20px] bg-[var(--lm-bg-primary)]' : backgroundImage ? 'gap-[6px]' : 'gap-[6px]'}`}>
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />
      )}
      {showOverlay && (
        <div className="pointer-events-none absolute inset-0 bg-white/60" />
      )}
      <div className="relative flex w-full items-center justify-between px-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-[6px] rounded-[4px] bg-lm-neutral-warm p-[6px]"
        >
          <ArrowLeft className="size-6 text-white" />
          <span className="text-center text-[14px] font-semibold leading-[1.2] text-white">
            Back
          </span>
        </button>
        <span className="text-center text-[14px] font-semibold leading-[1.2] text-[var(--lm-text-secondary)]">
          {rightLabel}
        </span>
      </div>

      <p className="relative text-center font-display text-[18px] font-semibold leading-[1.2] text-lm-green-dark">
        {moduleTitle}
      </p>

      {showProgress && (
        <div className="relative flex h-2 w-[230px] items-center justify-center px-5">
          <div className="relative h-[4px] w-full overflow-hidden rounded-full bg-black/10">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-lm-green"
              initial={false}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
