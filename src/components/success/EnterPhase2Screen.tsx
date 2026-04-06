import { motion } from 'framer-motion'

interface EnterPhase2ScreenProps {
  onStart: () => void
}

export function EnterPhase2Screen({ onStart }: EnterPhase2ScreenProps) {
  return (
    <motion.div
      key="enter-phase2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex h-full flex-col items-center bg-[var(--lm-bg-primary)]"
      style={{
        backgroundImage: 'url(/images/bg-texture.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Spacer */}
      <div className="flex-1" />

      {/* Content */}
      <div className="flex flex-col items-center gap-4 px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-display text-[28px] font-semibold leading-[1.2] text-foreground text-center"
        >
          Your story is ready to be told.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-[18px] font-medium leading-[1.4] tracking-[0.5px] text-[var(--lm-text-secondary)] text-center"
        >
          Phase 2 is unlocked. Define your life chapters, share your wisdom, and build your legacy.
        </motion.p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA button */}
      <div className="w-full px-4 pb-[30px]">
        <motion.button
          type="button"
          onClick={onStart}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="flex w-full items-center justify-center rounded-[10px] bg-lm-green px-10 py-4"
        >
          <span className="text-[18px] font-medium leading-[1.2] text-white">
            Start telling your story
          </span>
        </motion.button>
      </div>
    </motion.div>
  )
}
