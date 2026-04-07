import { motion } from 'framer-motion'
import { RewardPrimaryCTA } from './RewardCTAs'

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
      className="flex h-full flex-col items-center bg-[var(--lm-bg-primary)]"
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
          className="font-display text-2xl font-semibold leading-tight text-foreground text-center"
        >
          Your story is ready to be told.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-[15px] font-medium leading-snug text-muted-foreground text-center"
        >
          Phase 2 is unlocked. Define your life chapters, share your wisdom, and build your legacy.
        </motion.p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="w-full px-4 pb-[30px] pt-4 mt-auto"
      >
        <RewardPrimaryCTA label="Start telling your story" onClick={onStart} />
      </motion.div>
    </motion.div>
  )
}
